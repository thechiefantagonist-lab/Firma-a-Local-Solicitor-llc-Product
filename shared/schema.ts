import { pgTable, text, serial, integer, boolean, timestamp, decimal, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./models/auth";

export * from "./models/auth";

// Products Table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(), // 'oil', 'vinegar', 'set'
  stock: integer("stock").notNull().default(0),
});

// Orders Table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  status: text("status").notNull().default("pending"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  paymentId: text("payment_id"),
  deliveryName: text("delivery_name"),
  deliveryAddress: text("delivery_address"),
  deliveryCity: text("delivery_city"),
  deliveryState: text("delivery_state"),
  deliveryZip: text("delivery_zip"),
  deliveryPhone: text("delivery_phone"),
  deliveryEmail: text("delivery_email"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Order Items Table
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(), // Price at time of purchase
});

// Appointments/Networking Table
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  businessName: text("business_name"), // Optional, for individuals or businesses
  phone: text("phone"),
  message: text("message").notNull(),
  requestedDate: timestamp("requested_date"),
  status: text("status").notNull().default("pending"), // pending, confirmed, contacted
  createdAt: timestamp("created_at").defaultNow(),
});

// Locations Table
export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  type: text("type").notNull(), // 'market', 'restaurant'
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
});

// Reviews Table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  rating: integer("rating").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schemas
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });
export const insertOrderItemSchema = createInsertSchema(orderItems).omit({ id: true });
export const insertAppointmentSchema = createInsertSchema(appointments).omit({ id: true, createdAt: true, status: true });
export const insertLocationSchema = createInsertSchema(locations).omit({ id: true });
export const insertReviewSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true });

// Types
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Location = typeof locations.$inferSelect;
export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
