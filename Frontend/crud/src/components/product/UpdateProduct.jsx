import React, { useState } from "react";
import Navbar1 from "../shared/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { PRODUCT_API_END_POINT } from "../../utils/EndPonts";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const params = useParams();

  const [input, setInput] = useState({
    pid: params.pid,
    p_name: "",
    p_description: "",
    p_price: "",
  });

  const navigate = useNavigate(); // Corrected the typo here

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${PRODUCT_API_END_POINT}/update/${params.pid}`, input) // Corrected params.p_id to params.pid
      .then((res) => {
        console.log(res);
        alert("Product Updated Successfully...");
        navigate("/"); // Uncommented the navigate function
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar1 />
      <div style={{ width: "500px", marginLeft: "550px", marginTop: "100px" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Id"
              onChange={changeEventHandler}
              value={input.pid}
              name="pid"
              readOnly // Making this field read-only as the Product ID should not be changed
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Name"
              onChange={changeEventHandler}
              value={input.p_name}
              name="p_name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Description"
              onChange={changeEventHandler}
              value={input.p_description}
              name="p_description"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Price"
              onChange={changeEventHandler}
              value={input.p_price}
              name="p_price"
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ width: "100%" }}>
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UpdateProduct;
