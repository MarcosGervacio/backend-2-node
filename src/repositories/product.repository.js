import { productDao } from "./daos/mongo/product.dao.js";

const productDAO = new productDao();

export default class ProductRepository {
  async getAllProducts(params) {
    return await productDAO.getAllProducts(params);
  }

  async getProductById(pid) {
    return await productDAO.getProductByID(pid);
  }

  async createProduct(product) {
    return await productDAO.createProduct(product);
  }

  async updateProduct(pid, obj) {
    return await productDAO.updateProduct(pid, obj);
  }

  async deleteProduct(pid) {
    return await productDAO.deleteProduct(pid);
  }
}