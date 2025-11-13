import { hash, compare } from "bcrypt";
const { hash: _, compare: __, ...bcrypt } = await import("bcrypt");
export async function hashPassword(password) {
    return hash(password, 10);
}
export async function verifyPassword(password, hash) {
    return compare(password, hash);
}
