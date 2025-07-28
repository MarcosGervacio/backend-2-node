import Router from 'express';
import {generateToken, verifySign, PRIVATE_KEY } from '../utils.js';
import passport from 'passport';
import dotenv from 'dotenv';
import UserDTO from '../dtos/UserDTO.js';
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from '../repositories/daos/mongo/models/user.model.js';

const router = Router();
dotenv.config();
router.post("/login", (req, res) => {
    passport.authenticate("login", { session: false }, (err, user) => {
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
    })(req, res);
});

router.post("/register", passport.authenticate("register", { session: false, successRedirect: "/login", failureRedirect: "/failed" }), (req, res) => {
    const user = req.user;
    res.json({ message: "User registered successfully", user: { email: user.email, first_name: user.first_name, role: user.role } });
});

router.post("/recuperar-password", async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
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
});

// Restablecer contraseña
router.post("/reset-password", async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const payload = jwt.verify(token, PRIVATE_KEY);
        const user = await userModel.findOne({ email: payload.email });
        if (!user) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });

        const isSame = await bcrypt.compare(newPassword, user.password);
        if (isSame) {
            return res.status(400).json({ status: "error", message: "La nueva contraseña no puede ser igual a la anterior" });
        }

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();

        res.json({ status: "success", message: "Contraseña restablecida correctamente" });
    } catch (error) {
        res.status(400).json({ status: "error", message: "Enlace inválido o expirado" });
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("accessToken");
    res.redirect("/login");
});

router.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => {
    if(req.user){
        const userDTO = new UserDTO(req.user); 
        return res.json({user: userDTO});
    }else{
        return res.status(401).json({error: "Unauthorized"});
    }
});


export default router;