import { describe, expect, it } from "vitest";
import { formatDate } from "../format";

describe("formatDate", () => {
  it("returns formatted date for valid ISO input", () => {
    const formatted = formatDate("2024-01-05T00:00:00.000Z");
    expect(formatted).toBe("Jan 5, 2024");
  });

  it("returns 'Coming soon' when date missing", () => {
    expect(formatDate(undefined)).toBe("Coming soon");
  });

  it("returns 'Coming soon' for invalid date string", () => {
    expect(formatDate("not-a-date")).toBe("Coming soon");
  });
});

