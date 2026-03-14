import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";
import { products, locations } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { SquareClient, SquareEnvironment } from "square";
import crypto from "crypto";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Replit Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  // === Products ===
  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  // === Orders ===
  app.post(api.orders.create.path, isAuthenticated, async (req: any, res) => {
    try {
      const input = api.orders.create.input.parse(req.body);
      const userId = req.user.claims.sub; // Replit Auth ID
      const order = await storage.createOrder(userId, input.items);
      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.get(api.orders.list.path, isAuthenticated, async (req: any, res) => {
    const userId = req.user.claims.sub;
    const orders = await storage.getOrders(userId);
    res.json(orders);
  });

  // === Locations ===
  app.get(api.locations.list.path, async (req, res) => {
    const locations = await storage.getLocations();
    res.json(locations);
  });

  // === Square Payment ===
  const squareClient = new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN,
    environment: process.env.SQUARE_ENVIRONMENT === 'production' ? SquareEnvironment.Production : SquareEnvironment.Sandbox,
  });

  app.get("/api/square/config", (req, res) => {
    res.json({
      applicationId: process.env.SQUARE_APPLICATION_ID,
      locationId: process.env.SQUARE_LOCATION_ID,
    });
  });

  app.post("/api/square/payment", async (req: any, res) => {
    try {
      const VALID_PROMO_CODE = "@forestparker";
      const PROMO_DISCOUNT_RATE = 0.16;

      const paymentSchema = z.object({
        sourceId: z.string().min(1),
        items: z.array(z.object({
          productId: z.number().int().positive(),
          quantity: z.number().int().positive().max(100),
        })).min(1),
        promoCode: z.string().optional(),
        delivery: z.object({
          fullName: z.string().min(1),
          address: z.string().min(1),
          city: z.string().min(1),
          state: z.string().min(1).max(2),
          zip: z.string().regex(/^\d{5}(-\d{4})?$/),
          phone: z.string().min(7),
          email: z.string().email().optional(),
        }).optional(),
      });

      const parsed = paymentSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: parsed.error.errors[0].message });
      }

      const { sourceId, items, delivery, promoCode } = parsed.data;
      const promoApplied = promoCode?.trim().toLowerCase() === VALID_PROMO_CODE.toLowerCase();

      let totalCents = 0;
      const orderItemData: { productId: number; quantity: number; price: string }[] = [];

      for (const item of items) {
        const product = await storage.getProduct(item.productId);
        if (!product) {
          return res.status(400).json({ message: `Product ${item.productId} not found` });
        }
        const priceCents = Math.round(Number(product.price) * 100);
        totalCents += priceCents * item.quantity;
        orderItemData.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price.toString(),
        });
      }

      if (totalCents <= 0) {
        return res.status(400).json({ message: "Invalid order total" });
      }

      const discountCents = promoApplied ? Math.round(totalCents * PROMO_DISCOUNT_RATE) : 0;
      const chargedCents = totalCents - discountCents;

      const paymentResult = await squareClient.payments.create({
        sourceId,
        idempotencyKey: crypto.randomUUID(),
        amountMoney: {
          amount: BigInt(chargedCents),
          currency: "USD",
        },
        locationId: process.env.SQUARE_LOCATION_ID,
      });

      const userId = req.user?.claims?.sub || "guest";
      const order = await storage.createOrderWithPayment(userId, orderItemData, paymentResult.payment?.id || "", delivery);

      const receiptItems = orderItemData.map(item => {
        const prod = item as any;
        return { productId: item.productId, quantity: item.quantity, price: item.price };
      });

      res.json({ 
        success: true, 
        orderId: order.id,
        paymentId: paymentResult.payment?.id,
        totalCents,
        chargedCents,
        discountCents,
        promoApplied,
        delivery: delivery || null,
        items: receiptItems,
      });
    } catch (err: any) {
      console.error("Square payment error:", err);
      const message = err?.body ? JSON.parse(err.body)?.errors?.[0]?.detail : err.message;
      res.status(500).json({ message: message || "Payment failed" });
    }
  });

  // === Receipt Send ===
  app.post("/api/receipt/send", async (req: any, res) => {
    try {
      const schema = z.object({
        orderId: z.number().int().positive(),
        email: z.string().email().optional(),
        phone: z.string().min(7).optional(),
        receiptText: z.string().optional(),
      });
      const parsed = schema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: parsed.error.errors[0].message });
      }
      const { orderId, email, phone } = parsed.data;

      // Log the receipt request (email/SMS integration can be plugged in here)
      console.log(`[Receipt] Order #${orderId} — send to email: ${email ?? "none"}, phone: ${phone ?? "none"}`);

      // If a SMTP_FROM env var is set, attempt to send email via nodemailer
      if (email && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          const nodemailer = await import("nodemailer");
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
          });
          await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: email,
            subject: `Your Firma Forest Order #${orderId} — Confirmed!`,
            text: parsed.data.receiptText || `Order #${orderId} confirmed. Thank you for shopping with Firma Forest!`,
          });
        } catch (emailErr) {
          console.error("[Receipt] Email send failed:", emailErr);
        }
      }

      res.json({ success: true, message: "Receipt request recorded." });
    } catch (err: any) {
      console.error("Receipt send error:", err);
      res.status(500).json({ message: "Failed to process receipt request" });
    }
  });

  // === Reviews ===
  app.get(api.reviews.list.path, async (req, res) => {
    const reviews = await storage.getReviews();
    res.json(reviews);
  });

  app.post(api.reviews.create.path, async (req, res) => {
    try {
      const input = api.reviews.create.input.parse(req.body);
      if (input.rating < 1 || input.rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
      }
      const review = await storage.createReview(input);
      res.status(201).json(review);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // === Appointments ===
  app.post(api.appointments.create.path, async (req, res) => {
    try {
      const input = api.appointments.create.input.parse(req.body);
      const appointment = await storage.createAppointment(input);
      res.status(201).json(appointment);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Failed to create appointment" });
    }
  });
  
  // Seed Database with Initial Products
  await seedDatabase();
  await seedLocations();

  return httpServer;
}

async function seedLocations() {
  const existingLocations = await storage.getLocations();
  if (existingLocations.length === 0) {
    console.log("Seeding locations...");
    await db.insert(locations).values([
      {
        name: "Mediterranean Gourmet Market",
        address: "123 Olive Grove St, San Francisco, CA",
        type: "market",
        lat: 37.7749,
        lng: -122.4194
      },
      {
        name: "La Piazza Italian Restaurant",
        address: "456 Artisan Way, Los Angeles, CA",
        type: "restaurant",
        lat: 34.0522,
        lng: -118.2437
      },
      {
        name: "Old World Deli",
        address: "789 Heritage Blvd, San Diego, CA",
        type: "market",
        lat: 32.7157,
        lng: -117.1611
      }
    ]);
  }
}

async function seedDatabase() {
  const productData = [
    {
      name: "Extra Virgin Smooth",
      description: "Extra virgin olive oil (250 ml). A balanced and versatile smooth oil with a sky-blue label.",
      price: "17.00",
      imageUrl: "/images/ev-smooth-bottle.png",
      category: "oil",
      stock: 100
    },
    {
      name: "Wild Rosemary",
      description: "Fused with rosemary grown next to the olives in the Atlas Mountains (250 ml). Green label.",
      price: "17.00",
      imageUrl: "/images/rosemary-bottle.png",
      category: "oil",
      stock: 100
    },
    {
      name: "Orange Fused Olive Oil",
      description: "Mediterranean olives pressed with fresh oranges (250 ml). Zest and aromatic orange label.",
      price: "17.00",
      imageUrl: "/images/orange-bottle.png",
      category: "oil",
      stock: 100
    },
    {
      name: "Lemon Fused Olive Oil",
      description: "Mediterranean olives pressed with fresh lemons (250 ml). Bright and citrusy yellow label.",
      price: "17.00",
      imageUrl: "/images/lemon-bottle.png",
      category: "oil",
      stock: 100
    },
    {
      name: "Green Chili Pepper Olive Oil",
      description: "Mediterranean olives pressed with spicy green chili peppers (250 ml). Red label.",
      price: "17.00",
      imageUrl: "/images/green-chili-bottle.png",
      category: "oil",
      stock: 100
    },
    {
      name: "The Flavor Flight",
      description: "A miniature sample pack of every flavor. Perfect for discovery and aesthetic gifting.",
      price: "28.00",
      imageUrl: "/images/holiday-tree.png",
      category: "set",
      stock: 50
    }
  ];

  const existingProducts = await storage.getProducts();
  if (existingProducts.length === 0) {
    console.log("Seeding products...");
    await db.insert(products).values(productData);
  } else {
    for (let i = 0; i < productData.length; i++) {
      const p = productData[i];
      const existing = existingProducts.find(ep => ep.imageUrl === p.imageUrl);
      if (existing && (existing.price !== p.price || existing.name !== p.name || existing.description !== p.description)) {
        console.log(`Updating product: ${p.name} price to ${p.price}`);
        await db.update(products).set({ name: p.name, description: p.description, price: p.price }).where(eq(products.id, existing.id));
      }
    }
  }
}
