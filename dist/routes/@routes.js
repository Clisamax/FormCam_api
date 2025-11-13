// src/routes/@routes.ts - VERSÃO CORRIGIDA
import { FastifyInstance } from 'fastify';
import { createUser } from '../controllers/users/createUser.controller.js';
import { deleteUser } from '../controllers/users/deleteUser.controller.js';
import { loginUser } from '../controllers/users/loginUser.controller.js';
import { updateUser } from '../controllers/users/updateUser.controller.js';
import { createProduct } from '../controllers/product/createProduct.controller.js';
import CreateOccurrenceController from '../controllers/occurrence/createOccurrence.controller.js';

export async function Routes(fast) {
    fast.register(createUser);
    fast.register(deleteUser);
    fast.register(loginUser);
    fast.register(updateUser);
    fast.register(createProduct, { prefix: '/products' });
    fast.register(CreateOccurrenceController, { prefix: '/occurrences' });
}
