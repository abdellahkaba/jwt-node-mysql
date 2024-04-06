const connectDB = require('../db/db.js')
const jwt = require('jsonwebtoken')
const addPost = (req,res) => {

 
}

const getAllPosts = (req,res) => {
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts"
    
    connectDB.query(q, [req.query.cat], (err,data) => {
        if(err) return res.send(err)

        return res.status(200).json(data)
    })
}
const getOnePost = (req,res) => {
    const q = "SELECT `username`,`title`,`description`,`img`,`cat`,`date` FROM users u JOIN posts p ON u.id = p.id_user WHERE p.id = ? "


    connectDB.query(q,[req.params.id], (err,data) => {
        if(err) return res.json(err)

        return res.status(200).json(data[0])
    })
}
const deletePost = (req,res) => {
    
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authenticated")

    jwt.verify(token,"jwtkey", (err,userInfo) => {
       if(err) return res.status(403).json("Token is not valid !")
       const postId = req.params.id
       const q = "DELETE FROM posts WHERE `id` = ? AND `id_user` = ?"

       connectDB.query(q,[postId, userInfo.id], (err,data) =>{
        if(err) return res.status(403).json("You can delete only your post !")

        return res.json("Le post has been delete")
       })
    } )


}

const updatePost = (req,res) => {
    res.json("from controller")
}
module.exports = {addPost,getAllPosts,getOnePost,deletePost,updatePost}