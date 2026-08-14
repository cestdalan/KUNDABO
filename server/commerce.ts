import { and, desc, eq, inArray } from "drizzle-orm";
import { contactMessages, orderItems, orders, products } from "../drizzle/schema";
import { getDb } from "./db";

export type StorefrontProduct = {
  id: string;
  databaseId?: number;
  name: string;
  category: string;
  type: string;
  price: number;
  image: string;
  tag?: string;
  collections: string[];
  description: string;
};

const catalogSeed: StorefrontProduct[] = [
  { id: "yellow-hibiscus", name: "Flowering Yellow Hibiscus Plant", category: "Plants", type: "Hibiscus", price: 45000, image: "/yellow_hibiscus.jpg", tag: "Best Seller", collections: ["Garden", "Birthday"], description: "A tropical hibiscus plant with vibrant yellow blooms for bright terraces and gardens." },
  { id: "spring-blossom", name: "Spring Blossom Hand-Tied Bouquet", category: "Flowers", type: "Bouquets", price: 50000, image: "/meadow_grass_bouquet.jpg", tag: "Fresh Cut", collections: ["Birthday", "Wedding"], description: "A hand-tied bouquet of fresh field flowers, daisies, and peach roses." },
  { id: "pastel-meadow", name: "Pastel Meadow Bouquet", category: "Flowers", type: "Bouquets", price: 55000, image: "/vibrant_roses_bouquet.jpg", tag: "Seasonal Special", collections: ["Birthday", "Wedding"], description: "A romantic seasonal arrangement of roses, alstroemeria, and lush greenery." },
  { id: "crimson-roses", name: "Crimson Desire Premium Roses", category: "Flowers", type: "Roses", price: 65000, image: "/red_roses_mesh_bouquet.jpg", tag: "Romantic Choice", collections: ["Wedding", "Birthday"], description: "A dozen long-stemmed crimson roses wrapped in premium mesh and craft paper." },
  { id: "white-hydrangeas", name: "White Hydrangeas Bouquet", category: "Flowers", type: "Hydrangeas", price: 42000, image: "/white_hydrangeas_bouquet.jpg", tag: "Sympathy & Grace", collections: ["Funeral", "Wedding"], description: "A graceful white hydrangea bouquet wrapped in signature craft paper." },
  { id: "golden-tulips", name: "Golden Sunburst Tulips", category: "Flowers", type: "Tulips", price: 35000, image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80", tag: "Bright Day", collections: ["Birthday"], description: "Golden tulips with blue eucalyptus for a bright and joyful gift." },
  { id: "royal-orchid", name: "Royal Orchid Cascade", category: "Plants", type: "Orchids", price: 75000, image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80", tag: "Rare Exotic", collections: ["Birthday", "Funeral"], description: "A double-spike orchid in a premium ceramic planter." },
  { id: "glass-vase", name: "Glass Vase with Fresh Blooms", category: "Vases", type: "Vases", price: 32000, image: "/glass_vase_flowers.jpg", tag: "Artisanal", collections: ["Garden", "Wedding"], description: "An elegant glass vase styled with a cluster of fresh pink and red blossoms." },
];

function mapProduct(row: typeof products.$inferSelect): StorefrontProduct {
  return {
    id: row.slug,
    databaseId: row.id,
    name: row.name,
    category: row.category,
    type: row.flowerType,
    price: row.priceRwf,
    image: row.imageUrl,
    tag: row.tag ?? undefined,
    collections: JSON.parse(row.collections) as string[],
    description: row.description,
  };
}

async function seedCatalog() {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select({ id: products.id }).from(products).limit(1);
  if (existing.length) return;
  await db.insert(products).values(catalogSeed.map((product) => ({
    slug: product.id,
    name: product.name,
    category: product.category,
    flowerType: product.type,
    priceRwf: product.price,
    imageUrl: product.image,
    tag: product.tag,
    collections: JSON.stringify(product.collections),
    description: product.description,
  })));
}

export async function listCatalog() {
  const db = await getDb();
  if (!db) return catalogSeed;
  await seedCatalog();
  const rows = await db.select().from(products).where(eq(products.active, 1)).orderBy(desc(products.updatedAt));
  return rows.map(mapProduct);
}

export async function listAdminCatalog() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  await seedCatalog();
  return db.select().from(products).orderBy(desc(products.updatedAt));
}

export async function upsertProduct(input: {
  id?: number;
  slug: string;
  name: string;
  category: string;
  flowerType: string;
  priceRwf: number;
  imageUrl: string;
  imageKey?: string;
  tag?: string;
  collections: string[];
  description: string;
  active: boolean;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const values = {
    slug: input.slug,
    name: input.name,
    category: input.category,
    flowerType: input.flowerType,
    priceRwf: input.priceRwf,
    imageUrl: input.imageUrl,
    imageKey: input.imageKey,
    tag: input.tag,
    collections: JSON.stringify(input.collections),
    description: input.description,
    active: input.active ? 1 : 0,
  };
  if (input.id) {
    await db.update(products).set(values).where(eq(products.id, input.id));
    return input.id;
  }
  const result = await db.insert(products).values(values);
  return Number(result[0].insertId);
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  await db.delete(products).where(eq(products.id, id));
}

export async function createOrder(input: {
  customerName: string;
  email: string;
  phone: string;
  deliveryAddress?: string;
  fulfillment: "delivery" | "pickup";
  paymentMethod: "momo" | "airtel" | "card";
  paymentReference?: string;
  items: Array<{ productSlug: string; quantity: number }>;
}) {
  const db = await getDb();
  if (!db) throw new Error("Order service is temporarily unavailable");
  const slugs = [...new Set(input.items.map((item) => item.productSlug))];
  const catalog = await db.select().from(products).where(and(inArray(products.slug, slugs), eq(products.active, 1)));
  if (catalog.length !== slugs.length) throw new Error("One or more selected flowers are no longer available");
  const lines = input.items.map((item) => {
    const product = catalog.find((entry) => entry.slug === item.productSlug);
    if (!product) throw new Error("Invalid product selection");
    return { product, quantity: item.quantity, lineTotal: product.priceRwf * item.quantity };
  });
  const subtotalRwf = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const deliveryRwf = input.fulfillment === "delivery" && subtotalRwf < 150000 ? 5000 : 0;
  const totalRwf = subtotalRwf + deliveryRwf;
  const orderNumber = `KB-${Date.now().toString().slice(-8)}`;
  const result = await db.insert(orders).values({
    orderNumber,
    customerName: input.customerName,
    email: input.email,
    phone: input.phone,
    deliveryAddress: input.deliveryAddress,
    fulfillment: input.fulfillment,
    paymentMethod: input.paymentMethod,
    paymentReference: input.paymentReference,
    subtotalRwf,
    deliveryRwf,
    totalRwf,
    emailStatus: process.env.SMTP_HOST ? "queued" : "disabled",
  });
  const orderId = Number(result[0].insertId);
  await db.insert(orderItems).values(lines.map((line) => ({
    orderId,
    productId: line.product.id,
    productName: line.product.name,
    unitPriceRwf: line.product.priceRwf,
    quantity: line.quantity,
  })));
  return { orderId, orderNumber, subtotalRwf, deliveryRwf, totalRwf, emailEnabled: Boolean(process.env.SMTP_HOST) };
}

export async function createContactMessage(input: { name: string; email: string; phone?: string; message: string }) {
  const db = await getDb();
  if (!db) throw new Error("Contact service is temporarily unavailable");
  const result = await db.insert(contactMessages).values({
    ...input,
    emailStatus: process.env.SMTP_HOST ? "queued" : "disabled",
  });
  return { id: Number(result[0].insertId), emailEnabled: Boolean(process.env.SMTP_HOST) };
}

export async function listOrders() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.select().from(orders).orderBy(desc(orders.createdAt));
}

export async function deleteOrder(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  await db.transaction(async (tx) => {
    await tx.delete(orderItems).where(eq(orderItems.orderId, id));
    await tx.delete(orders).where(eq(orders.id, id));
  });
}

export async function listContactMessages() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}

export async function deleteContactMessage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
}
