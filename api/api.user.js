var express=require('express')
var router=express.Router()
const Books=require('../model/books.model')
const Users=require('../model/users.model')
const Sessions=require('../model/sessions.model')

//const controller=require('../controllers/auth.controller')


router.get('/books', async (req,res)=>{
    let books= await Books.find()
    res.json(books)
})
router.get('/users', async (req,res)=>{
    let users= await Users.find()
    res.json(users)
})
router.get('/sessions', async (req,res)=>{
    let sessions= await Sessions.find()
    res.json(sessions)
})
//router.post('/login', controller.postLogin)



module.exports=router