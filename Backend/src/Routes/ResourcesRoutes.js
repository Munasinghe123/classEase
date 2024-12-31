const express = require('express');
const router = express.Router();

const { createReources, getAllResources } = require('../Controller/ResourcesController');
const verifyToken = require('../Middleware/AuthMiddleware');
const verifyRole = require('../Middleware/RoleMiddleware');


router.post('/createResource', verifyToken, verifyRole("admin"), createReources);
router.get('/getAllResources', verifyToken, verifyRole("admin"), getAllResources)

module.exports = router;