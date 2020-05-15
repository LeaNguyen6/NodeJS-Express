const db=require('../db')
const shortid = require('shortid');
const md5 = require('md5');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'julia.nguyen0616@gmail.com',
  from: 'julia.nguyen0616@gmail.com',
  subject: 'Success login',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
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
    sgMail.send(msg);

    res.cookie('userID',user.id,{ signed: true })
    res.redirect('/')
}