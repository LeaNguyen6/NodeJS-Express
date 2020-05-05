const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
//2 - Template engines
app.set('view engine', 'pug')
app.set('views', './views')
//4 - POST method , bodyParser để đọc req.body
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


let users=[
    {id:1,name:'avd'},
    {id:2,name:'Khuon'},
    {id:3,name:'Phuong'}
]
app.get('/', (req, res) => res.render('index', { title: 'Hey', message: 'Hello there!' }))
app.get('/users',(req,res)=>{res.render('users/index',{
    users
})})
//3 - Query parameters
app.get('/users/search',(req,res)=>{
    let q=req.query.q;
    let findUser=users.filter(x=>x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
    res.render('users/index',{
        users:findUser,
        q
    })
})
//4 - POST method 
app.get('/users/create',(req,res)=>{
    res.render('users/create')
})
app.post('/users/create',(req,res)=>{
    users.push(req.body)
    res.redirect('/users')
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))