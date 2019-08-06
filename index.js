const express = require("express")
const server = express()
server.use(express.json())
//import router & assign it a name
const postRouterFile = require("./postRouter/postRouter")
//specify under what circumstances to invoke
server.use("/api/posts", postRouterFile)

server.get("/", (req, res)=>{
    res.status(200).json({message: "Root directory found"})
})


server.listen(8000, ()=>{console.log("Server up and running on port 8000")})