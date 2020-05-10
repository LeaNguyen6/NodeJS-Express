var express = require('express')
var router = express.Router()
const db=require('../db')
const shortid = require('shortid');

router.get('/', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
})

//3 - Query parameters
router.get('/search', (req, res) => {
    let q = req.query.q;
    let findUser = db.get('users').value().filter(x => x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
    res.render('users/index', {
        users: findUser,
        q
    })
})
//4 - POST method 
router.get('/create', (req, res) => {
    res.render('users/create')
})
//7 - Route param /View user
router.get('/:id', (req, res) => {
    let id = req.params.id
    let user = db.get('users').find({ id }).value()
    res.render('users/view', {
        user: user
    })
})
router.post('/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write()
    res.redirect('/users')
})
// Xóa user
router.get('/:id/del',(req,res)=>{
    let id = req.params.id
    db.get('users')
        .remove({ id })
        .write();
        res.redirect('/users')
})

module.exports = router