var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
  console.log(req.body);

  res.status(200).send('OK');
});

module.exports = router;
