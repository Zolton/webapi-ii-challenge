const router = require("express").Router()
const commentRouterFile = require("../commentRouter/commentRouter")
// Gotta account for new base URL as seen from post
// /api/post/comments -> /comments
// Notable change: server.use -> router.use
router.use("/comments", commentRouterFile)

//import database
let data = require("../data/db")

//If you receive a GET request at this address...
router.get("/", (req, res)=>{
    // ...Run this command
    data.find()
    // then do this with whatever comes back
    .then(posts=>{
        // map thru it and return it all
        res.status(200).json(posts)
    })
})

router.get("/test", (req, res)=>{
    res.status(200).json({message: "test directory found"})
})


//export router
module.exports = router