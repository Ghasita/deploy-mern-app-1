const ensureAuthentication = require("../Middlewares/Auth");
const express = require('express')
const router = express.Router();

router.get('/', ensureAuthentication, (req, res) => {
    res.status(200).json([
        {
            item: "mobile",
            price: 340
        }, {
            item: "Bat",
            price: 3400
        }
    ])
})

module.exports = router