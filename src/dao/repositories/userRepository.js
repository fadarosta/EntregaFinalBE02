import { userModel } from "../models/userModel.js";

class UserRepository {
    async create(userData) {
        return await userModel.create(userData);
    }

    async getByEmail(email) {
        return await userModel.findOne({ email });
    }

    async getById(id) {
        return await userModel.findById(id);
    }

    async update(id, updateData) {
        return await userModel.findByIdAndUpdate(id, updateData, { new: true });
    }

    async delete(id) {
        return await userModel.findByIdAndDelete(id);
    }
}

export default new UserRepository();
