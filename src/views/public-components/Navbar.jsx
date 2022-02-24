import { Navbar,Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function NavBar() {
    const username = sessionStorage.getItem('username');
    
    return (
        <Navbar bg="primary" expand="lg">
            <div className='container text-white'>
                <Navbar.Brand className='text-white'>LovelyCards</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className='nav-link text-white' to={`/user-home/${username}`}>
                            Cards
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default NavBar;