import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: { "x-kigali-admin-key": process.env.ADMIN_API_KEY },
    } as unknown as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

const onePixelPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLJxAAAAABJRU5ErkJggg==";

describe("admin management API", () => {
  it("reads orders and contact messages, and preserves an existing catalog record through an authenticated update", async () => {
    const caller = appRouter.createCaller(createContext());
    const [catalog, orders, contacts] = await Promise.all([
      caller.admin.catalog.list(),
      caller.admin.orders.list(),
      caller.admin.contacts.list(),
    ]);
    expect(Array.isArray(orders)).toBe(true);
    expect(Array.isArray(contacts)).toBe(true);
    expect(catalog.length).toBeGreaterThan(0);

    const product = catalog[0];
    await expect(caller.admin.catalog.upsert({
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      flowerType: product.flowerType,
      priceRwf: product.priceRwf,
      imageUrl: product.imageUrl,
      imageKey: product.imageKey ?? undefined,
      tag: product.tag ?? undefined,
      collections: JSON.parse(product.collections),
      description: product.description,
      active: Boolean(product.active),
    })).resolves.toBe(product.id);
  });

  it("uploads a valid catalog image without publishing it to a flower record", async () => {
    const caller = appRouter.createCaller(createContext());
    const upload = await caller.admin.catalog.uploadImage({ filename: "admin-api-verification.png", dataUrl: onePixelPng });
    expect(upload.key).toContain("catalog/");
    expect(upload.url).toMatch(/^(https?:\/\/|\/manus-storage\/)/);
  });
});
