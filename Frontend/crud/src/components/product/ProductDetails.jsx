import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { PRODUCT_API_END_POINT } from "../../utils/EndPonts";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from "react-bootstrap/Pagination";
import Swal from "sweetalert";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import SearchProduct from "./SearchProduct.jsx"

function ProductDetails() {
 

  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [view, setView] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 2;

  const [p_name, setPName] = useState("");
  const [p_description, setPDescription] = useState("");
  const [p_price, setPPrice] = useState("");

  // Fetch data with pagination
  const fetchdata = (page = 1) => {
    axios
      .get(`${PRODUCT_API_END_POINT}/get/product/page`, {
        params: { page, limit: itemsPerPage },
      })
      .then((res) => {
        setView(res.data.data);
        setTotalPages(res.data.pagination.totalPage);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error fetching data", "Please try again later.", "error");
      });
  };

  useEffect(() => {
    fetchdata(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fetch product details for a specific product
  const fetchProductDetails = (pid) => {
    axios
      .get(`${PRODUCT_API_END_POINT}/get/productbyId/${pid}`)
      .then((res) => {
        console.log(res);
        const product = res?.data?.result[0];
        setPName(product.p_name);
        setPDescription(product.p_description);
        setPPrice(product.p_price);
      })
      .catch((err) => console.log(err));
  };

  // Handle product update
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    axios
      .put(`${PRODUCT_API_END_POINT}/update/${selectedProduct}`, {
        p_name,
        p_description,
        p_price,
      })
      .then((res) => {
        console.log(res);
        Swal("Product Updated Successfully...");
        setModalShow(false); // Close the modal after successful update
        fetchdata(currentPage); // Refresh the data
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  // Delete function
  const handleDelete = (pid) => {
    axios
      .delete(`${PRODUCT_API_END_POINT}/delete/${pid}`)
      .then((res) => {
        fetchdata(currentPage);
        fetchProductDetails();
        Swal("Product Delete SuccessFully...");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Open modal and load product details for updating
  const handleUpdate = (pid) => {
    setSelectedProduct(pid);
    fetchProductDetails(pid);
    setModalShow(true);
  };


 

  return (
    <div>
      <div style={{ display: "flex", marginLeft: "100px", marginTop: "50px" }}>
        <div>
        <SearchProduct />
        </div>
        <div style={{ marginLeft: "1200px" }}>
          <Link to="/addproduct">
            <Button>Add Product</Button>
          </Link>
        </div>
      </div>

      <div
        style={{
          marginLeft: "100px",
          marginTop: "100px",
          marginRight: "100px",
        }}
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Product Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {view.map((item) => (
              <tr key={item?.pid}>
                <td>{item?.pid}</td>
                <td>{item?.p_name}</td>
                <td>{item?.p_description}</td>
                <td>{item?.p_price}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                    ></Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Button
                          variant="primary"
                          onClick={() => handleUpdate(item.pid)}
                        >
                          Update
                        </Button>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => handleDelete(item.pid)}
                        >
                          Delete
                        </Button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>

        {/* Product Update Modal */}
        <div>
          <Modal show={modalShow} onHide={() => setModalShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Update Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Id</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedProduct || ""}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Product Name"
                    onChange={(e) => setPName(e.target.value)}
                    value={p_name}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Product Description"
                    onChange={(e) => setPDescription(e.target.value)}
                    value={p_description}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Product Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Product Price"
                    onChange={(e) => setPPrice(e.target.value)}
                    value={p_price}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ width: "100%" }}
                >
                  Update
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModalShow(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
