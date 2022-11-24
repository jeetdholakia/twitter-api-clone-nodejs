const express = require("express")
const User = require("../models/user")

const router = new express.Router()

router.post("/user", async (req, res) => {
    const user = new User(req.body)
    console.log(user)
    try {
        await user.save() 
        res.status(201).send(user)
    } catch(err) {
        res.status(400).send(err)
    }
})

router.get("/user", async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch(err) {
        res.status(400).send(err)
    }
})

module.exports = router