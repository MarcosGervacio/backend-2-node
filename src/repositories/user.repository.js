import UserDao from "./daos/mongo/user.dao.js";

const userDao = new UserDao();

class UserRepository {
    async getAllUsers() {
        return await userDao.getAllUsers();
    }

    async getUserById(uid) {
        return await userDao.getUserById(uid);
    }

    async getUserByEmail(email) {
        return await userDao.getUserByEmail(email);
    }

    async createUser(user) {
        return await userDao.createUser(user);
    }

    async updateUser(uid, update) {
        return await userDao.updateUser(uid, update);
    }

    async deleteUser(uid) {
        return await userDao.deleteUser(uid);
    }
}

export default UserRepository;