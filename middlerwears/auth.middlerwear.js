const Users=require('../model/users.model')

module.exports.requireAuth=async (req,res,next)=>{
    if(!req.signedCookies.userID){
        res.redirect('auth/login')
        return
    }
    let user= await Users.findById(req.signedCookies.userID)
   // console.log(user)
    //let user = db.get('users').find({ id:req.signedCookies.userID }).value()
    if(!user){
        res.redirect('auth/login')
        return
    }   
    res.locals.account=user
    next()
}