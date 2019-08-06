const router = require("express").Router()
let data = require("../data/db")

//BASE URL IN THIS ROUTER: 
//"localhost:8000/api/posts/comments"

router.get("/test", (req, res)=>{
    console.log("hello from commentRoute")
    res.status(200).json({message: "Comment directory found"})
})

//GET all comments from Post ID
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

// Had problems - the BODY of the comment has to contain the postID
//  URL is just base - body handles where it goes
router.post("/", (req, res)=>{
    const comment = req.body
    data.insertComment(comment)
        .then(newComment=>{
            res.status(200).json(newComment)
        })
})

module.exports = router