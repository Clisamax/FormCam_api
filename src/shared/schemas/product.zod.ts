import { z } from 'zod';

export const createProductSchema = z.object({
	uuid: z.string().min(1).max(100).describe('UUID da ocorrência (enviado pelo app)'),
	product: z.string().min(1).max(100).describe('Tipo do produto'),
	quantity: z.number().int().min(1).describe('Quantidade do produto'),
	unit: z.string().min(1).max(20).describe('Unidade de medida'),
	name_of_responsible: z.string().min(1).max(100).describe('Nome do responsável'),
	occurrenceDate: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, 'Data inválida (DD-MM-YYYY)').describe('Data da ocorrência (DD-MM-YYYY)'),
}).transform((data) => ({
	uuid: data.uuid,
	product: data.product,
	quantity: data.quantity,
	unit: data.unit,
	nameOfResponsible: data.name_of_responsible,
	occurrenceDate: data.occurrenceDate,
}));

export type CreateProductInput = z.infer<typeof createProductSchema>;
