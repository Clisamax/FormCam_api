import { z } from 'zod';
export const createProductSchema = z.object({
    uuid: z.string().min(1).max(100).describe('UUID da ocorrência (enviado pelo app)'),
    name: z.string().min(1).max(100).describe('Nome do produto'),
    product: z.string().min(1).max(100).describe('Tipo do produto'),
    quantity: z.number().int().min(1).describe('Quantidade do produto'),
    unit: z.string().min(1).max(20).describe('Unidade de medida'),
    nameOfResponsible: z.string().min(1).max(100).describe('Nome do responsável'),
    occurrenceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida (YYYY-MM-DD)').describe('Data da ocorrência (YYYY-MM-DD)'),
});
