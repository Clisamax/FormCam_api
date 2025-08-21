import { hashPassword, verifyPassword } from '../../../shared/utils/hash';
import { User, UserCreate, UserDto, UserUpdate } from '../dtos/user.dto';
import UsersRepository from '../repositories/user.repository';

class UserUserCase {
	private UserDto: UserDto;
	constructor() {
		this.UserDto = new UsersRepository();
	}
	async login(sap: string, password: string): Promise<User | null> {
		try {
			const user = await this.UserDto.findBySap(sap)
			if (!user) {
				throw new Error('User not found')
			}
			try {
				const isValidPassword = await verifyPassword(password, user.password)
				if (!isValidPassword) {
					return null
				}
				return user
			} catch (error) {
				throw new Error('Invalid username or password')
			}
		} catch (error) {
			console.error('Error finding user:', error)
			throw error
		}
	}
	async createUser({ name, sap, password }: UserCreate): Promise<User> {
		const hashedPassword = await hashPassword(password);
		const verifySap = await this.UserDto.findBySap(sap);
		if (verifySap) {
			throw new Error('This user already exists');
		}
		const user = await this.UserDto.create({ name, sap, password: hashedPassword })
		return user;
	}
	async delete(id: string): Promise<User | null> {
		try {
			// First, check if the user exists
			const user = await this.UserDto.findById(id)
			if (!user) {
				throw new Error('User not found')
			}

			// If it exists, attempt to delete
			try {
				const deletedUser = await this.UserDto.deleteUser(user.id)
				return deletedUser
			} catch (error) {
				throw new Error('Error deleting user')
			}
		} catch (error) {
			console.error('Error deleting user:', error)
			throw error
		}
	}
	async update(id: string, data: UserUpdate): Promise<User | null> {
		try {
			// Check if the user exists
			const existingUser = await this.UserDto.findById(id)
			if (!existingUser) {
				throw new Error('User not found')
			}

			// If updating SAP, verify if it already exists
			if (data.sap && data.sap !== existingUser.sap) {
				const userWithSap = await this.UserDto.findBySap(data.sap)
				if (userWithSap) {
					throw new Error('SAP is already in use')
				}
			}

			// Hash the password if it is provided
			if (data.password) {
				data.password = await hashPassword(data.password)
			}

			const updatedUser = await this.UserDto.updateUser(id, data)
			if (!updatedUser) {
				throw new Error('Error updating user')
			}

			return updatedUser
		} catch (error) {
			console.error('Error in update:', error)
			throw error
		}
	}

	async findBySap(sap: string) {
		throw new Error('Method not implemented');
	}

}
export { UserUserCase };
