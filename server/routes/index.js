var express = require('express');
var router = express.Router();
var multer = require('multer');

function store(category) {
    let storage = multer.diskStorage({
        destination: './public/uploads/'+category,
        filename: (req, file, cb) => {
            let fileExtension = file.originalname.split(".")[1]
          cb(null, "Unlabelled" + '-' + Date.now()+'.'+fileExtension);
        }
    });
    return upload = multer({storage: storage}).array("files");
}

router.post('/uploads/unlabelled',function(req,res){
    var upload = store('here');
    console.log("here");
    upload(req,res, function(err){
        console.log("req.body");
        console.log(req.body);
        console.log("req.file");
        console.log(req.file);
        console.log("req.files");
        console.log(req.files);
    });
    res.send("Success");
});

module.exports = router;
