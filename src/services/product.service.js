import ProductRepository from "../repositories/product.repository.js";

const productRepository = new ProductRepository();

class ProductService {
    async getAllProducts(params) {
        return await productRepository.getAllProducts(params);
    }
    
    async getProductById(pid) {
        return await productRepository.getProductById(pid); // <--- Unifica el nombre aquí
    }
    
    async createProduct(product) {
        return await productRepository.createProduct(product);
    }
    
    async updateProduct(pid, productUpdate) {
        return await productRepository.updateProduct(pid, productUpdate);
    }
    
    async deleteProduct(pid) {
        return await productRepository.deleteProduct(pid);
    }
}

export default ProductService;