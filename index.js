require('dotenv').config()
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')


const express = require('express')
const app = express()
const port = 9196

const userRouter = require('./routes/user.router')
const authRouter = require('./routes/auth.router')
const bookRouter = require('./routes/books.router')
const authMiddlewears = require('./middlerwears/auth.middlerwear')

//2 - Template engines
app.set('view engine', 'pug')
app.set('views', './views')
//11 - Static files
app.use(express.static('public'))
//4 - POST method , bodyParser để đọc req.body
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.SESSION_SECRET))

app.use('/users', countCookie, authMiddlewears.requireAuth, userRouter)
app.use('/books', authMiddlewears.requireAuth, bookRouter)

app.use('/auth', authRouter)
let count;
app.get('/', countCookie, setCookie, authMiddlewears.requireAuth,
    (req, res) => res.render('index', { title: 'Hey', message: 'Hello there!' }))



function setCookie(req, res, next) {
    console.log(req.cookies)
    if (req.cookies.userID) {
        //res.cookie('userId', 124)
        count = 0
        console.log(req.cookies, count)
    }
    else {
        console.log(false)
    }
    next()
}
function countCookie(req, res, next) {
    if (count !== undefined) {
        count++
        console.log(req.cookies, count)
    }
    next()
}

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))