import { prisma } from '../../../shared/lib/client.js';
import { CreateOccurrence, Occurrence } from '../dtos/occurrence.dto.js';
import { OccurrenceRepository } from '../repositories/occurrence.repository.js';

class OccurrenceUseCase {
	private occurrenceRepository: OccurrenceRepository;

	constructor() {
		this.occurrenceRepository = new OccurrenceRepository();
	}

	async createOccurrence(data: CreateOccurrence): Promise<Occurrence> {
		try {
			const userExists = await prisma.user.findUnique({
				where: { sap: data.userSap }
			});

			if (!userExists) {
				throw new Error(`Usuário com SAP ${data.userSap} não encontrado.`);
			}

			// Generate UUID server-side
			const { v4: uuidv4 } = await import('uuid');
			const uuid = uuidv4();

			const occurrence = await this.occurrenceRepository.create({
				...data,
				uuid
			});
			return occurrence;
		} catch (error) {
			console.error('Error creating occurrence:', error);
			throw error;
		}
	}

}
export default OccurrenceUseCase; 