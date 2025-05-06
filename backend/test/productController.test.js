const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const Product = require("../models/productModel");

jest.mock("../models/productModel"); 


const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  return res;
};

describe("Product Controller - Unit Tests", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("createProduct - should create product", async () => {
    const req = { body: { name: "test", price: 10 } };
    const res = mockRes();
    Product.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(req.body)
    }));

    await createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it("getAllProducts - should return products", async () => {
    const req = {};
    const res = mockRes();
    const mockData = [{ name: "a" }, { name: "b" }];

    Product.find.mockResolvedValue(mockData);

    await getAllProducts(req, res);

    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it("getProductById - should return product", async () => {
    const req = { params: { id: "1" } };
    const res = mockRes();
    const mockProduct = { name: "Product" };

    Product.findById.mockResolvedValue(mockProduct);

    await getProductById(req, res);

    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });

  it("updateProduct - should update and return product", async () => {
    const req = { params: { id: "1" }, body: { name: "updated" } };
    const res = mockRes();

    Product.findByIdAndUpdate.mockResolvedValue(req.body);

    await updateProduct(req, res);

    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it("deleteProduct - should delete product", async () => {
    const req = { params: { id: "1" } };
    const res = mockRes();

    Product.findByIdAndDelete.mockResolvedValue({});

    await deleteProduct(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: "Product deleted" });
  });

});
