import mockProducts from "../mock/mockProducts.js";

class MockProductService {
  getAll() {
    return mockProducts;
  }

  getById(pid) {
    const index = parseInt(pid, 10);
    if (isNaN(index) || index < 0 || index >= mockProducts.length) {
      throw new Error("Producto no encontrado");
    }
    return mockProducts[index];
  }
}

export default new MockProductService();
