import { z } from "zod";
import { UserUserCase } from "../../modules/users/useCases/user.usecase.js";
import { verifyJwt } from "../../shared/middlewares/auth.js";
import { updateUserSchema } from "../../shared/schemas/user.zod.js";
export async function updateUser(fast) {
    fast.withTypeProvider().put("/update_user/:id", {
        schema: {
            params: z.object({
                id: z.string().uuid('ID inválido')
            }),
            body: updateUserSchema
        },
        preHandler: verifyJwt
    }, async (req, reply) => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const userUseCase = new UserUserCase();
            const updatedUser = await userUseCase.update(id, updateData);
            if (!updatedUser) {
                return reply.status(404).send({
                    error: 'Not Found',
                    message: 'Usuário não encontrado'
                });
            }
            req.log.info(`User ${updatedUser.sap} updated successfully`);
            return reply.status(200).send({
                message: 'Usuário atualizado com sucesso',
                user: {
                    id: updatedUser.id,
                    name: updatedUser.name,
                    sap: updatedUser.sap,
                    createdAt: updatedUser.createdAt,
                    updatedAt: updatedUser.updatedAt
                }
            });
        }
        catch (error) {
            req.log.error(error, 'Update user error');
            if (error instanceof Error) {
                if (error.message === 'User not found') {
                    return reply.status(404).send({
                        error: 'Not Found',
                        message: 'Usuário não encontrado'
                    });
                }
                if (error.message === 'SAP is already in use') {
                    return reply.status(409).send({
                        error: 'Conflict',
                        message: 'SAP já está em uso'
                    });
                }
                return reply.status(400).send({
                    error: 'Validation Error',
                    message: error.message
                });
            }
            return reply.status(500).send({
                error: 'Internal Server Error',
                message: 'Erro interno do servidor'
            });
        }
    });
}
