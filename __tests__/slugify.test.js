import { slugify } from "../src/slugify.js";

describe("slugify", () => {
  test("lowercases and trims", () => {
    expect(slugify("  Hello World  ")).toBe("hello-world");
  });

  test("removes diacritics", () => {
    expect(slugify("Crème brûlée")).toBe("creme-brulee");
  });

  test("drops non-latin characters (Chinese)", () => {
    expect(slugify("Hello 世界 蛋糕 123")).toBe("hello-123");
  });

  test("handles punctuation and multiple separators", () => {
    expect(slugify("A__B -- C")) .toBe("a-b-c");
  });

  test("handles brand-like middle dot and Chinese", () => {
    expect(slugify("T·y 堆堆千层系列")).toBe("ty");
  });
});

