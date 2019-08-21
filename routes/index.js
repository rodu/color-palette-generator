var express = require('express');
var router = express.Router();

/* GET home page. */
router
  .get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  })
  .post('/variables', (req, res, next) => {
    console.log(req.body);

    res.status(200).send('OK');
  });

module.exports = router;
