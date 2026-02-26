import { z } from 'zod';
// Schema que aceita campos no formato snake_case e os transforma para camelCase
export const createOccurrenceSchema = z.object({
    origin: z.string().min(1, 'Origem é obrigatória'),
    process: z.string().min(1, 'Processo é obrigatório'),
    procedure: z.string().min(1, 'Procedimento é obrigatório'),
    responsible: z.string().min(1, 'Responsável é obrigatório'),
    description: z.string().min(1, 'Descrição é obrigatória'),
    note: z.string().optional(),
    // Versões alternativas com snake_case para compatibilidade com frontend
})
    .transform((data) => ({
    origin: data.origin,
    process: data.process,
    procedure: data.procedure,
    responsible: data.responsible,
    description: data.description,
    note: data.note,
}));
