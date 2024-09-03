
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';


function Navbar1() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/" style={{ color: "white", textDecoration:"none" }}><h4>CRUD</h4></Link>
          <Nav className="ml-auto">
            <Link to="/signup" style={{ color: "white", textDecoration:"none" }}>Signup/</Link>
            <Link to="/login" style={{ color: "white", textDecoration:"none" }}>Login</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbar1;
