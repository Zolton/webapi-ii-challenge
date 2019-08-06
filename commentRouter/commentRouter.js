const router = require("express").Router()

let data = require("../data/db")

router.get("/test", (req, res)=>{
    console.log("hello from commentRoute")
    res.status(200).json({message: "Comment directory found"})
})


router.get("/:id", (req, res)=>{
    const id = req.params.id
    // ...Run this command
    data.findPostComments(id)
    // then do this with whatever comes back
    .then(posts=>{
        // map thru it and return it all
        res.status(200).json(posts)
    })
})

module.exports = router