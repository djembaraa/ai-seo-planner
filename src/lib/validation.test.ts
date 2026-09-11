import { describe, it, expect } from "vitest";
import { generateRequestSchema } from "./validation";

describe("generateRequestSchema", () => {
  it("accepts a valid keyword", () => {
    const result = generateRequestSchema.safeParse({
      keyword: "content marketing strategy",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.keyword).toBe("content marketing strategy");
    }
  });

  it("strips HTML-like characters", () => {
    const result = generateRequestSchema.safeParse({
      keyword: "seo <script>alert(1)</script> planner",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.keyword).not.toContain("<");
      expect(result.data.keyword).not.toContain(">");
    }
  });

  it("collapses whitespace", () => {
    const result = generateRequestSchema.safeParse({
      keyword: "  content   marketing   strategy  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.keyword).toBe("content marketing strategy");
    }
  });

  it("rejects empty keyword", () => {
    const result = generateRequestSchema.safeParse({ keyword: "" });
    expect(result.success).toBe(false);
  });

  it("rejects missing keyword", () => {
    const result = generateRequestSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("rejects keyword over 200 characters", () => {
    const result = generateRequestSchema.safeParse({
      keyword: "a".repeat(201),
    });
    expect(result.success).toBe(false);
  });

  it("rejects keyword that becomes empty after sanitization", () => {
    const result = generateRequestSchema.safeParse({
      keyword: "<>{}[]",
    });
    expect(result.success).toBe(false);
  });
});
