const { createTimeTable, getTimeTable } = require('../Controller/TimeTableController');
const verifyToken = require('../Middleware/AuthMiddleware');
const verifyRole = require('../Middleware/RoleMiddleware');
const express = require('express');

const router = express.Router();

router.post('/createTimeTable', verifyToken, verifyRole("admin"), createTimeTable);
router.get('/getTimeTable', verifyToken, verifyRole("admin"), getTimeTable)

module.exports = router;