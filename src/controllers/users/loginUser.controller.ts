import { FastifyInstance } from "fastify";
import { login } from "../../modules/users/dtos/user.dto";
import { UserUserCase } from "../../modules/users/useCases/user.usecase";


export async function loginUser(fast: FastifyInstance) {
	fast.post<{ Body: login }>("/login", async (req, reply) => {
		try {
			const userUseCase = new UserUserCase()
			const { sap, password } = req.body;
			// Validate presence of SAP and password
			if (!sap || !password) {
				return reply.status(400).send({
					message: 'SAP and Password are required'
				});
			}

			const user = await userUseCase.login(sap, password);
			// Check if user exists
			if (!user) {
				return reply.status(401).send({
					message: 'Invalid credentials'
				});
			}

			const token = fast.jwt.sign(
				{
					sap: user.sap,
					name: user.name,
					userId: user.id,
				},
				{
					expiresIn: '1h'
				}

			);

			return reply.status(200).send({
				token,
				user: {
					id: user.id,
					name: user.name,
					sap: user.sap
				}
			});
		} catch (error) {
			console.error('Login error:', error);
			return reply.status(500).send({
				message: 'Internal server error'
			});
		}
	});
}