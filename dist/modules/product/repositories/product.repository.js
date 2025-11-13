import { v4 as uuidv4 } from 'uuid';
import { prisma } from "../../../shared/lib/client";
export class ProductRepository {
    async create(data) {
        try {
            // Garante que occurrenceDate é um objeto Date
            const occurrenceDate = data.occurrenceDate instanceof Date
                ? data.occurrenceDate
                : new Date(data.occurrenceDate);
            const result = await prisma.product.create({
                data: {
                    id: uuidv4(),
                    name: data.name,
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
            return result;
        }
        catch (error) {
            console.error('Erro ao criar produto no repositório:', error);
            throw error;
        }
    }
}
