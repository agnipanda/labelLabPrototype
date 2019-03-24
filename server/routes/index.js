var express = require('express');
var router = express.Router();
var multer = require('multer');
var Image = require('../model/image');

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
router.get('/',function(req,res){
    res.send(
        '<a href="http://localhost:3000" target="_blank">Go here</a>'
    )
})
router.post('/uploads/:id',function(req,res){
    var id = req.params.id;
    var upload = store(id);
    upload(req,res, function(err){
        let filenames = []
        req.files.forEach(function(item){
            filenames.push(item.filename);
          });
          console.log(filenames);
        Image.findOneAndUpdate({label:id},{$push:{images:{$each:filenames}}},function(err,data){
            console.log(data);
            if(!data){
                var imagemodel = new Image({
                    label:id,
                    images:filenames
                });
                imagemodel.save(function(err, doc) {
                    if (err){
                        res.send("Unable to upload")
                    }
                    res.send("Upload successful")
                });
            }
            else{

            }
        })
    });
    res.send("Success");
});
router.post('/images/:id',function(req,res){
    let id = req.params.id;
    Image.findOne({label:id},function(err,data){
        if(data){
            res.send(data.images)
        }
        else{
            res.send(err)
        }
    })
})
router.get('/labels',function(req,res){
    Image.findOne({},function(err,data){
        console.log();
    })
})

module.exports = router;
