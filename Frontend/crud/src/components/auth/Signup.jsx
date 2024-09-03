import React, { useState } from "react";
import Navbar1 from "../shared/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/EndPonts.js";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert"
const Signup = () => {
  const [input, setInput] = useState({
    uid: "",
    name: "",
    email: "",
    password: "",
    phoneNumber: ""
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    e.preventDefault();
    
    axios.post(`${USER_API_END_POINT}/register`, input)
      .then((res) => {
       console.log(res)
       navigate("/login")
       Swal("Register SuccessFully")
      }).catch((err)=>{
        console.log(err)
      })
      .catch((error) => {
        console.log(error)
      });
  };
  

  return (
    <div>
      <Navbar1 />
      <div style={{ margin: "100px auto", width: "600px" }}> {/* Centered the form */}
        <Form onSubmit={handleChange}>
          <Form.Group className="mb-3" controlId="formBasicUid">
            <Form.Label>User Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Id"
              onChange={changeEventHandler}
              value={input.uid}
              name="uid"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              onChange={changeEventHandler}
              value={input.name}
              name="name"
            />
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone No"
              onChange={changeEventHandler}
              value={input.phoneNumber}
              name="phoneNumber"
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
            Signup
          </Button>
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
