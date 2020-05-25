const Books=require('../model/books.model')
module.exports.index= async (req, res) =>{
    let page=parseInt(req.query.page) || 1
    let perPage=8
    let start=(page-1)*perPage;
    let end=(page)*perPage
    let books= await Books.find() 
    let pageNum=Math.ceil((books.length)/perPage)

    res.render('products/listBook',{
        books:books.slice(start,end),
        page,
        perPage,
        pageNum
    } )
}

// const db=require('../db')

// module.exports.index= (req, res) => {
//     let page=parseInt(req.query.page) || 1
//     let perPage=8
//     let start=(page-1)*perPage;
//     let end=(page)*perPage
//     let pageNum=Math.ceil((db.get('books').value().length)/perPage)
//     res.render('products/listBook', {
//        // books: db.get('books').value().slice(start,end)
//        books:db.get('books').drop(start).take(perPage).value(),
//        page,
//        perPage,
//        pageNum
//     })
// }