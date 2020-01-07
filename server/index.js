require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const ac = require('./controllers/authController')
const tc = require('./controllers/treasureController')
const am = require('./middleware/authMiddleware')

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
app.get('/auth/logout', ac.logout)

app.get('/api/treasure/dragon', tc.dragonTreasure)
app.get('/api/treasure/user', am.usersOnly, tc.getUserTreasure)
app.post('/api/treasure/user', am.usersOnly, tc.addUserTreasure)
app.get('/api/treasure/all', am.usersOnly, am.adminsOnly, tc.getAllTreasure)

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))