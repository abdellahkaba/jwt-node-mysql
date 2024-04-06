const express = require('express')
const postRoutes = require("./routes/posts.js");
const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");
const cookieParser = require('cookie-parser')
const multer = require('multer')

const app = express()
app.use(cookieParser())
app.use(express.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, Date.now()+file.originalname)
    }
  })
  
 

const upload = multer({ storage })
app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file
    res.status(200).json(file.filename)
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.listen(8001,() => {
    console.log("Connxion reussi !")
})