import React from "react";
import Navbar1 from "../shared/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/EndPonts.js";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert";
import { Loader2 } from "lucide-react";
import { Formik } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();
  
  const initialValues = {
    uid: "",
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  };

  const validationSchema = Yup.object().shape({
    uid: Yup.string().required("User ID is required"),
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    axios
      .post(`${USER_API_END_POINT}/register`, values)
      .then((res) => {
        console.log(res);
        navigate("/login");
        Swal("Register Successfully");
      })
      .catch((err) => {
        console.log(err);
        Swal("Registration failed", "Please try again", "error");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <Navbar1 />
      <div style={{ margin: "100px auto", width: "600px" }}>
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
              <Form.Group className="mb-3" controlId="formBasicUid">
                <Form.Label>User Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter User Id"
                  name="uid"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.uid}
                  isInvalid={touched.uid && !!errors.uid}
                />
                {touched.uid && errors.uid && (
                  <div className="text-danger">{errors.uid}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  isInvalid={touched.name && !!errors.name}
                />
                {touched.name && errors.name && (
                  <div className="text-danger">{errors.name}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  isInvalid={touched.email && !!errors.email}
                />
                {touched.email && errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Phone No"
                  name="phoneNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <div className="text-danger">{errors.phoneNumber}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  isInvalid={touched.password && !!errors.password}
                />
                {touched.password && errors.password && (
                  <div className="text-danger">{errors.password}</div>
                )}
              </Form.Group>

              {isSubmitting ? (
                <Button disabled style={{ width: "100%", marginTop: "40px", marginBottom: "40px" }}>
                  <Loader2 className="mr-2 h-4 animate-spin w-full my-4" />
                  Please Wait
                </Button>
              ) : (
                <Button type="submit" style={{ width: "100%", marginTop: "40px", marginBottom: "40px" }}>
                  Signup
                </Button>
              )}

              <span className="text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600">
                  Login
                </Link>
              </span>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
