var express = require('express');
const { register, login, verifyEmail } = require('../controllers/users');
const { checkAuth } = require('../utils/auth');
var router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verifyEmail/:email/:token', verifyEmail);
// router.get('/test', checkAuth);

module.exports = router;
