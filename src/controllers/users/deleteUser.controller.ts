import { FastifyInstance } from 'fastify';
import { UserUserCase } from '../../modules/users/useCases/user.usecase';
import { verifyJwt } from '../../shared/middlewares/auth';
export async function deleteUser(app: FastifyInstance) {
	app.delete<{ Body: { id: string } }>('/delete_user', { preHandler: verifyJwt }, async (req, reply) => {
		try {
			const { id } = req.body
			if (!id) {
				return reply.status(400).send({ messege: 'ID do usuário é obrigatório' })
			}
			const userUserCase = new UserUserCase()

			try {
				await userUserCase.delete(id)
				return reply.status(200).send({
					message: 'Usuário deletado com sucesso'
				})
			} catch (error) {
				if (error instanceof Error) {
					if (error.message === 'Usuário não encontrado') {
						return reply.status(404).send({
							message: 'Usuário não encontrado'
						});
					}
					return reply.status(400).send({
						message: error.message
					});
				}
			}
		} catch (error) {
			return reply.status(500).send({
				message: 'Erro interno do servidor'
			});
		}
	})

}
