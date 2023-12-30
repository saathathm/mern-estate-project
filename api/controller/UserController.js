import User from '../models/UserModel.js'

const test = (req, res) => {
    res.json({
        "message": "working user controller"
    })
}

export {
    test
}