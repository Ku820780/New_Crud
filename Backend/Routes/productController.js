const express = require("express");
const {
  product_search_by_name,
  product_post,
  product_get,
  product_delete,
  product_delete_all,
  product_update,
} = require("../Controller/productController");
const router = express.Router();

router.post("/register", product_post);
router.get("/get", product_get);
router.delete("/delete/:pid", product_delete);
router.delete("/delete/all", product_delete_all);
router.put("/update/:pid", product_update);
router.get("/search/:p_name", product_search_by_name);

module.exports = router;
