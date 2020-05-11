const db=require('../db')
const shortid = require('shortid');

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
    let errs=[]
    if (!req.body.name){errs.push('Name is required')}
    if (!req.body.phone){errs.push('Phone is required')}
    if (errs.length) {
        res.render('users/create',{
            errs,
            value:req.body
        })
        return;
    }
    req.body.id = shortid.generate();
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
