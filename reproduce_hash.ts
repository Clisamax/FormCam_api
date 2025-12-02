
import { hashPassword, verifyPassword } from './src/shared/utils/hash.js';

async function testHash() {
	try {
		console.log('Testing hashPassword...');
		const hashed = await hashPassword('password123');
		console.log('Hash result:', hashed);

		console.log('Testing verifyPassword...');
		const isValid = await verifyPassword('password123', hashed);
		console.log('Verify result:', isValid);
	} catch (error) {
		console.error('Error in testHash:', error);
	}
}

testHash();
