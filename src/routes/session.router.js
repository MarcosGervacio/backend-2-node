import Router from 'express';
import passport from 'passport';
import UserController from '../controllers/user.controller.js';

const router = Router();
const userController = new UserController();

router.post("/login", passport.authenticate("login", { session: false }), (req, res, next) => userController.login(req, res, next));

router.post("/register", passport.authenticate("register", { session: false }), (req, res) => userController.register(req, res));

router.post("/recuperar-password", (req, res) => userController.recuperarPassword(req, res));

router.post("/reset-password", (req, res) => userController.resetPassword(req, res));

router.post("/logout", (req, res) => userController.logout(req, res));

router.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => userController.current(req, res));

export default router;