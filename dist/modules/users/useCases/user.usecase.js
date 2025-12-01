import { hashPassword, verifyPassword } from '../../../shared/utils/hash.js';
import UsersRepository from '../repositories/user.repository.js';
class UserUserCase {
    UserDto;
    constructor() {
        this.UserDto = new UsersRepository();
    }
    async login(sap, password) {
        try {
            const user = await this.UserDto.findBySap(sap);
            if (!user) {
                throw new Error('User not found');
            }
            try {
                const isValidPassword = await verifyPassword(password, user.password);
                if (!isValidPassword) {
                    return null;
                }
                return user;
            }
            catch (error) {
                throw new Error('Invalid username or password');
            }
        }
        catch (error) {
            console.error('Error finding user:', error);
            throw error;
        }
    }
    async createUser({ name, sap, password }) {
        const hashedPassword = await hashPassword(password);
        const verifySap = await this.UserDto.findBySap(sap);
        if (verifySap) {
            throw new Error('This user already exists');
        }
        const user = await this.UserDto.create({ name, sap, password: hashedPassword });
        return user;
    }
    async delete(id) {
        try {
            // First, check if the user exists
            const user = await this.UserDto.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            // If it exists, attempt to delete
            try {
                const deletedUser = await this.UserDto.deleteUser(user.id);
                return deletedUser;
            }
            catch (error) {
                throw new Error('Error deleting user');
            }
        }
        catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            // Check if the user exists
            const existingUser = await this.UserDto.findById(id);
            if (!existingUser) {
                throw new Error('User not found');
            }
            // If updating SAP, verify if it already exists
            if (data.sap && data.sap !== existingUser.sap) {
                const userWithSap = await this.UserDto.findBySap(data.sap);
                if (userWithSap) {
                    throw new Error('SAP is already in use');
                }
            }
            // Hash the password if it is provided
            if (data.password) {
                data.password = await hashPassword(data.password);
            }
            const updatedUser = await this.UserDto.updateUser(id, data);
            if (!updatedUser) {
                throw new Error('Error updating user');
            }
            return updatedUser;
        }
        catch (error) {
            console.error('Error in update:', error);
            throw error;
        }
    }
    async findBySap(sap) {
        throw new Error('Method not implemented');
    }
}
export { UserUserCase };
