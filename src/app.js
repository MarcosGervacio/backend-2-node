import express from 'express';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import mongoose from 'mongoose';

import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import __dirname from './utils/constantsUtil.js';
import websocket from './websocket.js';
import cookieParser from "cookie-parser"
import sessionRouter from "./routes/session.router.js"
import passport from "passport"
import {initializePassport} from "./passport/index.js"
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

const app = express();

mongoose.connect(MONGO_URI);
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});    

//Handlebars Config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');

//Middlewares
app.use(cookieParser())
initializePassport();
app.use(passport.initialize())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//Routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use("/api/sessions", sessionRouter)
app.use('/', viewsRouter);


const httpServer = app.listen(PORT, () => {
    console.log(`Start server in PORT ${PORT}`);
});

const io = new Server(httpServer);

websocket(io);