const db = require("../Modle/db.js");
const mysql = require('mysql2/promise');

const product_post = async (req, res) => {
  try {
    const data = {
      pid: req.body.pid,
      p_name: req.body.p_name,
      p_description: req.body.p_description,
      p_price: req.body.p_price,
    };

    const sql = 'INSERT INTO product SET ?';
    
    // Using async/await for promise-based queries
    const [result] = await db.query(sql, data);
    
    res.status(201).json({ result });
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const product_get = async (req, res) => {
  try {
    const sql = 'SELECT * FROM product';
    const [result] = await db.query(sql); // Use await with promise-based query

    res.status(200).json({ result });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const get_product_byId = async (req, res) => {
  try {
    const pid = req.params.pid;
    const sql = 'SELECT * FROM product WHERE pid = ?';
    
    // Using async/await for promise-based queries
    const [result] = await db.query(sql, [pid]);
    
    // If no results are found
    if (result.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json({ result });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const product_delete = async (req, res) => {
  try {
    const pid = req.params.pid;
    const sql = 'DELETE FROM product WHERE pid = ?';

    // Using async/await for promise-based queries
    const [result] = await db.query(sql, [pid]);

    if (result.affectedRows === 0) {
      // If no rows were affected, the product with the given id was not found
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const product_update = async (req, res) => {
  try {
    const data = req.body;
    const pid = req.params.pid;
    const sql = 'UPDATE product SET ? WHERE pid = ?';

    // Execute the SQL query using async/await
    const [result] = await db.query(sql, [data, pid]);

    if (result.affectedRows === 0) {
      // If no rows were affected, the product with the given ID was not found
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const product_search_by_name = async (req, res) => {
  try {
    const { p_name, pid } = req.query;
    let sql = 'SELECT * FROM product WHERE 1=1';
    const queryParams = [];

    if (p_name) {
      sql += ' AND p_name LIKE ?';
      queryParams.push(`%${p_name}%`);
    }

    if (pid) {
      sql += ' AND pid = ?';
      queryParams.push(pid);
    }

  
    const [result] = await db.query(sql, queryParams);

    if (result.length === 0) {
      console.log("No product found with the given criteria");
      return res.status(404).json({ message: "No product found with the given criteria" });
    }

    console.log("Product(s) retrieved successfully");
    return res.status(200).json({ products: result });

  } catch (error) {
    console.log("Internal server error:", error);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
};



const product_page_api = async(req, res) => {
  try {
    const {page, limit} = req.query
    const offset = (page - 1) * limit
    const [data] = await db.query('Select * from product limit ? offset ?', [+limit, +offset])

    const [totalPageData] = await db.query('SELECT count(*) as count from product')

    const totalPage = Math.ceil(+totalPageData[0]?.count / limit)

    // console.log(totalPage)
    res.json({
      data:data,
      pagination:{
        page: +page,
        limit: +limit,
        totalPage
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  product_post,
  product_get,
  product_delete,
  product_update,
  product_search_by_name,
  get_product_byId,
  product_page_api
};
