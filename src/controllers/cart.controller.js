import CartService from '../services/cart.service.js';

const cartService = new CartService();

class CartController {
    async getProductsFromCartByID(req, res) {
        const cid = req.params.cid;
        const cart = await cartService.getById(cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }
        res.json({ status: 'success', cart });
    }

    async createCart(req, res) {
        const result = await cartService.createCart();
        res.json({ status: 'success', payload: result });
    }

    async addProductByID(req, res) {
        const { cid, pid } = req.params;
        const result = await cartService.addProductByID(cid, pid); // <-- Cambia aquí
        if (!result) {
            return res.status(404).json({ status: 'error', message: 'Cart or Product not found' });
        }
        res.json({ status: 'success', payload: result });
    }

    async deleteProductByID(req, res) {
        const { cid, pid } = req.params;
        const result = await cartService.deleteProductByID(cid, pid); // <-- Cambia aquí
        if (!result) {
            return res.status(404).json({ status: 'error', message: 'Cart or Product not found' });
        }
        res.json({ status: 'success', payload: result });
    }

   async updateAllProducts(req, res) {
        const { cid } = req.params;
        const products = req.body.products;
        if (!products || !Array.isArray(products)) {
            return res.status(400).json({ status: 'error', message: 'Invalid products data' });
        }
        const result = await cartService.updateAllProducts(cid, products);
        if (!result) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }
        res.json({ status: 'success', payload: result });
    }

    async updateProductByID(req, res) {
        const { cid, pid } = req.params;
        const productData = req.body;
        const result = await cartService.updateProductByID(cid, pid, productData); // <-- Cambia aquí
        if (!result) {
            return res.status(404).json({ status: 'error', message: 'Cart or Product not found' });
        }
        res.json({ status: 'success', payload: result });
    }

    async deleteAllProducts(req, res) {
        const cid = req.params.cid;
        const result = await cartService.deleteAllProducts(cid);
        if (!result) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }
        res.json({ status: 'success', message: 'All products deleted successfully' });
    }


}

export default CartController;