import { z } from 'zod';
export const createUserSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    sap: z.string().min(1, 'SAP é obrigatório').regex(/^[0-9]+$/, 'SAP deve conter apenas números'),
    password: z.string().min(1, 'Senha é obrigatória'),
});
export const updateUserSchema = z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').optional(),
    sap: z.string().regex(/^[0-9]+$/, 'SAP deve conter apenas números').optional(),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').optional(),
});
export const deleteUserSchema = z.object({
    id: z.string().uuid('ID inválido'),
});
export const loginUserSchema = z.object({
    sap: z.string().min(1, 'SAP é obrigatório'),
    password: z.string().min(1, 'Senha é obrigatória'),
});
