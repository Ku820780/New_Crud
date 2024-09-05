import React from "react";
import Navbar1 from "../shared/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/EndPonts.js";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    axios.post(`${USER_API_END_POINT}/login`, values)
      .then((res) => {
        console.log(res);
        Swal("Login Successful");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        Swal("Login Failed", "Invalid email or password", "error");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <Navbar1 />
      <div style={{ margin: "100px auto", width: "600px" }}> {/* Centered the form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  name="email"
                  isInvalid={touched.email && !!errors.email}
                />
                {touched.email && errors.email ? (
                  <div className="text-danger">{errors.email}</div>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  name="password"
                  isInvalid={touched.password && !!errors.password}
                />
                {touched.password && errors.password ? (
                  <div className="text-danger">{errors.password}</div>
                ) : null}
              </Form.Group>
              <Button type="submit" style={{ width: "100%" }} disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
              <span className="text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600">
                  Signup
                </Link>
              </span>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
