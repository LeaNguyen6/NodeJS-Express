const bodyParser = require('body-parser')

const express = require('express')
const app = express()
const port = 3000

const userRouter=require('./routes/user.router')

//2 - Template engines
app.set('view engine', 'pug')
app.set('views', './views')
//4 - POST method , bodyParser để đọc req.body
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/users',userRouter)

app.get('/', (req, res) => res.render('index', { title: 'Hey', message: 'Hello there!' }))


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))