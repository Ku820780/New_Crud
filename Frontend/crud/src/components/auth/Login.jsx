import React, { useState } from "react";
import Navbar1 from "../shared/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/EndPonts.js";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert"

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    e.preventDefault();
    
    axios.post(`${USER_API_END_POINT}/login`, input)
      .then((res) => {
       console.log(res)
       navigate("/")
       alert("Register SuccessFully")
      }).catch((err)=>{
        console.log(err)
      })
      .catch((error) => {
        console.log("Full error object:", error);
        const errorMessage = error.response?.data?.message || "Registration failed";
        swal("Error", errorMessage, "error");
      });
  };
  

  return (
    <div>
      <Navbar1 />
      <div style={{ margin: "100px auto", width: "600px" }}> {/* Centered the form */}
        <Form onSubmit={handleChange}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              onChange={changeEventHandler}
              value={input.email}
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              onChange={changeEventHandler}
              value={input.password}
              name="password"
            />
          </Form.Group>
          <Button type="submit" style={{ width: "100%" }}>
            Login
          </Button>
          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
           </span>
        </Form>
      </div>
    </div>
  );
};

export default Login;
