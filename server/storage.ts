import { db } from "./db";
import {
  users, products, orders, orderItems, appointments, locations, reviews,
  type User, type InsertUser,
  type Product, type InsertProduct,
  type Order, type OrderItem,
  type Appointment, type InsertAppointment,
  type Location, type InsertLocation,
  type Review, type InsertReview
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { authStorage } from "./replit_integrations/auth/storage"; // Import auth storage

export interface IStorage {
  // Auth methods (required by auth blueprint)
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>; // Added to satisfy potential legacy calls if any
  createUser(user: UpsertUser): Promise<User>; // Added to satisfy potential legacy calls if any

  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  
  // Orders
  createOrder(userId: string, items: { productId: number; quantity: number }[]): Promise<Order>;
  createOrderWithPayment(userId: string, items: { productId: number; quantity: number; price: string }[], paymentId: string, delivery?: { fullName: string; address: string; city: string; state: string; zip: string; phone: string; email?: string }): Promise<Order>;
  getOrders(userId: string): Promise<Order[]>;

  // Appointments
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;

  // Locations
  getLocations(): Promise<Location[]>;

  // Reviews
  getReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class DatabaseStorage implements IStorage {
  // Delegate auth methods to the auth storage implementation
  async getUser(id: string): Promise<User | undefined> {
    return authStorage.getUser(id);
  }

  // These might not be used by Replit Auth but kept for interface compatibility if needed
  async getUserByUsername(username: string): Promise<User | undefined> {
     // Replit auth uses email/sub, not username. This is a stub.
     return undefined;
  }
  async createUser(user: InsertUser): Promise<User> {
     // Replit auth handles user creation via upsertUser. This is a stub.
     throw new Error("Use authStorage.upsertUser instead");
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  // Orders
  async createOrder(userId: string, items: { productId: number; quantity: number }[]): Promise<Order> {
    // 1. Calculate total and verify products
    let total = 0;
    const orderItemData: { productId: number; quantity: number; price: string }[] = [];

    for (const item of items) {
      const product = await this.getProduct(item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      const price = Number(product.price);
      total += price * item.quantity;
      orderItemData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price.toString() // Store price at time of purchase
      });
    }

    // 2. Create Order
    const [order] = await db.insert(orders).values({
      userId,
      total: total.toFixed(2),
      status: "paid", // Mocking payment success
    }).returning();

    // 3. Create Order Items
    for (const item of orderItemData) {
      await db.insert(orderItems).values({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      });
    }

    return order;
  }

  async createOrderWithPayment(userId: string, items: { productId: number; quantity: number; price: string }[], paymentId: string, delivery?: { fullName: string; address: string; city: string; state: string; zip: string; phone: string; email?: string }): Promise<Order> {
    let total = 0;
    for (const item of items) {
      total += Number(item.price) * item.quantity;
    }

    const orderData: any = {
      userId,
      total: total.toFixed(2),
      status: "paid",
      paymentId,
    };

    if (delivery) {
      orderData.deliveryName = delivery.fullName;
      orderData.deliveryAddress = delivery.address;
      orderData.deliveryCity = delivery.city;
      orderData.deliveryState = delivery.state;
      orderData.deliveryZip = delivery.zip;
      orderData.deliveryPhone = delivery.phone;
      orderData.deliveryEmail = delivery.email || null;
    }

    const [order] = await db.insert(orders).values(orderData).returning();

    for (const item of items) {
      await db.insert(orderItems).values({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    return order;
  }

  async getOrders(userId: string): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
  }

  // Appointments
  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const [newAppointment] = await db.insert(appointments).values(appointment).returning();
    return newAppointment;
  }

  // Locations
  async getLocations(): Promise<Location[]> {
    return await db.select().from(locations);
  }

  // Reviews
  async getReviews(): Promise<Review[]> {
    return await db.select().from(reviews).orderBy(desc(reviews.createdAt));
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db.insert(reviews).values(review).returning();
    return newReview;
  }
}

export const storage = new DatabaseStorage();
