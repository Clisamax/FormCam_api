import { FastifyInstance } from "fastify";
import { UserUpdate } from "../../modules/users/dtos/user.dto";
import { UserUserCase } from "../../modules/users/useCases/user.usecase";
import { verifyJwt } from "../../shared/middlewares/auth";
import { userSchemas } from "../../shared/schemas";

export async function updateUser(fast: FastifyInstance) {
	fast.put<{ Params: { id: string }, Body: UserUpdate }>("/update_user/:id", {
		schema: userSchemas.updateUser,
		preHandler: verifyJwt
	}, async (req, reply) => {
		try {
			const { id } = req.params;
			const updateData = req.body;

			// Basic validations
			if (!id) {
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'ID é obrigatório'
				});
			}

			if (Object.keys(updateData as object).length === 0) {
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'Nenhum dado para atualizar'
				});
			}

			// Validações específicas
			if (updateData.sap && !/^[0-9]+$/.test(updateData.sap.trim())) {
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'SAP deve conter apenas números'
				});
			}

			if (updateData.name && updateData.name.trim().length < 2) {
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'Nome deve ter pelo menos 2 caracteres'
				});
			}

			if (updateData.password && updateData.password.trim().length < 6) {
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'Senha deve ter pelo menos 6 caracteres'
				});
			}

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
		} catch (error) {
			req.log.error('Update user error:', error);

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