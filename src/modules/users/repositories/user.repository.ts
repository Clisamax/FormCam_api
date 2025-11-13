import { prisma } from "../../../shared/lib/client.js";
import { User, UserCreate, UserDto, UserUpdate } from "../dtos/user.dto.js";

class UsersRepository implements UserDto {
	async create(data: UserCreate): Promise<User> {
		const user = await prisma.user.create({
			data: {
				name: data.name,
				sap: data.sap,
				password: data.password
			}
		})
		return user
	}
	async findBySap(sap: string): Promise<User | null> {
		try {
			const result = await prisma.user.findUnique({ where: { sap } })
			return result
		} catch (error) {
			return null
		}
	}
	async findById(id: string): Promise<User | null> {
		try {
			const result = await prisma.user.findUnique({ where: { id } })
			return result

		} catch (error) {
			return null
		}
	}
	async deleteUser(id: string): Promise<User | null> {
		try {
			const result = await prisma.user.delete({
				where: { id }
			});
			return result;
		} catch {
			return null;
		}
	}
	async updateUser(id: string, data: UserUpdate): Promise<User | null> {
		try {
			// Check if the user exists
			const existingUser = await this.findById(id)
			if (!existingUser) {
				return null
			}

			// Remove undefined fields from the update object
			const updateData = Object.fromEntries(
				Object.entries(data).filter(([_, value]) => value !== undefined)
			)

			const result = await prisma.user.update({
				where: { id },
				data: updateData
			})
			return result
		} catch (error) {
			console.error('Error updating user:', error)
			return null
		}
	}


}

export default UsersRepository;