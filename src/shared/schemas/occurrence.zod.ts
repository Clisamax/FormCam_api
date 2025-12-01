import { z } from 'zod';

export const createOccurrenceSchema = z.object({
	origin: z.string().min(1, 'Origem é obrigatória'),
	process: z.string().min(1, 'Processo é obrigatório'),
	procedure: z.string().min(1, 'Procedimento é obrigatório'),
	responsible: z.string().min(1, 'Responsável é obrigatório'),
	description: z.string().min(1, 'Descrição é obrigatória'),
	note: z.string().optional(),
});

export type CreateOccurrenceInput = z.infer<typeof createOccurrenceSchema>;
