import { prisma } from '../../../shared/lib/client';
import { CreateOccurrence, Occurrence } from '../dtos/occurrence.dto';
import { OccurrenceRepository } from '../repositories/occurrence.repository';

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

			const occurrence = await this.occurrenceRepository.create(data);
			return occurrence;
		} catch (error) {
			console.error('Error creating occurrence:', error);
			throw error;
		}
	}

}
export default OccurrenceUseCase; 