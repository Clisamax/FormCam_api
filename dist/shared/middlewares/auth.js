export async function verifyJwt(request, reply) {
    try {
        await request.jwtVerify();
        // Adicionar informações do usuário ao request
        const payload = request.user;
        if (payload) {
            request.authenticatedUser = {
                id: payload.id,
                name: payload.name,
                sap: payload.sap
            };
        }
    }
    catch (error) {
        // Log do erro para debugging
        request.log.error('JWT verification failed:', error);
        // Diferentes tipos de erro JWT
        if (error instanceof Error) {
            if (error.message.includes('expired')) {
                return reply.status(401).send({
                    error: 'Token expired',
                    message: 'Seu token expirou. Faça login novamente.'
                });
            }
            if (error.message.includes('invalid')) {
                return reply.status(401).send({
                    error: 'Invalid token',
                    message: 'Token inválido.'
                });
            }
        }
        return reply.status(401).send({
            error: 'Unauthorized',
            message: 'Token de acesso necessário.'
        });
    }
}
// Middleware opcional para verificar se o usuário é admin (se necessário no futuro)
export async function requireAdmin(request, reply) {
    await verifyJwt(request, reply);
    // Aqui você pode adicionar lógica para verificar se o usuário é admin
    // Por exemplo, se tiver um campo 'role' no token ou no banco
    // if (request.user?.role !== 'admin') {
    //   return reply.status(403).send({ message: 'Admin access required' })
    // }
}
