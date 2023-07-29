const express = require('express')
const app = express()
const ejs = require('ejs');
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

// Connection MongoDB

mongoose.connect('mongodb+srv://balldev1:balldev1@cluster0.cf1sitj.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

global.loggedIn = null

// controllers
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const logoutController = require('./controllers/logoutController')
const registerController = require('./controllers/registerController')
const loginUserController = require('./controllers/loginUserController')
const storeUserController = require('./controllers/storeUserController')
const homeController = require('./controllers/homeController')

// app
const redirectAuth = require('./middleware/redirectAuth')
const authMiddleware = require('./middleware/authMiddleware')

//use
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({
    secret: 'node secret'
}))

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})

app.set('view engine', "ejs");

app.get('/', indexController)
app.get('/home', authMiddleware, homeController)
app.get('/login', redirectAuth, loginController)
app.get('/register', redirectAuth, registerController)
app.post('/user/login', redirectAuth, loginUserController)
app.post('/user/register', redirectAuth, storeUserController)
app.get('/logout', logoutController)


app.listen(4000, () => {
    console.log('App listening on port 4000')
})

