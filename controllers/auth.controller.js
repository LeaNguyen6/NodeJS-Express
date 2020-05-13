const db=require('../db')
const shortid = require('shortid');
const md5 = require('md5');


module.exports.login= (req, res) => {
    res.render('auth/login')
}
module.exports.postLogin=(req, res) => {
    let email=req.body.email;
    let pass=md5(req.body.pass);
    let user = db.get('users').find({ email }).value()
    let errs=[]
    if (!user){
        errs.push('User does not exist')
        res.render('auth/login',{
            errs,
            value:req.body
        })
        return
    }
    if (user.pass!==pass){
        errs.push('Wrong password!')
        res.render('auth/login',{
            errs,
            value:req.body
        })
        return
    }
    res.cookie('userID',user.id)
    res.redirect('/')
}