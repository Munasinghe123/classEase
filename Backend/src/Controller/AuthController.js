const model = require('../Model/UserModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
    let user;

    try {
        user = await model.find();
        console.log('Users fetched:', user);
    } catch (err) {
        console.log(err);
    }
    res.status(200).json(user);
}

const register = async (req, res) => {
    try {
        const { name, password, email, role } = req.body;
        const photo = req.file ? req.file.filename : null; // Save only the filename
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with the photo filename
        const newUser = new model({ name, password: hashedPassword, email, role, photo });
        await newUser.save();

        res.status(201).json({ message: `New user created with name ${name}` });
        console.log("New user created");
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Failed to register user" });
    }
};


const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await model.findOne({ name });

        if (!user) {
            return res.status(401).json({ message: "no such users" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "password doesnt match" });
        }

        const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "somethig happened while loginig in" })
    }
}

const deleteMember = async (req, res) => {
    const id = req.params.id

    let user;

    try {
        user = await model.findByIdAndDelete(id)
    } catch (err) {
        console.log(err)
    }
    if (!user) {
        res.status(404).json({ message: "unabel to delete" })
    }
    res.status(200).json({ user })
}

const getUserById = async (req, res) => {
    const id = req.params.id;

    let user;

    try {
        user = await model.findById(id)

    } catch (err) {
        console.log(err)
    }

    if (!user) {
        res.status(404).json({ message: "no users" })
    }
    res.status(200).json({ user })
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    try {
        // Await the promise returned by findByIdAndUpdate
        const updatedUser = await model.findByIdAndUpdate(id, { name }, { new: true });

        // Check if user was found and updated
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Respond with the updated user data
        res.status(200).json({ user: updatedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update user" });
    }
}


module.exports = {
    register, login, getAllUsers, deleteMember, getUserById, updateUser
}
