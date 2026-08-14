import { createHash } from "node:crypto";
import webpush from "web-push";
import { eq } from "drizzle-orm";
import { pushSubscriptions } from "../drizzle/schema";
import { getDb } from "./db";

type StoredSubscriptionInput = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  userAgent?: string;
};

export type AdminPushPayload = {
  title: string;
  body: string;
  tag: "kigali-bouqs-order" | "kigali-bouqs-message";
  url: string;
};

function getVapidConfig() {
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT;
  if (!publicKey || !privateKey || !subject) {
    throw new Error("Web-push credentials are not configured.");
  }
  return { publicKey, privateKey, subject };
}

function hashEndpoint(endpoint: string) {
  return createHash("sha256").update(endpoint).digest("hex");
}

export function getAdminPushPublicKey() {
  return getVapidConfig().publicKey;
}

export async function upsertAdminPushSubscription(input: StoredSubscriptionInput) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const endpointHash = hashEndpoint(input.endpoint);
  await db.insert(pushSubscriptions).values({
    endpointHash,
    endpoint: input.endpoint,
    p256dh: input.keys.p256dh,
    auth: input.keys.auth,
    userAgent: input.userAgent?.slice(0, 512),
  }).onDuplicateKeyUpdate({
    set: {
      endpoint: input.endpoint,
      p256dh: input.keys.p256dh,
      auth: input.keys.auth,
      userAgent: input.userAgent?.slice(0, 512),
      updatedAt: new Date(),
    },
  });
  return { subscribed: true } as const;
}

export async function dispatchAdminPush(payload: AdminPushPayload) {
  const db = await getDb();
  if (!db) return { delivered: 0, removed: 0 };
  const subscriptions = await db.select().from(pushSubscriptions);
  if (!subscriptions.length) return { delivered: 0, removed: 0 };

  const { publicKey, privateKey, subject } = getVapidConfig();
  webpush.setVapidDetails(subject, publicKey, privateKey);
  let delivered = 0;
  let removed = 0;

  await Promise.all(subscriptions.map(async (subscription) => {
    try {
      await webpush.sendNotification({
        endpoint: subscription.endpoint,
        keys: { p256dh: subscription.p256dh, auth: subscription.auth },
      }, JSON.stringify(payload), { TTL: 120 });
      delivered += 1;
    } catch (error) {
      const statusCode = typeof error === "object" && error && "statusCode" in error
        ? Number((error as { statusCode?: number }).statusCode)
        : undefined;
      if (statusCode === 404 || statusCode === 410) {
        await db.delete(pushSubscriptions).where(eq(pushSubscriptions.endpointHash, subscription.endpointHash));
        removed += 1;
        return;
      }
      console.warn("[WebPush] Failed to deliver notification", error);
    }
  }));

  return { delivered, removed };
}
