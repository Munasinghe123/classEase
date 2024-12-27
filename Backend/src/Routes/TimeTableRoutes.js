const { createTimeTable } = require('../Controller/TimeTableController');
const verifyToken = require('../Middleware/AuthMiddleware');
const verifyRole = require('../Middleware/RoleMiddleware');
const express = require('express');

const router = express.Router();

router.post('/createTimeTable', verifyToken, verifyRole("admin"), createTimeTable);

module.exports = router;