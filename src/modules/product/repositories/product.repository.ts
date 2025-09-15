import { prisma } from "../../../shared/lib/client";
import { Product, ProductCreate, ProductDto } from "../dto/product.dto";

export class ProductRepository implements ProductDto {
	async create(data: ProductCreate): Promise<Product> {
		try {
			// Busca o último uuid de Occurrence
			const lastOccurrence = await prisma.occurrence.findFirst({
				orderBy: { createdAt: 'desc' },
				select: { uuid: true }
			});
			if (!lastOccurrence || !lastOccurrence.uuid) {
				throw new Error('Nenhuma ocorrência encontrada para associar o uuid ao produto.');
			}

			// Garante que occurrenceDate é um objeto Date
			const occurrenceDate = data.occurrenceDate instanceof Date
				? data.occurrenceDate
				: new Date(data.occurrenceDate);

			const result = await prisma.product.create({
				data: {
					uuid: lastOccurrence.uuid, // Sempre usa o último uuid de Occurrence
					name: data.name,
					product: data.product,
					quantity: data.quantity,
					unit: data.unit,
					nameOfResponsible: data.nameOfResponsible,
					occurrenceDate
				}
			});
			return result as unknown as Product;
		} catch (error) {
			console.error('Erro ao criar produto no repositório:', error);
			throw error;
		}
	}
}