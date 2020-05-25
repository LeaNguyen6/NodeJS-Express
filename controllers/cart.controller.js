const db=require('../db')
const Sessions=require('../model/sessions.model')
const Books=require('../model/books.model')
const Users=require('../model/users.model')

module.exports.addtoCart=async (req, res) => {
    let bookId=req.params.bookId
    let sessionID=req.signedCookies.sessionID;
    if (!sessionID){
    res.redirect('/books')
    return;
    }
    let ss= await Sessions.findById(sessionID)
    let check=false
  //  console.log('showcart',ss.cart)
    for (let i=0;i<ss.cart.length;i++){
     // console.log('bookIDDDD',ss.cart[i].bookId==bookId)
      if (ss.cart[i].bookId==bookId) {
        check=true;
        ss.cart[i].qtt +=1
        await ss.save()
        console.log('tang len 1') 
        break;
      }
    }

    console.log(check)
    if (!check){
      console.log('falssss')
      await Sessions.findByIdAndUpdate(sessionID, { $push:{ cart:{bookId, qtt:1}}})
    }
   // let count= db.get('sessions').find({id:sessionID}).get('cart.'+bookId,0).value()
  //  db.get('sessions').find({id:sessionID}).set('cart.'+ bookId,count+1).write()
    res.redirect('/books')
}