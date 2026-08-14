import { describe, expect, it } from "vitest";
import type { TrpcContext } from "./_core/context";
import { appRouter } from "./routers";

function createContext(adminKey?: string): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: adminKey ? { "x-kigali-admin-key": adminKey } : {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("web-push public configuration", () => {
  it("exposes the configured VAPID public key only through the protected admin endpoint", async () => {
    expect(process.env.ADMIN_API_KEY).toBeTruthy();
    const caller = appRouter.createCaller(createContext(process.env.ADMIN_API_KEY));
    await expect(caller.admin.push.publicConfig()).resolves.toEqual({ publicKey: process.env.VAPID_PUBLIC_KEY });
    const anonymous = appRouter.createCaller(createContext());
    await expect(anonymous.admin.push.publicConfig()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
