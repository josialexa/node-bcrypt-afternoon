let bc = require('bcryptjs')

async function register(req, res) {
    const {username, password, isAdmin} = req.body
    const db = req.app.get('db')

    const result = await db.get_user(username)
    const existingUser = result[0]

    if(existingUser) {
        res.status(409).send('Username taken')
    } else {
        const salt = bc.genSaltSync(10)
        const hash = bc.hashSync(password, salt)

        const registeredUser = await db.register_user(isAdmin, username, hash)
        const user = registeredUser[0]
        req.session.user = {
            isAdmin: user.is_admin,
            id: user.id,
            username: user.username
        }
        res.status(201).json(req.session.user)
    }
}

async function login(req, res) {
    const {username, password} = req.body
    const db = req.app.get('db')

    const foundUser = await db.get_user(username)
    const user = foundUser[0]

    if(!user) {
        res.status(401).send('User not found.  Please register as new user before logging in.')
    } else {
        const isAuthenticated = bc.compareSync(password, user.hash)

        if(!isAuthenticated) {
            res.status(403).send('Incorrect password')
        } else {
            req.session.user = {
                id: user.id,
                username: user.username,
                isAdmin: user.is_admin
            }

            res.status(200).json(req.session.user)
        }
    }
}

async function logout(req, res) {
    req.session.destroy()
    res.sendStatus(200)
}

module.exports.register = register
module.exports.login = login
module.exports.logout = logout