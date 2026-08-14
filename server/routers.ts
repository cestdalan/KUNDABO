import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { createContactMessage, createOrder, deleteProduct, listAdminCatalog, listCatalog, listContactMessages, listOrders, upsertProduct } from "./commerce";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";
import { sendEmailWhenConfigured } from "./emailBridge";
import { announceNewMessage, announceNewOrder } from "./activityNotifications";
import { getAdminPushPublicKey, upsertAdminPushSubscription } from "./webPush";

const adminKeyProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const suppliedKey = ctx.req.headers["x-kigali-admin-key"];
  if (!process.env.ADMIN_API_KEY || suppliedKey !== process.env.ADMIN_API_KEY) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin API key is required" });
  }
  return next();
});

const productInput = z.object({
  id: z.number().int().positive().optional(),
  slug: z.string().min(3).max(128).regex(/^[a-z0-9-]+$/),
  name: z.string().min(2).max(255),
  category: z.string().min(2).max(64),
  flowerType: z.string().min(2).max(96),
  priceRwf: z.number().int().positive(),
  imageUrl: z.string().min(1),
  imageKey: z.string().max(512).optional(),
  tag: z.string().max(96).optional(),
  collections: z.array(z.string().min(1).max(64)).max(12),
  description: z.string().min(10).max(4000),
  active: z.boolean(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  catalog: router({
    list: publicProcedure.query(() => listCatalog()),
  }),
  contact: router({
    create: publicProcedure.input(z.object({
      name: z.string().min(2).max(160),
      email: z.string().email().max(320),
      phone: z.string().max(40).optional(),
      message: z.string().min(10).max(4000),
    })).mutation(async ({ input }) => {
      const record = await createContactMessage(input);
      const recipient = process.env.SMTP_TO;
      if (recipient) {
        await sendEmailWhenConfigured({
          recipient,
          subject: `New Kigali Bouqs enquiry from ${input.name}`,
          text: `${input.name} (${input.email}${input.phone ? `, ${input.phone}` : ""}) wrote:\n\n${input.message}`,
        });
      }
      await announceNewMessage({ name: input.name });
      return record;
    }),
  }),
  orders: router({
    create: publicProcedure.input(z.object({
      customerName: z.string().min(2).max(160),
      email: z.string().email().max(320),
      phone: z.string().min(6).max(40),
      deliveryAddress: z.string().max(1000).optional(),
      fulfillment: z.enum(["delivery", "pickup"]),
      paymentMethod: z.enum(["momo", "airtel", "card"]),
      paymentReference: z.string().max(96).optional(),
      items: z.array(z.object({ productSlug: z.string().min(1), quantity: z.number().int().min(1).max(20) })).min(1).max(30),
    })).mutation(async ({ input }) => {
      const order = await createOrder(input);
      const recipient = process.env.SMTP_TO;
      if (recipient) {
        await sendEmailWhenConfigured({
          recipient,
          subject: `New Kigali Bouqs order ${order.orderNumber}`,
          text: `${input.customerName} placed ${order.orderNumber} for RWF ${order.totalRwf.toLocaleString("en-RW")}.`,
        });
      }
      await announceNewOrder({ orderNumber: order.orderNumber, customerName: input.customerName, totalRwf: order.totalRwf });
      return order;
    }),
  }),
  admin: router({
    catalog: router({
      list: adminKeyProcedure.query(() => listAdminCatalog()),
      upsert: adminKeyProcedure.input(productInput).mutation(({ input }) => upsertProduct(input)),
      remove: adminKeyProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ input }) => deleteProduct(input.id)),
      uploadImage: adminKeyProcedure.input(z.object({
        filename: z.string().min(1).max(160),
        dataUrl: z.string().max(7_000_000),
      })).mutation(async ({ input }) => {
        const match = input.dataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
        if (!match) throw new TRPCError({ code: "BAD_REQUEST", message: "Upload a JPG, PNG, or WebP image" });
        const extension = match[1].split("/")[1];
        const filename = input.filename.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/\.[^.]+$/, "");
        return storagePut(`catalog/${Date.now()}-${filename}.${extension}`, Buffer.from(match[2], "base64"), match[1]);
      }),
    }),
    orders: router({
      list: adminKeyProcedure.query(() => listOrders()),
    }),
    contacts: router({
      list: adminKeyProcedure.query(() => listContactMessages()),
    }),
    push: router({
      publicConfig: adminKeyProcedure.query(() => ({ publicKey: getAdminPushPublicKey() })),
      subscribe: adminKeyProcedure.input(z.object({
        endpoint: z.string().url().max(4096),
        keys: z.object({
          p256dh: z.string().min(16).max(255),
          auth: z.string().min(8).max(255),
        }),
        userAgent: z.string().max(512).optional(),
      })).mutation(({ input }) => upsertAdminPushSubscription(input)),
    }),
  }),
});

export type AppRouter = typeof appRouter;
