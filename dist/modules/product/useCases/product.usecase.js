import { ProductRepository } from '../repositories/product.repository';
class ProductUseCase {
    productRepository;
    constructor() {
        this.productRepository = new ProductRepository();
    }
    async createProduct(data) {
        try {
            const product = await this.productRepository.create(data);
            return product;
        }
        catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }
}
export default ProductUseCase;
