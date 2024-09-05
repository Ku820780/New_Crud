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


const product_page_api = async(req, res) => {
  try {
    const { page = 1, limit = 10, search = "", sortBy = "p_name", order = "ASC" } = req.query;
    const offset = (page - 1) * limit;
    
    // Construct the base query with pagination, search, and sorting
    const searchQuery = `%${search}%`;
    const [data] = await db.query(
      `SELECT * FROM product 
       WHERE p_name LIKE ? OR p_description LIKE ? 
       ORDER BY ?? ${order} 
       LIMIT ? OFFSET ?`, 
      [searchQuery, searchQuery, sortBy, +limit, +offset]
    );

    const [totalPageData] = await db.query('SELECT COUNT(*) AS count FROM product WHERE p_name LIKE ? OR p_description LIKE ?', [searchQuery, searchQuery]);
    
    const totalPage = Math.ceil(+totalPageData[0]?.count / limit);
    
    res.json({
      data: data,
      pagination: {
        page: +page,
        limit: +limit,
        totalPage,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching data" });
  }
};


module.exports = {
  product_post,
  product_get,
  product_delete,
  product_update,
  get_product_byId,
  product_page_api
};
