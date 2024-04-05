const connectDB = require('../db/db.js')
const bcrypt = require('bcrypt');

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

}

const logout = (req,res) => {
    
}

module.exports = {register,login,logout}