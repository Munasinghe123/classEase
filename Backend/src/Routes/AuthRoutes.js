const { register, login, getAllUsers } = require('../Controller/AuthController')

const express = require('express')

const router = express.Router();

router.post("/login", login);

module.exports = router;