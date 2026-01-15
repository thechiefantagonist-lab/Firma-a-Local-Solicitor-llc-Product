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
        name: "Premium Extra Virgin Olive Oil",
        description: "Cold-pressed, authentic Mediterranean olive oil. Perfect for salads and finishing dishes.",
        price: "24.99",
        imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600",
        category: "oil",
        stock: 100
      },
      {
        name: "Organic Balsamic Vinegar",
        description: "Aged for 12 years in wooden barrels. A sweet and tangy complement to our oils.",
        price: "19.99",
        imageUrl: "https://images.unsplash.com/photo-1598511797337-1d674b341c2c?auto=format&fit=crop&q=80&w=600",
        category: "vinegar",
        stock: 50
      },
      {
        name: "The Connoisseur Set",
        description: "A gift set containing our finest EVOO and Balsamic Vinegar.",
        price: "39.99",
        imageUrl: "https://images.unsplash.com/photo-1620052309787-8480749a1d1e?auto=format&fit=crop&q=80&w=600",
        category: "set",
        stock: 25
      },
       {
        name: "Herb Infused Olive Oil",
        description: "Infused with fresh rosemary and thyme. Adds a delightful aroma to any dish.",
        price: "29.99",
        imageUrl: "https://images.unsplash.com/photo-1546552356-3fae876a61ca?auto=format&fit=crop&q=80&w=600",
        category: "oil",
        stock: 80
      }
    ]);
  }
}
