import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Header.css";

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear authentication tokens from localStorage or sessionStorage
        localStorage.removeItem('authToken'); // Or sessionStorage.removeItem('authToken')

        // Optionally, you could also clear user data if needed
        // localStorage.removeItem('userData');

        // Redirect the user to the login page (or home page)
        navigate('/login'); // Change '/login' to wherever your login page is located

        console.log("User logged out");
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <strong>Patient Management System</strong>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto"> {/* Align all nav items to the right */}
                        <Nav.Link as={Link} to="/patients" className="nav-link">
                            Patients List
                        </Nav.Link>
                        <Nav.Link as={Link} to="/alerts" className="nav-link">
                            Alerts
                        </Nav.Link>
                        {/* Logout button */}
                        <Button
                            variant="outline-light"
                            onClick={handleLogout}
                            className="btn-logout"
                        >
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
