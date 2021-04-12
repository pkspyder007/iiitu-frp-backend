var express = require('express');
const { register, login, verifyEmail, autoLogin, getAllApplications } = require('../controllers/users');
const { checkAuth } = require('../utils/auth');
var router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verifyEmail/:email/:token', verifyEmail);
router.get('/autoLogin', checkAuth, autoLogin);
router.get('/getAllApplications', checkAuth, getAllApplications);
router.post("/logout", (req, res) => {
    res.clearCookie('authtkn');
    res.json({ message: "Logged Out"})
});

// router.get('/test', checkAuth);

module.exports = router;
