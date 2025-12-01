import { fast } from '../src/server.js';

async function test() {
	console.log('Waiting for server to be ready...');
	// Give it a moment to start
	await new Promise(resolve => setTimeout(resolve, 2000));
	await fast.ready();

	console.log('Testing Invalid Request (Zod should catch this)...');
	const resInvalid = await fast.inject({
		method: 'POST',
		url: '/users/create_user',
		payload: {
			name: '', // Invalid: min(1)
			sap: 'abc', // Invalid: regex
			password: '' // Invalid: min(1)
		}
	});

	console.log('Status Code:', resInvalid.statusCode);
	console.log('Response Body:', resInvalid.payload);

	if (resInvalid.statusCode === 400) {
		console.log('✅ Zod validation working as expected (400 Bad Request)');
	} else {
		console.error('❌ Zod validation failed or server error');
	}

	process.exit(0);
}

test();
