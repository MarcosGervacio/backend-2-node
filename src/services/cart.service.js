import CartRepository from "../repositories/cart.repository.js";

const cartRepository = new CartRepository();

class CartService {
    async getAllCarts() {
        return await cartRepository.getAllCarts();
    }
    
    async getProductsFromCartByID(cid) {
        return await cartRepository.getProductsFromCartByID(cid);
    }
    
    async createCart() {
        return await cartRepository.createCart();
    }
    
    async addProductByID(cid, pid) {
        return await cartRepository.addProductByID(cid, pid);
    }
    
    async deleteProductByID(cid, pid) {
        return await cartRepository.deleteProductByID(cid, pid);
    }
    }

    export default CartService;