import { describe, expect, it } from "vitest";

describe("managed project branding", () => {
  it("uses the uploaded Kigali Bouqs flower logo for the Vite app identity", () => {
    expect(process.env.VITE_APP_LOGO).toBe("/manus-storage/kigali-bouqs-logo_d0a4fb5e.png");
  });

  it("uses Kigali Bouqs as the managed Vite app title", () => {
    expect(process.env.VITE_APP_TITLE).toBe("Kigali Bouqs");
  });
});
