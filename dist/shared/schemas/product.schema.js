export const productSchemas = {
    createProduct: {
        description: 'Criar novo produto',
        tags: ['Products'],
        security: [{ bearerAuth: [] }],
        body: {
            type: 'object',
            required: ['uuid', 'name', 'product', 'quantity', 'unit', 'nameOfResponsible', 'occurrenceDate'],
            properties: {
                uuid: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 100,
                    description: 'UUID da ocorrência (enviado pelo app)'
                },
                name: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 100,
                    description: 'Nome do produto'
                },
                product: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 100,
                    description: 'Tipo do produto'
                },
                quantity: {
                    type: 'integer',
                    minimum: 1,
                    description: 'Quantidade do produto'
                },
                unit: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 20,
                    description: 'Unidade de medida'
                },
                nameOfResponsible: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 100,
                    description: 'Nome do responsável'
                },
                occurrenceDate: {
                    type: 'string',
                    format: 'date', // <-- Ajustado: “2025-01-01” é date, não date-time
                    description: 'Data da ocorrência (YYYY-MM-DD)'
                }
            }
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    product: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            uuid: { type: 'string' },
                            name: { type: 'string' },
                            product: { type: 'string' },
                            quantity: { type: 'integer' },
                            unit: { type: 'string' },
                            nameOfResponsible: { type: 'string' },
                            occurrenceDate: { type: 'string', format: 'date' },
                            createdAt: { type: 'string', format: 'date-time' }
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
            }
        }
    }
};
