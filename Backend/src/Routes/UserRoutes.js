const express = require('express');
const verifyToken = require('../Middleware/AuthMiddleware');
const authorizeRoles = require('../Middleware/RoleMiddleware');
const upload = require('../Middleware/MulterConfig')

const { getAllUsers, register, deleteMember, getUserById, updateUser } = require('../Controller/AuthController');


const router = express.Router();

//admin only
router.get('/getAllUsers', verifyToken, authorizeRoles("admin"), getAllUsers)

router.post(
    '/register',
    verifyToken,
    authorizeRoles("admin"),
    upload.single('photo'), // Handle the image upload
    register
);


router.delete('/deleteMember/:id', verifyToken, authorizeRoles("admin"), deleteMember)


router.put('/updateUser/:id', verifyToken, authorizeRoles("admin"), upload.single('photo'), updateUser);

//faculty only
router.get('/faculty', verifyToken, authorizeRoles("admin", "faculty"), (req, res) => {
    res.json({ message: 'welcome manager' });
})

//student only
router.get('/student', verifyToken, authorizeRoles("admin", "student"), (req, res) => {
    res.json({ message: 'welcome user' });
})


//common
router.get('/getUserById/:id', verifyToken, authorizeRoles("admin","faculty","student"), getUserById);

module.exports = router;
