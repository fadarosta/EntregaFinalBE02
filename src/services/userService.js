import UserRepository from "../dao/repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme_jwt_secret";

class UserService {
    async register(userData) {
        const existingUser = await UserRepository.getByEmail(userData.email);
        if (existingUser) throw new Error("El email ya está registrado");

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;

        return await UserRepository.create(userData);
    }

    async login(email, password) {
        const user = await UserRepository.getByEmail(email);
        if (!user) throw new Error("Usuario no encontrado");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Contraseña incorrecta");

        return user;
    }

    async getCurrentUser(id) {
        return await UserRepository.getById(id);
    }

    async updateUser(id, updateData) {
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        return await UserRepository.update(id, updateData);
    }

    async deleteUser(id) {
        return await UserRepository.delete(id);
    }

    // ======================
    // Recuperación de contraseña
    // ======================

    async generateResetToken(email) {
        const user = await UserRepository.getByEmail(email);
        if (!user) throw new Error("Usuario no encontrado");

        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

        return { token, user };
    }

    async resetPassword(token, newPassword) {
        let payload;
        try {
            payload = jwt.verify(token, JWT_SECRET);
        } catch {
            throw new Error("Token inválido o expirado");
        }

        const user = await this.getCurrentUser(payload.id);
        if (!user) throw new Error("Usuario no encontrado");

        const samePassword = await bcrypt.compare(newPassword, user.password);
        if (samePassword) throw new Error("No puede usar la misma contraseña anterior");

        const hashed = await bcrypt.hash(newPassword, 10);
        return await this.updateUser(user._id, { password: hashed });
    }
}

export default new UserService();
