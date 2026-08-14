import { notifyOwner } from "./_core/notification";
import { dispatchAdminPush } from "./webPush";

async function settle(label: string, action: Promise<unknown>) {
  try {
    await action;
  } catch (error) {
    console.warn(`[ActivityNotification] ${label} failed`, error);
  }
}

export function announceNewOrder(input: { orderNumber: string; customerName: string; totalRwf: number }) {
  const total = `RWF ${input.totalRwf.toLocaleString("en-RW")}`;
  return Promise.all([
    settle("owner order alert", notifyOwner({ title: "New Kigali Bouqs order", content: `${input.orderNumber} from ${input.customerName} for ${total}.` })),
    settle("admin order push", dispatchAdminPush({
      title: "New Kigali Bouqs order",
      body: `${input.orderNumber} · ${total}`,
      tag: "kigali-bouqs-order",
      url: "/?tab=orders",
    })),
  ]);
}

export function announceNewMessage(input: { name: string }) {
  return Promise.all([
    settle("owner message alert", notifyOwner({ title: "New Kigali Bouqs message", content: `A new customer message was received from ${input.name}.` })),
    settle("admin message push", dispatchAdminPush({
      title: "New Kigali Bouqs message",
      body: `Message received from ${input.name}.`,
      tag: "kigali-bouqs-message",
      url: "/?tab=contacts",
    })),
  ]);
}
