import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(adminKey?: string): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: adminKey ? { "x-kigali-admin-key": adminKey } : {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("admin API key guard", () => {
  it("accepts the configured ADMIN_API_KEY for the catalog endpoint", async () => {
    expect(process.env.ADMIN_API_KEY).toBeTruthy();
    const caller = appRouter.createCaller(createContext(process.env.ADMIN_API_KEY));
    const catalog = await caller.admin.catalog.list();
    expect(Array.isArray(catalog)).toBe(true);
  });

  it("rejects a missing admin key", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.admin.catalog.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
