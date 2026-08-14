import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(adminKey?: string): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: adminKey ? { "x-kigali-admin-key": adminKey } : {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("admin order and message deletion guard", () => {
  it("rejects unauthenticated deletion requests", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.admin.orders.remove({ id: 2_147_483_647 })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(caller.admin.contacts.remove({ id: 2_147_483_647 })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("accepts authenticated no-op deletion requests without creating test records", async () => {
    const caller = appRouter.createCaller(createContext(process.env.ADMIN_API_KEY));
    await expect(caller.admin.orders.remove({ id: 2_147_483_647 })).resolves.toBeUndefined();
    await expect(caller.admin.contacts.remove({ id: 2_147_483_647 })).resolves.toBeUndefined();
  });
});
