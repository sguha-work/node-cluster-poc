var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  for(let counter=0; counter<1e8; counter++) {}
  res.render('index', { title: 'Express' });
});

module.exports = router;
