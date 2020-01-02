module.exports = {
    dragonTreasure: async (req, res) => {
        const db = req.app.get('db')

        const result = await db.get_dragon_treasure(1)
        res.status(200).json(result)
    },
    getUserTreasure: async (req, res) => {
        const db = req.app.get('db')

        const response = await db.get_user_treasure(req.session.user.id)
        res.status(200).json(response)
    }
}