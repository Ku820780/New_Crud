const db = require('../Modle/db.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require("dotenv")
dotenv.config()

const user_post = (req, res) => {
    const sql = `INSERT INTO user SET ?`
    bcrypt.hash(req.body.password.toString(), 10, (err, hash)=>{
        if(err){
            return console.log("network errr")
        }
        const data = {
            uid:req.body.uid,
            name:req.body.name,
            email:req.body.email,
            password:hash,
            phoneNumber:req.body.phoneNumber
        }
        console.log(data)
        db.query(sql, data, (err, result)=>{
            if(err){
                console.log("Data not post")
                res.status(404).json({err:err})
            }else{
                console.log("Data post successfully...")
                res.status(200).json({result:result})
            }
        })
    })
}

const user_login = (req, res) => {
    const password = req.body.password
    const email = req.body.email

        // const { email, password } = req.body;
        // console.log(req.body.password)
        const sql = `SELECT * FROM user WHERE email=?`;
        db.query(sql, [email, password], (err, result) => { 
            if (result && result.length > 0) { 
                // console.log(result[0].password, password)
                bcrypt.compare(password, result[0].password, (err, isMatch) => {
                    if (isMatch) {
                        const token = jwt.sign({ email: result[0].email, uId: result[0].uid }, process.env.SECRET_KEY, { expiresIn: "1d" });
                        // console.log("Generated Token:", token); 
                        res.cookie('token', token);
                        return res.status(200).json({ result: result, token: token });
                    } else {
                        return res.status(401).json("Password not match");
                    }
                });
            } else {
                return res.status(404).json("User not Found");
            } 
        });    
    };

const user_get = (req, res) => {
    try {
        const sql = `SELECT * FROM user`
        db.query(sql, (err, result)=>{
            if(err){
                console.log("Data not Get")
               return res.status(404).json(err)
            }else{
                console.log("Data Get SuccessFully....")
              return  res.status(200).json(result)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {user_post, user_login, user_get}