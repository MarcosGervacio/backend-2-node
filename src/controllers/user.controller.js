import UserService from "../services/user.service.js";
import { generateToken, PRIVATE_KEY } from "../utils.js";
import UserDTO from "../dtos/UserDTO.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const userService = new UserService();

class UserController {
    async getAllUsers(req, res) {
        const users = await userService.getAllUsers();
        res.json({ status: "success", users });
    }

    async getUserById(req, res) {
        const { uid } = req.params;
        const user = await userService.getUserById(uid);
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        res.json({ status: "success", user });
    }

    async createUser(req, res) {
        const user = await userService.createUser(req.body);
        res.json({ status: "success", user });
    }

    async updateUser(req, res) {
        const { uid } = req.params;
        const user = await userService.updateUser(uid, req.body);
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        res.json({ status: "success", user });
    }

    async deleteUser(req, res) {
        const { uid } = req.params;
        const user = await userService.deleteUser(uid);
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        res.json({ status: "success", message: "User deleted" });
    }

    // Métodos para login, register, recuperar y resetear contraseña
    async login(req, res, next) {
        // Passport maneja la autenticación, solo genera el token y responde
        const user = req.user;
        if (!user) return res.redirect("/failed");
        const accessToken = generateToken({
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            role: user.role
        });
        res.cookie("accessToken", accessToken, { httpOnly: true });
        return res.redirect("/products");
    }

    async register(req, res) {
        // Passport maneja el registro, solo responde
        const user = req.user;
        res.json({ message: "User registered successfully", user: { email: user.email, first_name: user.first_name, role: user.role } });
    }

    async recuperarPassword(req, res) {
        const { email } = req.body;
        const user = await userService.getUserByEmail(email);
        if (!user) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });

        const token = jwt.sign({ email }, PRIVATE_KEY, { expiresIn: "1h" });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "marger96vm@gmail.com",
                pass: process.env.passwordEmail
            }
        });

        const resetLink = `http://localhost:8080/reset-password?token=${token}`;

        await transporter.sendMail({
            from: "Coder <marger96vm@gmail.com>",
            to: email,
            subject: "Recuperación de contraseña",
            html: `<p>Haz click en el siguiente enlace para restablecer tu contraseña. El enlace expira en 1 hora.</p>
                   <a href="${resetLink}">Restablecer contraseña</a>`
        });

        res.json({ status: "success", message: "Correo de recuperación enviado" });
    }

    async resetPassword(req, res) {
        const { token, newPassword } = req.body;
        try {
            const payload = jwt.verify(token, PRIVATE_KEY);
            const user = await userService.getUserByEmail(payload.email);
            if (!user) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });

            const isSame = await bcrypt.compare(newPassword, user.password);
            if (isSame) {
                return res.status(400).json({ status: "error", message: "La nueva contraseña no puede ser igual a la anterior" });
            }

            const hashed = await bcrypt.hash(newPassword, 10);
            await userService.updateUser(user._id, { password: hashed });

            res.json({ status: "success", message: "Contraseña restablecida correctamente" });
        } catch (error) {
            res.status(400).json({ status: "error", message: "Enlace inválido o expirado" });
        }
    }

    async logout(req, res) {
        res.clearCookie("accessToken");
        res.redirect("/login");
    }

    async current(req, res) {
        if(req.user){
            const userDTO = new UserDTO(req.user); 
            return res.json({user: userDTO});
        }else{
            return res.status(401).json({error: "Unauthorized"});
        }
    }
}

export default UserController;