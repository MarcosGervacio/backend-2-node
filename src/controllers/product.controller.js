import ProductService from '../services/product.service.js';

const productService = new ProductService();

class ProductController {  
    async getAllProducts(req, res) {
        const products = await productService.getAllProducts(); // <--- Cambia aquí
        res.json({ status: 'success', products });
    }

    async getProductByID(req, res) {
        const pid = req.params.pid;
        const product = await productService.getProductById(pid); // <--- Cambia aquí
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }
        res.json({ status: 'success', product });
    }
    
    async createProduct(req, res) {
        const { title, description, code, price, stock, category, thumbnails } = req.body;
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ status: 'error', message: 'Missing Fields' });
        }
        const result = await productService.createProduct({ title, description, code, price, stock, category, thumbnails });
        res.json({ status: 'success', payload: result });
    }

    async updateProduct(req, res) {
        const pid = req.params.pid;
        const productData = req.body;
        const result = await productService.updateProduct(pid, productData);
        if (!result) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }
        res.json({ status: 'success', payload: result });
    }

    async deleteProduct(req, res) {
        const pid = req.params.pid;
        const result = await productService.deleteProduct(pid);
        if (!result) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }
        res.json({ status: 'success', message: 'Product deleted successfully' });
    }


}

export default ProductController;