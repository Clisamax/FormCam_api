import { UserUserCase } from "../../modules/users/useCases/user.usecase";
export async function loginUser(fast) {
    fast.post("/login", {
        schema: {
            description: 'Login de usuário',
            tags: ['Authentication'],
            body: {
                type: 'object',
                required: ['sap', 'password'],
                properties: {
                    sap: { type: 'string', minLength: 1 },
                    password: { type: 'string', minLength: 1 }
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        token: { type: 'string' },
                        user: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                name: { type: 'string' },
                                sap: { type: 'string' }
                            }
                        }
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' },
                        message: { type: 'string' }
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' },
                        message: { type: 'string' }
                    }
                }
            }
        }
    }, async (req, reply) => {
        try {
            const userUseCase = new UserUserCase();
            const { sap, password } = req.body;
            // Validate presence of SAP and password
            if (!sap || !password) {
                return reply.status(400).send({
                    error: 'Validation Error',
                    message: 'SAP e senha são obrigatórios'
                });
            }
            // Trim whitespace
            const trimmedSap = sap.trim();
            if (!trimmedSap) {
                return reply.status(400).send({
                    error: 'Validation Error',
                    message: 'SAP não pode estar vazio'
                });
            }
            const user = await userUseCase.login(trimmedSap, password);
            // Check if user exists
            if (!user) {
                return reply.status(401).send({
                    error: 'Authentication Failed',
                    message: 'Credenciais inválidas'
                });
            }
            // Generate JWT token
            const token = fast.jwt.sign({
                id: user.id,
                sap: user.sap,
                name: user.name,
            }, {
                expiresIn: '24h' // Aumentado para 24h
            });
            // Log successful login
            req.log.info(`User ${user.sap} logged in successfully`);
            return reply.status(200).send({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    sap: user.sap
                }
            });
        }
        catch (error) {
            req.log.error('Login error:', error);
            if (error instanceof Error) {
                if (error.message === 'User not found') {
                    return reply.status(401).send({
                        error: 'Authentication Failed',
                        message: 'Usuário não encontrado'
                    });
                }
                if (error.message === 'Invalid username or password') {
                    return reply.status(401).send({
                        error: 'Authentication Failed',
                        message: 'Credenciais inválidas'
                    });
                }
            }
            return reply.status(500).send({
                error: 'Internal Server Error',
                message: 'Erro interno do servidor'
            });
        }
    });
}
