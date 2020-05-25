const md5=require('md5')
const shortid = require('shortid');
const db=require('../db')
const Users=require('../model/users.model')


module.exports.index= async (req, res) => {
    let users= await Users.find()
    res.render('users/index', {
        users
    })
}
module.exports.search= async (req, res) => {
    let q = req.query.q;
    //let findUser = db.get('users').value().filter(x => x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
    let users= await Users.find()
    let findUser = users.filter(x => x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
    res.render('users/index', {
        users: findUser,
        q
    })
}
module.exports.goCreate= (req, res) => {
    res.render('users/create')
}
module.exports.viewUser= async (req, res) => {
    let id = req.params.id
   // let user = db.get('users').find({ id }).value()
   let user= await Users.findById(id)
    res.render('users/view', {
        user: user
    })
}
module.exports.create= async(req, res) => {
    req.body.id = shortid.generate();
    req.body.pass=md5(req.body.pass)
    req.body.avatar=res.locals.result
   // req.body.avatar=req.file.path.split('\\').slice(1).join('/')
   // db.get('users').push(req.body).write()
    await Users.create(req.body)
    res.redirect('/users')
}
module.exports.delUser= async(req,res)=>{
    let id = req.params.id
    await Users.findByIdAndRemove(id)
    // db.get('users')
    //     .remove({ id })
    //     .write();
        res.redirect('/users')
}
