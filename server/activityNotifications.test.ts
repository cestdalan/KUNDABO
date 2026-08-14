import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  notifyOwner: vi.fn(),
  dispatchAdminPush: vi.fn(),
}));

vi.mock("./_core/notification", () => ({ notifyOwner: mocks.notifyOwner }));
vi.mock("./webPush", () => ({ dispatchAdminPush: mocks.dispatchAdminPush }));

import { announceNewMessage, announceNewOrder } from "./activityNotifications";

describe("Kigali Bouqs activity notifications", () => {
  beforeEach(() => {
    mocks.notifyOwner.mockResolvedValue(true);
    mocks.dispatchAdminPush.mockResolvedValue({ delivered: 1, removed: 0 });
  });

  it("announces a new order to both the owner and subscribed devices", async () => {
    await announceNewOrder({ orderNumber: "KB-12345678", customerName: "Aline", totalRwf: 65000 });

    expect(mocks.notifyOwner).toHaveBeenCalledWith(expect.objectContaining({ title: "New Kigali Bouqs order" }));
    expect(mocks.dispatchAdminPush).toHaveBeenCalledWith({
      title: "New Kigali Bouqs order",
      body: "KB-12345678 · RWF 65,000",
      tag: "kigali-bouqs-order",
      url: "/?tab=orders",
    });
  });

  it("announces a new customer message to both the owner and subscribed devices", async () => {
    await announceNewMessage({ name: "Aline" });

    expect(mocks.notifyOwner).toHaveBeenCalledWith(expect.objectContaining({ title: "New Kigali Bouqs message" }));
    expect(mocks.dispatchAdminPush).toHaveBeenCalledWith({
      title: "New Kigali Bouqs message",
      body: "Message received from Aline.",
      tag: "kigali-bouqs-message",
      url: "/?tab=contacts",
    });
  });
});
