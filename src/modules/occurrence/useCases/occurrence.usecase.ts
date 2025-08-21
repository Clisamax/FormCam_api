import { CreateOccurrence, Occurrence } from '../dtos/occurrence.dto';
import { OccurrenceRepository } from '../repositories/occurrence.repository';

class OccurrenceUseCase {
	private occurrenceRepository: OccurrenceRepository;
	constructor() {
		this.occurrenceRepository = new OccurrenceRepository();
	}
	async createOccurrence(data: CreateOccurrence): Promise<Occurrence> {
		try {
			const occurrence = await this.occurrenceRepository.create(data);
			return occurrence;
		} catch (error) {
			console.error('Error creating occurrence:', error);
			throw error;
		}
	}

}
export default OccurrenceUseCase; 