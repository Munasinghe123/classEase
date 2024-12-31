const { createTimeTable, getTimeTable, getTimeTableById, updateTimeTable, deleteTimeTable, getTimeTableByStudent } = require('../Controller/TimeTableController');
const verifyToken = require('../Middleware/AuthMiddleware');
const verifyRole = require('../Middleware/RoleMiddleware');
const express = require('express');

const router = express.Router();

router.post('/createTimeTable', verifyToken, verifyRole("admin"), createTimeTable);
router.get('/getTimeTable', verifyToken, verifyRole("admin"), getTimeTable);
router.get('/getTimeTableById/:id', verifyToken, verifyRole("admin"), getTimeTableById);
router.put('/updateTimeTable/:id', verifyToken, verifyRole("admin"), updateTimeTable)
router.delete('/deleteTimeTable/:id', verifyToken, verifyRole("admin"), deleteTimeTable);
router.get('/getTimetableByStudent/:id', verifyToken, verifyRole("student"), getTimeTableByStudent);

module.exports = router;