const router = require("express").Router()
const commentRouterFile = require("../commentRouter/commentRouter")
// Gotta account for new base URL as seen from post
// /api/post/comments -> /comments
// Notable change: server.use -> router.use
router.use("/comments", commentRouterFile)

//import database
let data = require("../data/db")

//BASE URL IN THIS ROUTER: 
//"localhost:8000/api/posts"

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

//Get by post ID
router.get("/:id", (req, res)=>{
    const id = req.params.id
    data.findById(id)
    .then(post=>{
        console.log(req.body)
        res.status(200).json(post)
    })
})

//POST Posts
router.post("/", (req, res)=>{
    const newPost = req.body
    data.insert(newPost)
        .then(post=>{
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(500).json({
              message: "There was an error while saving the user to the database"
            });
          });
})

//DELETE by ID
router.delete("/:id", (req, res)=>{
    const id = req.params.id
    let spareID = req.params.id
    // can't grab body.  Copy array first, findPostById, then copy
    data.remove(id)
    .then(post=>{
        console.log(spareID)
        res.status(200).json({message: `Post deleted: ${spareID}`})
    })

})

router.get("/test", (req, res)=>{
    res.status(200).json({message: "test directory found"})
})

// Had problems, didn't realize required 2 arguments
router.put("/:id", (req, res)=>{
    const id = req.params.id
    const updatedPost = req.body
    data.update(id, updatedPost)
    .then(update=>{
        res.status(200).json(update)
    })
})


//export router
module.exports = router