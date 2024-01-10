import { Outlet } from "react-router-dom";
import { Navbar, Nav,Container } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

function MyNavbar() {
    /**
     * @see https://stackoverflow.com/questions/59084960/react-bootstrap-nav-link-routing
     * @see https://github.com/react-bootstrap/react-router-bootstrap
     */
    return (
        <div>
            <Navbar >
                <Container>
                    <Nav>
                    <LinkContainer to={`login`}>
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to={`register`}>
                        <Nav.Link>Register</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to={`addPost`}>
                        <Nav.Link>New post</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to={`ListUsers`}>
                        <Nav.Link>Users</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to={`MyPosts`}>
                        <Nav.Link>My posts</Nav.Link>
                    </LinkContainer>
                    
                    <LinkContainer to={`Home`}>
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    </Nav>
                </Container>
            </Navbar >
            <div><Outlet /></div>
        </div>
    )
}
export default MyNavbar