const connectDB = require('../db/db.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = (req,res) => {
    //Check existing user

    const q = "SELECT * FROM users WHERE username = ? OR email = ?"
    connectDB.query(q , [req.body.username,req.body.email], (err,data) => {
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("User exist deja !")

        //Hash the password and create user
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)

        const q = "INSERT INTO users(`username`,`email`,`password`) VALUES(?)"

        const values = [
            req.body.username,
            req.body.email,
            hash
        ]

        connectDB.query(q, [values], (err,data) => {
        if(err) return res.json(err)
        return res.status(200).json("User has been created.")
        })
    })
} 

const login = (req,res) => {
    // check user
    const q = "SELECT * FROM users WHERE username = ?"

    connectDB.query(q, [req.body.username], (err, data) => {
        if(err) return res.json(err)
        if(data.length === 0) return res.status(404).json("user not found")


        //check password

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)

        if(!isPasswordCorrect) return res.status(400).json("Wrong username or password")

        const token = jwt.sign({id:data[0].id}, "jwtkey")
        const {password,...other} = data[0] 

        res
            .cookie("access_token",token, {
                httpOnly:true
            }).status(200).json(other)

    })
}

const logout = (req,res) => {
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true 
    }).status(200).json("user has been logout !")
}

module.exports = {register,login,logout}