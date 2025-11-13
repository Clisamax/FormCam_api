// Schemas de validação para a API FormCam
export const userSchemas = {
    createUser: {
        description: 'Criar novo usuário',
        tags: ['Users'],
        security: [],
        body: {
            type: 'object',
            required: ['name', 'sap', 'password'],
            properties: {
                name: {
                    type: 'string',
                    minLength: 2,
                    maxLength: 100,
                    description: 'Nome completo do usuário'
                },
                sap: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 20,
                    pattern: '^[0-9]+$',
                    description: 'Código SAP do usuário (apenas números)'
                },
                password: {
                    type: 'string',
                    minLength: 6,
                    maxLength: 100,
                    description: 'Senha do usuário (mínimo 6 caracteres)'
                }
            }
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
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
            409: {
                type: 'object',
                properties: {
                    error: { type: 'string' },
                    message: { type: 'string' }
                }
            }
        }
    },
    login: {
        description: 'Login de usuário',
        tags: ['Authentication'],
        security: [],
        body: {
            type: 'object',
            required: ['sap', 'password'],
            properties: {
                sap: {
                    type: 'string',
                    minLength: 1,
                    description: 'Código SAP do usuário'
                },
                password: {
                    type: 'string',
                    minLength: 1,
                    description: 'Senha do usuário'
                }
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
    },
    updateUser: {
        description: 'Atualizar usuário',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        params: {
            type: 'object',
            required: ['id'],
            properties: {
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'ID do usuário'
                }
            }
        },
        body: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    minLength: 2,
                    maxLength: 100,
                    description: 'Nome completo do usuário'
                },
                sap: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 20,
                    pattern: '^[0-9]+$',
                    description: 'Código SAP do usuário (apenas números)'
                },
                password: {
                    type: 'string',
                    minLength: 6,
                    maxLength: 100,
                    description: 'Nova senha do usuário (mínimo 6 caracteres)'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    user: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            sap: { type: 'string' },
                            createdAt: { type: 'string', format: 'date-time' },
                            updatedAt: { type: 'string', format: 'date-time' }
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
            404: {
                type: 'object',
                properties: {
                    error: { type: 'string' },
                    message: { type: 'string' }
                }
            }
        }
    },
    deleteUser: {
        description: 'Deletar usuário',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        params: {
            type: 'object',
            required: ['id'],
            properties: {
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'ID do usuário'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
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
            404: {
                type: 'object',
                properties: {
                    error: { type: 'string' },
                    message: { type: 'string' }
                }
            }
        }
    }
};
export const occurrenceSchemas = {
    createOccurrence: {
        description: 'Criar nova ocorrência',
        tags: ['Occurrences'],
        security: [{ bearerAuth: [] }],
        body: {
            type: 'object',
            required: ['uuid', 'origin', 'process', 'procedure', 'responsible', 'description'],
            properties: {
                uuid: {
                    type: 'string',
                    description: 'UUID único da ocorrência'
                },
                origin: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 100,
                    description: 'Origem da ocorrência'
                },
                process: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 100,
                    description: 'Processo da ocorrência'
                },
                procedure: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 100,
                    description: 'Procedimento da ocorrência'
                },
                responsible: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 100,
                    description: 'Responsável pela ocorrência'
                },
                description: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 1000,
                    description: 'Descrição da ocorrência'
                },
                note: {
                    type: 'string',
                    maxLength: 1000,
                    description: 'Anotação adicional (opcional)'
                }
            }
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    occurrence: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            uuid: { type: 'string' },
                            origin: { type: 'string' },
                            process: { type: 'string' },
                            procedure: { type: 'string' },
                            responsible: { type: 'string' },
                            description: { type: 'string' },
                            note: { type: 'string' },
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
export const productSchemas = {
    createProduct: {
        description: 'Criar novo produto',
        tags: ['Products'],
        security: [{ bearerAuth: [] }],
        body: {
            type: 'object',
            required: ['name', 'product', 'quantity', 'unit', 'nameOfResponsible', 'occurrenceDate'],
            properties: {
                // uuid será gerado pelo servidor e compartilhado com a ocorrência
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
                    format: 'date-time',
                    description: 'Data da ocorrência'
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
                            occurrenceDate: { type: 'string', format: 'date-time' },
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
export const commonSchemas = {
    error: {
        type: 'object',
        properties: {
            error: { type: 'string' },
            message: { type: 'string' },
            statusCode: { type: 'integer' }
        }
    },
    healthCheck: {
        description: 'Health check da API',
        tags: ['Health'],
        security: [],
        response: {
            200: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                    timestamp: { type: 'string', format: 'date-time' }
                }
            }
        }
    }
};
