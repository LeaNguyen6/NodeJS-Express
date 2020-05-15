const db=require('../db')

module.exports.index= (req, res) => {
    let page=parseInt(req.query.page) || 1
    let perPage=8
    let start=(page-1)*perPage;
    let end=(page)*perPage
    let pageNum=Math.ceil((db.get('books').value().length)/perPage)
    res.render('products/listBook', {
       // books: db.get('books').value().slice(start,end)
       books:db.get('books').drop(start).take(perPage).value(),
       page,
       perPage,
       pageNum
    })
}