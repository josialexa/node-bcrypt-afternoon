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
    },
    addUserTreasure: async (req, res) => {
        const {treasureURL} = req.body
        const {id} = req.session.user
        const db = req.app.get('db')

        const response = await db.add_user_treasure(treasureURL, id)
        res.status(200).json(response)
    },
    getAllTreasure: async (req, res) => {
        const db = req.app.get('db')

        const treasure = await db.get_all_treasure()
        res.status(200).json(treasure)
    }
}