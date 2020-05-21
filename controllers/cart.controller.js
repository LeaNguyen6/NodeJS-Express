const db=require('../db')
module.exports.addtoCart= (req, res) => {
    let bookId=req.params.bookId
    let sessionID=req.signedCookies.sessionID;
    if (!sessionID){
    res.redirect('/books')
    return;
    }
    let count= db.get('sessions').find({id:sessionID}).get('cart.'+bookId,0).value()
    db.get('sessions').find({id:sessionID}).set('cart.'+ bookId,count+1).write()
    res.redirect('/books')
}