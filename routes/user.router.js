var express = require('express')
var router = express.Router()
const multer = require('multer') // v1.0.5
const upload = multer({ dest: './public/upload/' }) // for parsing multipart/form-data
//Dùng cloundinary
var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });


const controller=require('../controllers/user.controller')
const validate=require('../validates/user.validate')

   // app.post('/profile', upload.array(), function (req, res, next) {
    //     console.log(req.body)
    //     res.json(req.body)
    //   })
router.get('/',controller.index)

//3 - Query parameters
router.get('/search', controller.search)
//4 - POST method 
router.get('/create', controller.goCreate)
//7 - Route param /View user
router.get('/:id', controller.viewUser)

router.post('/create',upload.single('avatar'),

async (req,res,next)=>{
  let result= await cloudinary.uploader.upload(req.file.path);
  //console.log(result)
  res.locals.result=result.secure_url;
    next()
},validate.create, controller.create
)
 

// Xóa user
router.get('/:id/del',controller.delUser)

module.exports = router