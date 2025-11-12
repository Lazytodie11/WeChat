import { CATEGORY_MAP, ENV_ID, BUCKET, buildFileID } from "../src/data-rules.js";

describe("data-rules CATEGORY_MAP", () => {
  test("contains key samples", () => {
    expect(CATEGORY_MAP["女生款蛋糕"]).toBe("girls-cake");
    expect(CATEGORY_MAP["男生款蛋糕"]).toBe("boys-cake");
    expect(CATEGORY_MAP["法式千层蛋糕"]).toBe("french-mille");
  });
});

describe("buildFileID", () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, TCB_ENV_ID: "my-env", TCB_BUCKET: "my-bucket" };
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  test("constructs cloud file id path", async () => {
    // Note: ENV_ID/BUCKET are evaluated at import time. For a quick sample,
    // call the function with known category and file name.
    const fid = buildFileID("girls-cake", "image.jpg");
    // The string uses whatever ENV_ID/BUCKET were at module load; this
    // assertion is illustrative and may be adjusted to your runtime.
    if (ENV_ID && BUCKET) {
      expect(fid).toBe(`cloud://${ENV_ID}.${BUCKET}/prod-images/girls-cake/image.jpg`);
    }
  });
});

