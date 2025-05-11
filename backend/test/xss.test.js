const request = require("supertest");
const app = require("../app");

describe("XSS Protection", () => {
  it("should sanitize script tags", async () => {
    const maliciousInput = "<script>alert('xss')</script>";
    const res = await request(app)
      .post("/test")
      .send({ comment: maliciousInput })
      .set("Content-Type", "application/json");

    console.log("Response:", res.body);

    expect(res.body.sanitized).not.toContain("<script>");
    expect(res.body.sanitized).toContain("&lt;script&gt;");
  });
});
