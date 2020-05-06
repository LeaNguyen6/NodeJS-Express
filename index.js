const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
//6- Database (lowdb)
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ users: [] })
  .write()
//2 - Template engines
app.set('view engine', 'pug')
app.set('views', './views')
//4 - POST method , bodyParser để đọc req.body
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => res.render('index', { title: 'Hey', message: 'Hello there!' }))
app.get('/users',(req,res)=>{res.render('users/index',{
    users:db.get('users').value()
})})
//3 - Query parameters
app.get('/users/search',(req,res)=>{
    let q=req.query.q;
    let findUser=db.get('users').value().filter(x=>x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
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
    db.get('users').push(req.body).write()
    res.redirect('/users')
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))