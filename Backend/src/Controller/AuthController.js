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
    const { name, email } = req.body;
    const photo = req.file; // File uploaded via multer

    try {
        // Find the user by ID
        const user = await model.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user fields
        user.name = name || user.name;
        user.email = email || user.email;

        if (photo) {
            // If a new photo is uploaded, delete the old one (if exists)
            if (user.photo) {
                const oldPhotoPath = path.join(__dirname, '../uploads/', user.photo);
                if (fs.existsSync(oldPhotoPath)) {
                    fs.unlinkSync(oldPhotoPath);
                }
            }

            // Save the new photo filename
            user.photo = photo.filename;
        }

        // Save the updated user
        const updatedUser = await user.save();

        // Respond with the updated user data
        res.status(200).json({ user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update user" });
    }
};


module.exports = {
    register, login, getAllUsers, deleteMember, getUserById, updateUser
}
