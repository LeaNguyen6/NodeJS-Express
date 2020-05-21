const shortid = require('shortid');
const db=require('../db')
module.exports=(req,res,next)=>{
    if(req.signedCookies.userID){
        let user = db.get('users').find({ id:req.signedCookies.userID }).value()
        if (user) res.locals.account=user
        }
    
    if (!req.signedCookies.sessionID){
    let sessionID=shortid.generate()
    res.cookie('sessionID',sessionID,{ signed: true })
    db.get('sessions').push({id:sessionID}).write()
    }
    else{
        let findSs= db.get('sessions').find({id:req.signedCookies.sessionID}).value().cart
        let ncart=0;
        for (var bookId in findSs){
            ncart+=findSs[bookId]
        }
        console.log('ss',findSs,ncart)
        res.locals.ncart=ncart;
    }
    next()
    
}