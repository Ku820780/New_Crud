import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import { PRODUCT_API_END_POINT } from "../../utils/EndPonts";
import Dropdown from "react-bootstrap/Dropdown";
import ProductSearch from "./SearchProduct";
import Pagination from "react-bootstrap/Pagination";

function ProductDetails() {
  const navigate = useNavigate();
  const [view, setView] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Fetch data from API
  const fetchdata = () => {
    axios
      .get(`${PRODUCT_API_END_POINT}/get`)
      .then((res) => {
        setView(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = view.slice(startIndex, endIndex);
  const totalPages = Math.ceil(view.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Delete function
  const handleDelete = (pid) => {
    axios
      .delete(`${PRODUCT_API_END_POINT}/delete/${pid}`)
      .then((res) => {
        alert("Deleted Successfully");
        fetchdata(); // Refresh data after deletion
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div style={{ display: "flex", marginLeft: "100px", marginTop: "50px" }}>
        <div>
          <ProductSearch />
        </div>
        <div style={{ marginLeft: "1200px" }}>
          <Link to="/addproduct">
            <Button>Add Product</Button>
          </Link>
        </div>
      </div>

      <div style={{ marginLeft: "100px", marginTop: "100px", marginRight: "100px" }}>
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
            {itemsToDisplay.map((item) => (
              <tr key={item?.pid}>
                <td>{item?.pid}</td>
                <td>{item?.p_name}</td>
                <td>{item?.p_description}</td>
                <td>{item?.p_price}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Button onClick={() => navigate(`productUpdate/${item.pid}`)}>Update</Button>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Button
                          type="button"
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
      </div>
    </div>
  );
}

export default ProductDetails;
