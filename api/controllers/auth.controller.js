import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const { name, username, email, password } = req.body;
    const userNameToSave = username || name;

    if (!userNameToSave || !email || !password) {
        return res.status(400).json({ message: 'username, email and password are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
        username: userNameToSave,
        email,
        password: hashedPassword
    });
    try {

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'An error occurred during registration' });
    }
};