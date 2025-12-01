import { prisma } from "../../../shared/lib/client.js";
class UsersRepository {
    async create(data) {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                sap: data.sap,
                password: data.password
            }
        });
        return user;
    }
    async findBySap(sap) {
        try {
            const result = await prisma.user.findUnique({ where: { sap } });
            return result;
        }
        catch (error) {
            return null;
        }
    }
    async findById(id) {
        try {
            const result = await prisma.user.findUnique({ where: { id } });
            return result;
        }
        catch (error) {
            return null;
        }
    }
    async deleteUser(id) {
        try {
            const result = await prisma.user.delete({
                where: { id }
            });
            return result;
        }
        catch {
            return null;
        }
    }
    async updateUser(id, data) {
        try {
            // Check if the user exists
            const existingUser = await this.findById(id);
            if (!existingUser) {
                return null;
            }
            // Remove undefined fields from the update object
            const updateData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined));
            const result = await prisma.user.update({
                where: { id },
                data: updateData
            });
            return result;
        }
        catch (error) {
            console.error('Error updating user:', error);
            return null;
        }
    }
}
export default UsersRepository;
