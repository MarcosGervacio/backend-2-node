import userModel from "./models/user.model.js";

class UserDao {
    async getAllUsers() {
        return await userModel.find();
    }

    async getUserById(uid) {
        return await userModel.findById(uid);
    }

    async getUserByEmail(email) {
        return await userModel.findOne({ email });
    }

    async createUser(user) {
        return await userModel.create(user);
    }

    async updateUser(uid, update) {
        return await userModel.findByIdAndUpdate(uid, update, { new: true });
    }

    async deleteUser(uid) {
        return await userModel.findByIdAndDelete(uid);
    }
}

export default UserDao;