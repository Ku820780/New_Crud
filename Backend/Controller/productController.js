const db = require("../Modle/db.js");

const product_post = (req, res) => {
  try {
    const data = {
      pid: req.body.pid,
      p_name: req.body.p_name,
      p_description: req.body.p_description,
      p_price: req.body.p_price,
    };

    const sql = `INSERT INTO product SET ?`;
    db.query(sql, data, (err, result) => {
      if (err) {
        res.status(404).json({ error: err });
      } else {
        res.status(200).json({ result: result });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const product_get = (req, res) => {
  try {
    const sql = `SELECT * FROM product`;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(404).json({ error: err });
      } else {
        res.status(200).json({ result: result });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const product_delete = (req, res) => {
  try {
    const pid = req.params.pid;
    const sql = `DELETE FROM product WHERE pid = ?`;

    db.query(sql, [pid], (err, result) => {
      if (err) {
        res.status(404).json({ error: err });
      } else {
        res.status(200).json({ result: result });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const product_delete_all = (req, res) => {
  try {
    const sql = `DELETE FROM product`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
        res.status(404).json({ error: err });
      } else {
        res.status(200).json({ result: result });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const product_update = (req, res) => {
  try {
    const data = req.body; // Data to update
    const pid = req.params.pid; // Product ID
    const sql = `UPDATE product SET ? WHERE pid = ?`; // Corrected SQL query syntax
    db.query(sql,[data,pid], (err, result) => {
        if (err) {
          res.status(404).json({ error: err });
        } else {
          res.status(200).json({ result: result });
        }
    });
  } catch (error) {
    console.log(error);
  }
};


const product_search_by_name = (req, res) => {
    try {
        const p_name = req.params.p_name;
        const sql = `SELECT * FROM product WHERE p_name LIKE ?`;

        db.query(sql, [`%${p_name}%`], (err, result) => {
            if (err) {
                console.log("Failed to retrieve product:", err);
                return res.status(500).json({ error: "Failed to retrieve product", details: err });
            } 
            if (result.length === 0) {  
                console.log("No product found with the given name");
                return res.status(404).json({ message: "No product found with the given name" });
            }
            console.log("Product(s) retrieved successfully");
            return res.status(200).json({ products: result });
        });
    } catch (error) {
        console.log("Internal server error:", error);
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
};


module.exports = {
  product_post,
  product_get,
  product_delete,
  product_delete_all,
  product_update,
  product_search_by_name
};
