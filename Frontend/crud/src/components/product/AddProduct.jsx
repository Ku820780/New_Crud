import React, { useState } from "react";
import Navbar1 from "../shared/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { PRODUCT_API_END_POINT } from "../../utils/EndPonts";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const [input, setInput] = useState({
        pid:"",
        p_name:"",
        p_description:"",
        p_price:""
    })

    const naviagte = useNavigate()
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${PRODUCT_API_END_POINT}/register`, input)
        .then((res)=>{
            console.log(res)
            naviagte("/")
            alert("Product Add SuccessFully...")
        }).catch((err)=>{
            console.log(err)
        })
    }

  return (
    <div>
      <Navbar1 />
      <div style={{width:"500px", marginLeft:"550px", marginTop:"100px"}}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Id</Form.Label>
            <Form.Control type="text" placeholder="Enter Product Id" 
            onChange={changeEventHandler}
            value={input.pid}
            name="pid"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Product Name" 
             onChange={changeEventHandler}
             value={input.p_name}
             name="p_name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Description</Form.Label>
            <Form.Control type="text" placeholder="Enter Product Des" 
             onChange={changeEventHandler}
             value={input.p_description}
             name="p_description"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Product Price</Form.Label>
            <Form.Control type="text" placeholder="Product Price" 
             onChange={changeEventHandler}
             value={input.p_price}
             name="p_price"/>
          </Form.Group>
          <Button variant="primary" type="submit" style={{width:"100%"}}>
            Add Product
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddProduct;
