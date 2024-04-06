const express = require('express')
const postController = require('../controllers/post.controller.js')
const router = express.Router()

router.get("/", postController.getAllPosts)
router.get("/:id", postController.getOnePost)
router.post("/", postController.addPost)
router.delete("/:id", postController.deletePost)
router.post("/:id", postController.updatePost)


module.exports = router