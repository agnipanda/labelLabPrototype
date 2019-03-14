var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.post('/upload', (req, res, next) => {
    console.log("here");
  let uploadFile = req.files.file;
  const fileName = '../public/files/'+req.files.file.name
  console.log(fileName);
  uploadFile.mv(
    fileName,
    function (err) {
      if (err) {
        return res.status(500).send(err)
      }
      res.send({
        file: 'public/files'+fileName,
      })
    },
  )
  console.log("uploaded");
})

module.exports = router;
