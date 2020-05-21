var express = require('express')
var router = express.Router()

const controller=require('../controllers/cart.controller')


router.get('/add/:bookId',controller.addtoCart)
module.exports=router