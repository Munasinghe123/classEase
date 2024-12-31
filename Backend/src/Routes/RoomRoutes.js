const express = require('express');
const router = express.Router();

const { createRooms, getAllRooms } = require('../Controller/RoomsController');
const verifyToken = require('../Middleware/AuthMiddleware');
const verifyRole = require('../Middleware/RoleMiddleware');


router.post('/createRooms', verifyToken, verifyRole("admin"), createRooms);
router.get('/getAllRooms', verifyToken, verifyRole("admin"), getAllRooms)

module.exports = router;