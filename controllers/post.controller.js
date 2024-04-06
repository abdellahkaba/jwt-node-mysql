const connectDB = require('../db/db.js')
const jwt = require('jsonwebtoken')
const { post } = require('../routes/posts.js')


const addPost = (req,res) => {

    const token = req.cookies.access_token
    if(!token) return res.status(403).json("Not authenticated !")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid !")

        const q = "INSERT INTO posts(`title`,`description`,`date`,`img`,`id_user`, `cat`) VALUES(?)"

        const values = [
            req.body.title,
            req.body.description,
            req.body.date,
            req.body.img,
            userInfo.id,
            req.body.cat  
        ]

        connectDB.query(q,[values],(err,data) => {
            if(err) return res.status(500).json(err)
            return res.json("Post created succefuly !")
        })
    })
 
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
    const token = req.cookies.access_token
    if(!token) return res.status(403).json("Not authenticated !")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid !")

        const postId = req.params.id

        const q = "UPDATE posts SET `title`=?, `description`=?, `date`=?, `img`=?, `cat`=? WHERE `id` = ? AND `uid` = ?";

        const values = [
            req.body.title,
            req.body.description,
            req.body.date,
            req.body.img,
            req.body.cat  
        ]

        connectDB.query(q,[...values, postId, userInfo.id],(err,data) => {
            if(err) return res.status(500).json(err)
            return res.json("Post has update !")
        })
    })
}
module.exports = {addPost,getAllPosts,getOnePost,deletePost,updatePost}