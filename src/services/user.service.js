import UserRepository from "../repositories/user.repository.js";

const userRepository = new UserRepository();

class UserService {
    async getAllUsers() {
        return await userRepository.getAllUsers();
    }

    async getUserById(uid) {
        return await userRepository.getUserById(uid);
    }

    async getUserByEmail(email) {
        return await userRepository.getUserByEmail(email);
    }

    async createUser(user) {
        return await userRepository.createUser(user);
    }

    async updateUser(uid, update) {
        return await userRepository.updateUser(uid, update);
    }

    async deleteUser(uid) {
        return await userRepository.deleteUser(uid);
    }
}

export default UserService;