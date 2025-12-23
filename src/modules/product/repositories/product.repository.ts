import { v4 as uuidv4 } from 'uuid';
import { prisma } from "../../../shared/lib/client.js";
import { Product, ProductCreate, ProductDto } from "../dto/product.dto.js";

export class ProductRepository implements ProductDto {
	async create(data: ProductCreate): Promise<Product> {
		try {

			// Garante que occurrenceDate é um objeto Date
			const occurrenceDate = data.occurrenceDate instanceof Date
				? data.occurrenceDate
				: new Date(data.occurrenceDate);

			const result = await prisma.product.create({
				data: {
					id: uuidv4(),
					product: data.product,
					quantity: data.quantity,
					unit: data.unit,
					nameOfResponsible: data.nameOfResponsible,
					occurrenceDate: occurrenceDate,
					occurrence: {
						connect: {
							uuid: data.uuid
						}

					}
				}
			});
			return result as unknown as Product;
		} catch (error) {
			console.error('Erro ao criar produto no repositório:', error);
			throw error;
		}
	}
}