var express = require('express')
var router = express.Router()

const controller=require('../controllers/user.controller')
const validate=require('../validates/user.validate')


router.get('/',controller.index)

//3 - Query parameters
router.get('/search', controller.search)
//4 - POST method 
router.get('/create', controller.goCreate)
//7 - Route param /View user
router.get('/:id', controller.viewUser)

router.post('/create',validate.create, controller.create)
// Xóa user
router.get('/:id/del',controller.delUser)

module.exports = router