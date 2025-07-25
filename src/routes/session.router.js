import Router from 'express';
import {generateToken, verifySign} from '../utils.js';
import passport from 'passport';

import UserDTO from '../dtos/UserDTO.js';

const router = Router();

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