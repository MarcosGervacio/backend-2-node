import { cartDao } from "./daos/mongo/cart.dao.js";

const cartDAO = new cartDao();

export default class CartRepository {
  async getAllCarts() {
    return await cartDAO.getAllCarts();
  }
  
  async getProductsFromCartByID(cid) {
    return await cartDAO.getProductsFromCartByID(cid);
  }
  
  async createCart() {
    return await cartDAO.createCart();
  }
  
  async addProductByID(cid, pid) {
    return await cartDAO.addProductByID(cid, pid);
  }
  
  async deleteProductByID(cid, pid) {
    return await cartDAO.deleteProductByID(cid, pid);
  }

  async updateAllProducts(cid, products) {
    return await cartDAO.updateAllProducts(cid, products);
  }

  async updateProductByID(cid, pid, quantity) {
    return await cartDAO.updateProductByID(cid, pid, quantity);
  }

  async deleteAllProducts(cid) {
    return await cartDAO.deleteAllProducts(cid);
  }
}
