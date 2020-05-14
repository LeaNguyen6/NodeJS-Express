const db=require('../db')

module.exports.requireAuth=(req,res,next)=>{
    if(!req.signedCookies.userID){
        res.redirect('auth/login')
        return
    }
    let user = db.get('users').find({ id:req.signedCookies.userID }).value()
    if(!user){
        res.redirect('auth/login')
        return
    }   
    res.locals.account=user
    next()
}