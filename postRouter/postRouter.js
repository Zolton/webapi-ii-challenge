const router = require("express").Router()

let data = require("../data/db")

router.get("/", (req, res)=>{
    res.status(200).json({message: "router working"})
})

//export router
module.exports = router