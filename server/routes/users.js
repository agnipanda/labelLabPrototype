var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

// router.post('/multiple', imagesUpload(
//     './server/static/multipleFiles',
//     'http://localhost:3000/static/multipleFiles',
//     true
// ))

module.exports = router;
