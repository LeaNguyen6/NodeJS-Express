const md5=require('md5')
const shortid = require('shortid');
const db=require('../db')

module.exports.index= (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
}
module.exports.search=(req, res) => {
    let q = req.query.q;
    let findUser = db.get('users').value().filter(x => x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
    res.render('users/index', {
        users: findUser,
        q
    })
}
module.exports.goCreate=(req, res) => {
    res.render('users/create')
}
module.exports.viewUser=(req, res) => {
    let id = req.params.id
    let user = db.get('users').find({ id }).value()
    res.render('users/view', {
        user: user
    })
}
module.exports.create=(req, res) => {
    req.body.id = shortid.generate();
    req.body.pass=md5(req.body.pass)
    db.get('users').push(req.body).write()
    res.redirect('/users')
}
module.exports.delUser=(req,res)=>{
    let id = req.params.id
    db.get('users')
        .remove({ id })
        .write();
        res.redirect('/users')
}
