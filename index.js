const express = require('express')
const postRoutes = require("./routes/posts.js");
const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");


const app = express()
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.listen(8001,() => {
    console.log("Connxion reussi !")
})