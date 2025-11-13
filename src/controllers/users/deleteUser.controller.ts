import { FastifyInstance } from 'fastify';
import { UserUserCase } from '../../modules/users/useCases/user.usecase.js';
import { verifyJwt } from '../../shared/middlewares/auth.js';
import { userSchemas } from '../../shared/schemas/index.js';

export async function deleteUser(fast: FastifyInstance) {
	fast.delete<{ Params: { id: string } }>("/delete_user/:id", {
		schema: userSchemas.deleteUser,
		preHandler: verifyJwt
	}, async (req, reply) => {
		try {
			const { id } = req.params

			if (!id) {
				return reply.status(400).send({
					error: 'Validation Error',
					message: 'ID do usuário é obrigatório'
				})
			}

			const userUserCase = new UserUserCase()

			try {
				const deletedUser = await userUserCase.delete(id)

				if (!deletedUser) {
					return reply.status(404).send({
						error: 'Not Found',
						message: 'Usuário não encontrado'
					});
				}

				req.log.info(`User ${deletedUser.sap} deleted successfully`);

				return reply.status(200).send({
					message: 'Usuário deletado com sucesso',
					user: {
						id: deletedUser.id,
						name: deletedUser.name,
						sap: deletedUser.sap
					}
				})
			} catch (error) {
				req.log.error(error, 'Delete user error');

				if (error instanceof Error) {
					if (error.message === 'User not found') {
						return reply.status(404).send({
							error: 'Not Found',
							message: 'Usuário não encontrado'
						});
					}
					return reply.status(400).send({
						error: 'Validation Error',
						message: error.message
					});
				}
			}
		} catch (error) {
			req.log.error(error, 'Delete user error');
			return reply.status(500).send({
				error: 'Internal Server Error',
				message: 'Erro interno do servidor'
			});
		}
	})
}
