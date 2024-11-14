import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { LinkContainer } from "react-router-bootstrap";
import React from "react";



export default function Menu(props) {

    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        fontWeight: 'bolder',
      };

    return (
        <Navbar style={navbarStyle} bg="black" variant="dark" expand="lg">
            <Container >
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <NavbarCollapse><LinkContainer to="/" ><Navbar.Brand><font color="white"><strong>HOME</strong></font></Navbar.Brand></LinkContainer></NavbarCollapse>

                   

                    <NavbarCollapse><LinkContainer to="/cadastroMotoboys"><NavDropdown.Item><strong><font color="white">Motoboys</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>

                    <NavbarCollapse><LinkContainer to="/cadastroEntrega"><NavDropdown.Item><strong><font color="white">Entregas</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>

                    <NavbarCollapse><LinkContainer to="/cadastroPedidos"><NavDropdown.Item><strong><font color="white">Pedidos</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>

                   
                    <Nav>
                        <Nav.Link href="/"><strong><font color="white">VOLTAR</font></strong></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}