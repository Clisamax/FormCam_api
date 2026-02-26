import { z } from 'zod';

// Schema que aceita campos no formato snake_case e os transforma para camelCase
export const createOccurrenceSchema = z.object({
	origin: z.string().optional(),
	process: z.string().optional(),
	procedure: z.string().optional(),
	responsible: z.string().optional(),
	description: z.string().optional(),
	note: z.string().optional(),

	// Versões alternativas para compatibilidade com frontend
	options_1: z.string().optional(),
	options_2: z.string().optional(),
	options_3: z.string().optional(),
	options_4: z.string().optional(),
	options_5: z.string().optional(),
	annotation: z.string().optional(),
})
	.refine((data) => {
		// Garante que ou os campos originais ou os alternativos estão presentes
		const hasOriginal = data.origin && data.process && data.procedure && data.responsible && data.description;
		const hasAlternative = data.options_1 && data.options_2 && data.options_3 && data.options_4 && data.options_5;
		return hasOriginal || hasAlternative;
	}, {
		message: "Campos obrigatórios de ocorrência estão faltando",
		path: ["origin"]
	})
	.transform((data) => ({
		origin: data.origin || data.options_1 || '',
		process: data.process || data.options_2 || '',
		procedure: data.procedure || data.options_3 || '',
		responsible: data.responsible || data.options_4 || '',
		description: data.description || data.options_5 || '',
		note: data.note || data.annotation || '',
	}));

// Tipo para uso no controller com os campos transformados
export type CreateOccurrenceInput = z.infer<typeof createOccurrenceSchema>;
