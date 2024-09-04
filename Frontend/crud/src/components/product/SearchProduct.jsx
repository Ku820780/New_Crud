import React, { useState } from "react";
import axios from "axios";
import { PRODUCT_API_END_POINT } from "../../utils/EndPonts";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setProducts([]);
    setError("");

    const queryParam = isNaN(searchTerm) ? { p_name: searchTerm } : { pid: searchTerm };

    axios
      .get(`${PRODUCT_API_END_POINT}/search`, {
        params: queryParam,
      })
      .then((res) => {
        if (res.data.products && res.data.products.length > 0) {
          setProducts(res.data.products);
        } else {
          setError("No products found with the given name or ID");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || "Failed to retrieve products");
      });
  };

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div style={{ display: "flex" }}>
            <div>
              <Form.Control
                type="text"
                placeholder="Enter product name or ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div style={{ marginLeft: "10px" }}>
              <Button type="submit">Search</Button>
            </div>
          </div>
        </Form.Group>
      </Form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {products.length > 0 && (
          <ul>
            {products.map((product) => (
              <li key={product.pid}>
                <h3>{product.p_name}</h3>
                <p>{product.p_description}</p>
                <p>Price: ${product.p_price}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
