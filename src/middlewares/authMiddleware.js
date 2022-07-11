import jwt from "jsonwebtoken";
import db from "../db.js";
import loginSchema from '../schemas/loginSchema.js';
import registerSchema from '../schemas/registerSchema.js';

export async function jwtValidate(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const verify = jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
        if (!err) {
            return true
        }
    });
    if (!verify) {
        res.status(401).send("Token Expired");
        return
    }
    next();
}


export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const existingUser = await db.collection("sessions").findOne({ "token": token });
    if (existingUser === null) {
        res.sendStatus(401);
        return
    }

    res.locals.existingUser = existingUser;
    next();
}

export async function validateUser(req, res, next) {
    const newUser = req.body;
    const existingUser = await db.collection('users').findOne({ "email": newUser.email });

    if (existingUser) {
        res.status(400).send("Email already taken");
        return
    }
    next();
}


export async function validateUserSignUp(req, res, next) {
    const { email, password } = req.body;
    const validation = registerSchema.validate(req.body);

    if (!email || !password) {
        res.status(400).send("Email or password required!!");
        return;
    }

    if (validation.error) {
        return res.sendStatus(422);
    }

    next();
}


export async function validateUserSignIn(req, res, next) {
    const validation = loginSchema.validate(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send("Email or password required!!");
        return;
    }

    const user = await db.collection('users').findOne({ "email": email });
    if (!user) {
        res.status(400).send("No user found");
        return;
    }

    if (validation.error) {
        return res.sendStatus(422);
    }

    next();
}