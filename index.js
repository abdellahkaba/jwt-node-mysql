import express from "express"
import mysql from "mysql"

const app = express()

app.use(express.json())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "",
    database: "gestcom"
})

app.get("/", (req,res) => {
    res.json("Connexion reussi !")
})

app.get("/product", (req,res) => {
    const q = "SELECT * FROM produit"
    db.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/product", (req,res) => {
    const q = "INSERT INTO produit (`nom`,`categorie`,`prixUnite`,`quantite`) VALUES(?)"
    const values = [ 
        req.body.nom,
        req.body.categorie,
        req.body.prixUnite,
        req.body.quantite
    ]
    db.query(q,[values], (err,data) => {
        if(err) return res.json(err)
        return res.json("Produit ajouter avec success")
    })
})

app.listen(8001,() => {
    console.log('Connect to mysql')
})