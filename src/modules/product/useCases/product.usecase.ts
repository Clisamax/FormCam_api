import { Product, ProductCreate } from '../dto/product.dto';
import { ProductRepository } from '../repositories/product.repository';

class ProductUseCase {
	private productRepository: ProductRepository;
	constructor() {
		this.productRepository = new ProductRepository();
	}
	async createProduct(data: ProductCreate): Promise<Product> {
		try {
			const product = await this.productRepository.create(data);
			return product;
		} catch (error) {
			console.error('Error creating product:', error);
			throw error;
		}
	}
}

export default ProductUseCase;