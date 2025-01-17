const express = require('express');
const router = express.Router();
const {login}= require('../controllers/AuthControlloer');

router.post('/login',login)


module.exports= router;