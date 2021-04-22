var express = require('express');
const { checkAuth, isAdmin } = require('../utils/auth');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/test", checkAuth, isAdmin);

module.exports = router;
