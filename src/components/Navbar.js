import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation , Link } from 'react-router-dom';
import { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function NavbarComp() {
  let navigate = useNavigate();
  const handlelogout =()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <Navbar expand="lg" bg="dark" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/home">InoteBook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className={`${location.pathname === "/" ? "active" : ""}`} href="/">Home</Nav.Link>
            <Nav.Link className={`${location.pathname === "/about" ? "active" : ""}`} href="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {!localStorage.getItem('token')?<Row>
          <Col>
            <Link to="/login">
              <Button as="input" type="button" value="Login" />
            </Link>
          </Col>
          <Col >
            <Link to="/signup">
              <Button as="input" type="button" value="SignUp" />
            </Link>
          </Col>
        </Row>: <Button onClick={handlelogout} as="input" type="button" value="Logout" />}
      </Container>
    </Navbar>
  );
}

export default NavbarComp;