const shortid = require('shortid');
//const db=require('../db')
const Sessions=require('../model/sessions.model')
const Books=require('../model/books.model')
const Users=require('../model/users.model')

module.exports=async (req,res,next)=>{
    if(req.signedCookies.userID){
        let user =await Users.findById(req.signedCookies.userID)
       // let user = db.get('users').find({ id:req.signedCookies.userID }).value()
        if (user) res.locals.account=user
        }
    
    if (!req.signedCookies.sessionID){
        let session= new Sessions()
        await session.save(); // Throws "document must have an _id before saving"
        let sessionID=session.id;
       // console.log(session)
        res.cookie('sessionID',sessionID,{ signed: true })
   // db.get('sessions').push({id:sessionID}).write()
    }
    else{
        //let findSs= db.get('sessions').find({id:req.signedCookies.sessionID}).value().cart
        let findSs= await Sessions.findById(req.signedCookies.sessionID)
        let ncart=0;
        for (var bookId of findSs.cart){
            ncart+=bookId.qtt
        }
     //  console.log('ss',findSs,ncart)
       res.locals.ncart=ncart;
    }
    next()
    
}