require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const ac = require('./controllers/authController')

const app = express()
const {SERVER_PORT, DB_STRING, SESSION_SECRET} = process.env


massive(DB_STRING).then(db => {
    app.set('db', db)
    console.log('Connected to DB')
})

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.post('/auth/register', ac.register)
app.post('/auth/login', ac.login)

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))