import User from '../model/user';
import bcrypt from 'bcryptjs';


// Sign up controller;
export const signup = async (req, res, next) => {
    // Fetching user data from req.body;
    const { name, email, password } = req.body;

    // checking for existing user;
    let existingUser;
    try {
        existingUser = await User.findOne({ email })
    } catch (err) { console.log(err) };

    // If existing user;
    if (existingUser) {
        return res.status(400).json({ message: "user already have account! Login Instead" })
    }

    // Hashing password using bcryptjs;
    const hashedPassword = bcrypt.hashSync(password);

    // storing data in user;
    const user = new User({
        name,
        email,
        password: hashedPassword
    });
    try {
        // saving user data to database;
        await user.save();
    } catch (err) {
        return console.log(err);
    }
    return res.status(201).json({ user })
}

// LogIn controller
export const login = async (req, res, next) => {
    // Fetching data from req.body for email and password;
    const { email, password } = req.body;
    let existingUser;
    try {

        // Searching for existing user if exist;
        existingUser = await User.findOne({ email });

    } catch (err) { return console.log(err) };

    // If existing user not found!;
    if (!existingUser) {
        return res.status(404).json({
            message: "Could not find user by this email."
        })
    }

    // If existing user found!;
    // decrypting password;
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    //Checking if pass is correct;
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect email or password" })
    }
    return res.status(200).json({ message: "Login Successfull" })
}