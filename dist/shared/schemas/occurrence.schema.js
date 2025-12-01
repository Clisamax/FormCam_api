export const occurrenceSchemas = {
    createOccurrence: {
        type: 'object',
        properties: {
            origin: { type: 'string', minLength: 1 },
            process: { type: 'string', minLength: 1 },
            procedure: { type: 'string', minLength: 1 },
            responsible: { type: 'string', minLength: 1 },
            description: { type: 'string', minLength: 1 },
            note: { type: 'string' },
        },
        required: [
            'origin',
            'process',
            'procedure',
            'responsible',
            'description'
        ]
    }
};
