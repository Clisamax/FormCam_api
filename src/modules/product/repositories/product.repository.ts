import { prisma } from "../../../shared/lib/client";
import { Product, ProductCreate, ProductDto } from "../dto/product.dto";


export class ProductRepository implements ProductDto {
	async create(data: ProductCreate): Promise<Product> {
		const result = await prisma.product.create({
			data: {
				uuid: data.uuid,
				name: data.name,
				product: data.product,
				quantity: data.quantity,
				unit: data.unit,
				nameOfResponsible: data.nameOfResponsible,
				occurrenceDate: data.occurrenceDate
			}
		})
		return result as unknown as Product
	}
}