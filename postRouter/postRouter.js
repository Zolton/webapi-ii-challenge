const router = require("express").Router();
const commentRouterFile = require("../commentRouter/commentRouter");
// Gotta account for new base URL as seen from post
// /api/post/comments -> /comments
// Notable change: server.use -> router.use
router.use("/comments", commentRouterFile);

//import database
let data = require("../data/db");

//BASE URL IN THIS ROUTER:
//"localhost:8000/api/posts"

//If you receive a GET request at this address...
router.get("/", (req, res) => {
  // ...Run this command
  data
    .find()
    // then do this with whatever comes back
    .then(posts => {
      // map thru it and return it all
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error while saving the user to the database"
      });
    });
});

//Get by post ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  }
  data
    .findById(id)
    .then(post => {
      console.log(req.body);
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error while saving the user to the database"
      });
    });
});

//POST Posts
router.post("/", (req, res) => {
  const newPost = req.body;
  console.log(newPost);
  if (!newPost.title || !newPost.contents) {
    return res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
  }

  data
    .insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error while saving the user to the database"
      });
    });
});

//DELETE by ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(404)
      .json({ message: "The post with the specified ID does not exist" });
  }
  let oldData = [];
  data.findById(id).then(post => (oldData = post[0]));
  data
    .remove(id)
    .then(post => {
      res.status(200).json(oldData);
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error while saving the user to the database"
      });
    });
});

router.get("/test", (req, res) => {
  res.status(200).json({ message: "test directory found" });
});

// Had problems, didn't realize required 2 arguments
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedPost = req.body;
  if (!id) {
      return res.status(404).json({message: "The post with the specified ID does not exist"})
  }
  if (!updatedPost.title || !updatedPost.contents) {
      return res.status(400).json({message: "Please provide title and contents for the post"})
  }
  data.update(id, updatedPost).then(update => {
    res.status(200).json(update);
  })
  .catch(error => {
    res.status(500).json({
      message: "There was an error while saving the user to the database"
    });
  });
});

//export router
module.exports = router;
