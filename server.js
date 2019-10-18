var express= require('express');
var app =express();
var multer=require('multer');
var cors=require('cors');

app.use(cors());

//store file in public directory and define its filename 
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
})

//create a upload instance
var upload=multer({storage:storage}).array('file');

app.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
           console.log(res)
      return res.status(200).send(req.file)

    })

});
app.listen(8000,function(){
    console.log('App running on port 8000');
})

