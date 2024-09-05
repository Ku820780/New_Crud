const express = require("express");
const {
  product_post,
  product_get,
  product_delete,
  product_update,
  get_product_byId,
  product_page_api,
} = require("../Controller/productController");
const router = express.Router();

router.post("/register", product_post);
router.get("/get", product_get);
router.get('/get/productbyId/:pid', get_product_byId)
router.get('/get/product/page', product_page_api)
router.delete("/delete/:pid", product_delete);
router.put("/update/:pid", product_update);

module.exports = router;
