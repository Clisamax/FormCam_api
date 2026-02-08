import { prisma } from "../../../shared/lib/client.js";
export default class ProductUseCase {
    async createProduct(data) {
        // 1. Verifica se o UUID da ocorrência existe
        const occurrenceExists = await prisma.occurrence.findUnique({
            where: { uuid: data.uuid }
        });
        if (!occurrenceExists) {
            throw new Error("A ocorrência informada não existe ou o UUID está incorreto.");
        }
        // 2. Cria o produto vinculado à ocorrência
        const product = await prisma.product.create({
            data: {
                uuid: data.uuid,
                product: data.product,
                quantity: data.quantity,
                unit: data.unit,
                nameOfResponsible: data.nameOfResponsible,
                occurrenceDate: new Date(data.occurrenceDate),
            }
        });
        return product;
    }
}
