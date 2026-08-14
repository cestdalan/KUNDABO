import { afterEach, describe, expect, it } from "vitest";
import { sendEmailWhenConfigured } from "./emailBridge";

const smtpKeys = ["SMTP_HOST", "SMTP_USERNAME", "SMTP_PASSWORD", "SMTP_FROM"] as const;
const original = Object.fromEntries(smtpKeys.map((key) => [key, process.env[key]]));

afterEach(() => {
  smtpKeys.forEach((key) => {
    if (original[key] === undefined) delete process.env[key];
    else process.env[key] = original[key];
  });
});

describe("sendEmailWhenConfigured", () => {
  it("defers delivery when SMTP credentials have not been configured", async () => {
    smtpKeys.forEach((key) => delete process.env[key]);
    await expect(sendEmailWhenConfigured({ recipient: "orders@example.com", subject: "Order", text: "Test" }))
      .resolves.toEqual({ dispatched: false, reason: "SMTP credentials are not configured" });
  });
});
