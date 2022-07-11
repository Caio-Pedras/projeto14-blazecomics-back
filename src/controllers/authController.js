import bcrypt from 'bcrypt';
import db from '../db.js';
import Jwt from 'jsonwebtoken';



export async function signIn(req, res) {
    const { email, password } = req.body;
    try {
        const user = await db.collection('users').findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = Jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {expiresIn: '1h'});
            await db.collection("sessions").insertOne({
                userId: user._id,
                token,
            })
            return res.send(token).status(200);
        } else {
            res.status(400).send("Invalid email or password");
        }
    }
    catch (error) {
        res.sendStatus(401);
    }
}

export async function signUp(req, res) {
    const newUser = req.body;
    const passwordHash = bcrypt.hashSync(newUser.password, 10);
    delete newUser.password;
    delete newUser.confirmPassword;
    try {
        await db.collection('users').insertOne({ ...newUser, password: passwordHash })
        res.status(200).send("User created");
    } catch (error) {
        res.sendStatus(422);
    }
}


setInterval(async () => {
    const verifyToken = await db.collection("sessions").find().toArray()
    verifyToken.map((person) => {
        const verify = jwt.verify(person.token, process.env.SECRET_TOKEN, function (err, decoded) {
            if (!err) {
                return true
            }})
        if (!verify) {
            db.collection("sessions").deleteOne( { token: person.token } )
        }
        })

}, 15000)
