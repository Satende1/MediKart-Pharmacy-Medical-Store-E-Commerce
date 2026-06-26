import products from "./products";

describe("Products Data", () => {
  test("should export an array", () => {
    expect(Array.isArray(products)).toBe(true);
  });

  test("should contain 7 products", () => {
    expect(products).toHaveLength(7);
  });

  test("each product should have required properties", () => {
    products.forEach((product) => {
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("category");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("rating");
      expect(product).toHaveProperty("image");
    });
  });

  test("product ids should be unique", () => {
    const ids = products.map((product) => product.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("price should be greater than zero", () => {
    products.forEach((product) => {
      expect(product.price).toBeGreaterThan(0);
    });
  });

  test("rating should be between 0 and 5", () => {
    products.forEach((product) => {
      expect(product.rating).toBeGreaterThanOrEqual(0);
      expect(product.rating).toBeLessThanOrEqual(5);
    });
  });

  test("image should not be empty", () => {
    products.forEach((product) => {
      expect(product.image).toBeTruthy();
    });
  });

  test("product names should not be empty", () => {
    products.forEach((product) => {
      expect(product.name.trim()).not.toBe("");
    });
  });

  test("categories should not be empty", () => {
    products.forEach((product) => {
      expect(product.category.trim()).not.toBe("");
    });
  });
});