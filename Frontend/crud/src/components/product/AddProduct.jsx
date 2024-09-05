import React from "react";
import Navbar1 from "../shared/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { PRODUCT_API_END_POINT } from "../../utils/EndPonts";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert';
import { Formik } from "formik";
import * as Yup from "yup";
import { Loader2 } from "lucide-react";

function AddProduct() {
  const navigate = useNavigate();

  const initialValues = {
    pid: "",
    p_name: "",
    p_description: "",
    p_price: "",
  };

  const validationSchema = Yup.object().shape({
    pid: Yup.string().required("Product ID is required"),
    p_name: Yup.string().required("Product name is required"),
    p_description: Yup.string().required("Product description is required"),
    p_price: Yup.number().typeError("Product price must be a number").required("Product price is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    axios.post(`${PRODUCT_API_END_POINT}/register`, values)
      .then((res) => {
        console.log(res);
        navigate("/");
        Swal("Product Added Successfully");
      })
      .catch((err) => {
        console.log(err);
        Swal("Error", "Failed to add product", "error");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <Navbar1 />
      <div style={{ width: "500px", marginLeft: "auto", marginRight: "auto", marginTop: "100px" }}>
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
              <Form.Group className="mb-3" controlId="formBasicPid">
                <Form.Label>Product Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product Id"
                  name="pid"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pid}
                  isInvalid={touched.pid && !!errors.pid}
                />
                {touched.pid && errors.pid && <div className="text-danger">{errors.pid}</div>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product Name"
                  name="p_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.p_name}
                  isInvalid={touched.p_name && !!errors.p_name}
                />
                {touched.p_name && errors.p_name && <div className="text-danger">{errors.p_name}</div>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product Description"
                  name="p_description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.p_description}
                  isInvalid={touched.p_description && !!errors.p_description}
                />
                {touched.p_description && errors.p_description && <div className="text-danger">{errors.p_description}</div>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product Price"
                  name="p_price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.p_price}
                  isInvalid={touched.p_price && !!errors.p_price}
                />
                {touched.p_price && errors.p_price && <div className="text-danger">{errors.p_price}</div>}
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                style={{ width: "100%" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding Product...
                  </>
                ) : (
                  "Add Product"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddProduct;
