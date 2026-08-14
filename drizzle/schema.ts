import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  flowerType: varchar("flowerType", { length: 96 }).notNull(),
  priceRwf: int("priceRwf").notNull(),
  imageUrl: text("imageUrl").notNull(),
  imageKey: varchar("imageKey", { length: 512 }),
  tag: varchar("tag", { length: 96 }),
  collections: text("collections").notNull(),
  description: text("description").notNull(),
  active: int("active").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  orderNumber: varchar("orderNumber", { length: 32 }).notNull().unique(),
  customerName: varchar("customerName", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  deliveryAddress: text("deliveryAddress"),
  fulfillment: mysqlEnum("fulfillment", ["delivery", "pickup"]).notNull(),
  paymentMethod: mysqlEnum("paymentMethod", ["momo", "airtel", "card"]).notNull(),
  paymentReference: varchar("paymentReference", { length: 96 }),
  subtotalRwf: int("subtotalRwf").notNull(),
  deliveryRwf: int("deliveryRwf").notNull(),
  totalRwf: int("totalRwf").notNull(),
  status: mysqlEnum("status", ["requested", "confirmed", "completed", "cancelled"]).default("requested").notNull(),
  emailStatus: mysqlEnum("emailStatus", ["disabled", "queued", "sent", "failed"]).default("disabled").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const orderItems = mysqlTable("orderItems", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  productId: int("productId"),
  productName: varchar("productName", { length: 255 }).notNull(),
  unitPriceRwf: int("unitPriceRwf").notNull(),
  quantity: int("quantity").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const contactMessages = mysqlTable("contactMessages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "resolved"]).default("new").notNull(),
  emailStatus: mysqlEnum("emailStatus", ["disabled", "queued", "sent", "failed"]).default("disabled").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const pushSubscriptions = mysqlTable("pushSubscriptions", {
  id: int("id").autoincrement().primaryKey(),
  endpointHash: varchar("endpointHash", { length: 64 }).notNull().unique(),
  endpoint: text("endpoint").notNull(),
  p256dh: varchar("p256dh", { length: 255 }).notNull(),
  auth: varchar("auth", { length: 255 }).notNull(),
  userAgent: varchar("userAgent", { length: 512 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Product = typeof products.$inferSelect;
