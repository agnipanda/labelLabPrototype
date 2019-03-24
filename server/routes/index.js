var express = require('express');
var router = express.Router();
var multer = require('multer');
var Image = require('../model/image');
const fs = require('fs');

function store(category) {
    let storage = multer.diskStorage({
        destination: './public/uploads/'+category,
        filename: (req, file, cb) => {
            let fileExtension = file.originalname.split(".")[1]
          cb(null, category + '-' + Date.now()+'.'+fileExtension);
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
        Image.findOneAndUpdate({label:id},{$push:{images:{$each:filenames}}},function(err,data){
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
router.post('/delete',function(req,res) {

    Image.findOneAndUpdate({label:"unlabelled"},{$pull:{images:req.body.name}},function(err,data){
        if(err){
            console.log(err);
        }
        console.log("removed");
    });
    fs.unlink('./public/uploads/unlabelled/'+req.body.name, (err) => {
      if (err) {
          console.log("No such file");
      }
      console.log('image was deleted');
    });
})
router.post('/labels',function(req,res){
    Image.find({},function(err,data){
        var array = []
        for (var i = 0; i < data.length; i++) {
            array.push(data[i].label)
        }
        res.send(array);
    })
})

module.exports = router;
