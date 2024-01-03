import User from "../models/UserModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const hashPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashPassword });
        await newUser.save();
        res.status(201).json('User created successfully');
    } catch (error) {
        if (!username || !email || !password) {
            console.log(next(errorHandler(401, "All fields are required")));
        }
        next(error);
    }
}

const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(401, "User not found!"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const {password:pass, ...otherDetails} = validUser._doc;
        res.cookie('access_token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 2000 }).status(200).json(otherDetails);
    } catch (error) {
        next(error);
    }

}

export {
    signup,
    signin
}