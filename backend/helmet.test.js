const request = require("supertest");
const app = require("../app"); // تأكد أن المسار صحيح إلى ملف app.js

jest.setTimeout(10000); // زيادة المهلة الزمنية للاختبار إلى 10 ثواني

describe("Helmet Middleware", () => {
  it("should set HTTP security headers", async () => {
    // استخدام نقطة نهاية أبسط لاختبار هيدرز Helmet
    const res = await request(app).get("/helmet-test");

    // التحقق من الهيدرز
    expect(res.headers["x-dns-prefetch-control"]).toBe("off");
    expect(res.headers["x-frame-options"]).toBe("SAMEORIGIN");
    expect(res.headers["x-xss-protection"]).toBe("0"); // Helmet بيوقفها لأنها deprecated
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
  });
});
