import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";
import { products } from "@shared/schema";
import { db } from "./db";

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

  return httpServer;
}

async function seedDatabase() {
  const existingProducts = await storage.getProducts();
  if (existingProducts.length === 0) {
    console.log("Seeding products...");
    await db.insert(products).values([
      {
        name: "EV Smooth",
        description: "Extra virgin olive oil (250 ml). A balanced and versatile smooth oil.",
        price: "24.99",
        imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600",
        category: "oil",
        stock: 100
      },
      {
        name: "Wild Rosemary",
        description: "Infused with rosemary grown next to the olives in the Atlas Mountains (250 ml).",
        price: "26.99",
        imageUrl: "https://images.unsplash.com/photo-1546552356-3fae876a61ca?auto=format&fit=crop&q=80&w=600",
        category: "oil",
        stock: 100
      },
      {
        name: "Orange Infused Olive Oil",
        description: "Mediterranean olives pressed with fresh oranges (250 ml). Zesty and aromatic.",
        price: "26.99",
        imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600",
        category: "oil",
        stock: 100
      },
      {
        name: "Lemon Infused Olive Oil",
        description: "Mediterranean olives pressed with fresh lemons (250 ml). Bright and citrusy.",
        price: "26.99",
        imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600",
        category: "oil",
        stock: 100
      },
      {
        name: "Green Chili Pepper Olive Oil",
        description: "Mediterranean olives pressed with spicy green chili peppers (250 ml). Red label.",
        price: "28.99",
        imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600",
        category: "oil",
        stock: 100
      },
      {
        name: "The Flavor Flight",
        description: "A miniature sample pack of every flavor. Perfect for discovery and aesthetic gifting.",
        price: "45.00",
        imageUrl: "https://images.unsplash.com/photo-1620052309787-8480749a1d1e?auto=format&fit=crop&q=80&w=600",
        category: "set",
        stock: 50
      }
    ]);
  }
}
