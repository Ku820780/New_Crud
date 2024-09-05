const db = require('../Modle/db.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require("dotenv")
dotenv.config()

const user_post = async (req, res) => {
    const sql = `INSERT INTO user SET ?`;
  
    try {
      const hash = await bcrypt.hash(req.body.password.toString(), 10);
      const data = {
        uid: req.body.uid,
        name: req.body.name,
        email: req.body.email,
        password: hash,
        phoneNumber: req.body.phoneNumber
      };
  
      const [result] = await db.query(sql, data);
      console.log("Data posted successfully...");
      res.status(200).json({ result });
    } catch (err) {
      console.error("Error posting data:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const user_login = async (req, res) => {
    const { email, password } = req.body;
  
    const sql = `SELECT * FROM user WHERE email = ?`;
  
    try {
      const [rows] = await db.query(sql, [email]);
  
      if (rows.length > 0) {
        const user = rows[0];
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = jwt.sign(
            { email: user.email, uId: user.uid }, 
            process.env.SECRET_KEY, 
            { expiresIn: "1d" }
          );
  
          res.cookie('token', token, { httpOnly: true });
          return res.status(200).json({ result: user, token: token });
        } else {
          return res.status(401).json("Password does not match");
        }
      } else {
        return res.status(404).json("User not found");
      }
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json("Internal server error");
    }
  };
  
  const user_get = async (req, res) => {
    try {
      const sql = `SELECT * FROM user`;
      const [rows] = await db.query(sql);
  
      console.log("Data retrieved successfully...");
      return res.status(200).json(rows);
    } catch (err) {
      console.error("Error retrieving data:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

module.exports = {user_post, user_login, user_get}