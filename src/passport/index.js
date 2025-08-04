import passport from 'passport'
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'
import { PRIVATE_KEY } from '../utils.js'
import userModel from '../repositories/daos/mongo/models/user.model.js'
import bcrypt from 'bcrypt'
import {cartModel} from '../repositories/daos/mongo/models/cartModel.js'

export const initializePassport = () => {
    passport.use("jwt", new jwtStrategy({
        secretOrKey: PRIVATE_KEY,
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor])
    }, async (payload, done) => {
        try {
            const email = payload.user?.email || payload.email;
            if (!email) return done(null, false);
            const user = await userModel.findOne({ email });
            if (!user) return done(null, false);
            done(null, user); 
        } catch (err) {
            done(err, false);
        }
    }))

    passport.use("login", new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        async (email, password, done) => {
            try {
                const user = await userModel.findOne({ email });
                if (!user) return done(null, false, { message: "Invalid credentials" });
                const isValid = await bcrypt.compare(password, user.password);
                if (!isValid) return done(null, false, { message: "Invalid credentials" });
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));


    passport.use("register", new LocalStrategy(
        { usernameField: "email", passwordField: "password", passReqToCallback: true },
        async (req, email, password, done) => {
            try {
                const exists = await userModel.findOne({ email });
                if (exists) return done(null, false, { message: "User already exists" });
                const hashedPassword = await bcrypt.hash(password, 10);            
                const newUser = await userModel.create({
                    email,
                    password: hashedPassword,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    age: req.body.age,
                    role: req.body.role || "user",
                });
                return done(null, newUser);
            } catch (err) {
                return done(err);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);
            delete user.password; 
            done(null, user);
        } catch (err) {
            done(err);
        }
    });


}

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['accessToken'];
    }
    return token;
}