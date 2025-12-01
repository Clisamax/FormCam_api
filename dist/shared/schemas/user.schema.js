export const userSchemas = {
    createUser: {
        type: 'object',
        properties: {
            name: { type: 'string', minLength: 1 },
            sap: { type: 'string', pattern: '^[0-9]+$' }, // SAP should be numbers only
            password: { type: 'string', minLength: 6 },
        },
        required: ['name', 'sap', 'password']
    },
    deleteUser: {
        type: 'object',
        properties: {
            id: { type: 'string', format: 'uuid' } // Assuming ID is a UUID
        },
        required: ['id']
    },
    updateUser: {
        type: 'object',
        properties: {
            name: { type: 'string', minLength: 2 },
            sap: { type: 'string', pattern: '^[0-9]+$' },
            password: { type: 'string', minLength: 6 },
        },
        // No 'required' as all fields are optional for update
    }
};
