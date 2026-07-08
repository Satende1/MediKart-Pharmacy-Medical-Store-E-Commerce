import products from "./products";

describe("products data", () => {
  test("exports an array", () => {
    expect(Array.isArray(products)).toBe(true);
  });

  test("contains 15 products", () => {
    expect(products).toHaveLength(15);
  });

  test("every product has required properties", () => {
    products.forEach((product) => {
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("brand");
      expect(product).toHaveProperty("category");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("rating");
      expect(product).toHaveProperty("reviews");
      expect(product).toHaveProperty("discount");
      expect(product).toHaveProperty("image");
      expect(product).toHaveProperty("packSize");
      expect(product).toHaveProperty("expiry");
      expect(product).toHaveProperty("delivery");
      expect(product).toHaveProperty("returnPolicy");
      expect(product).toHaveProperty("stock");
      expect(product).toHaveProperty("description");
    });
  });

  test("all product ids are unique", () => {
    const ids = products.map((product) => product.id);
    expect(new Set(ids).size).toBe(products.length);
  });

  test("all prices are greater than zero", () => {
    products.forEach((product) => {
      expect(product.price).toBeGreaterThan(0);
    });
  });

  test("ratings are between 0 and 5", () => {
    products.forEach((product) => {
      expect(product.rating).toBeGreaterThanOrEqual(0);
      expect(product.rating).toBeLessThanOrEqual(5);
    });
  });

  test("discounts are between 0 and 100", () => {
    products.forEach((product) => {
      expect(product.discount).toBeGreaterThanOrEqual(0);
      expect(product.discount).toBeLessThanOrEqual(100);
    });
  });

  test("stock is boolean", () => {
    products.forEach((product) => {
      expect(typeof product.stock).toBe("boolean");
    });
  });

  test("all product names are non-empty", () => {
    products.forEach((product) => {
      expect(product.name.length).toBeGreaterThan(0);
    });
  });

  test("all descriptions are non-empty", () => {
    products.forEach((product) => {
      expect(product.description.length).toBeGreaterThan(0);
    });
  });

  test("contains Paracetamol product", () => {
    expect(products.find((p) => p.name === "Paracetamol")).toBeDefined();
  });

  test("contains Dolo 650 product", () => {
    expect(products.find((p) => p.name === "Dolo 650")).toBeDefined();
  });

  test("contains Cough Syrup product", () => {
    expect(products.find((p) => p.name === "Cough Syrup")).toBeDefined();
  });
});