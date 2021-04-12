var express = require('express');
const { createJob, getAll, getById } = require('../controllers/jobs');
const { checkAuth, isAdmin } = require('../utils/auth');
var router = express.Router();

router.post('/create', checkAuth, isAdmin, createJob);
router.get('/getAll', getAll);
router.get('/getById/:id', getById);
// router.get('/test', checkAuth);

module.exports = router;
