import { describe, expect, it } from "vitest";
import { formatRwf } from "./currency";

describe("formatRwf", () => {
  it("formats whole amounts as Rwandan francs", () => {
    expect(formatRwf(65000)).toContain("65,000");
    expect(formatRwf(65000)).toMatch(/RWF|RF/);
  });
});
