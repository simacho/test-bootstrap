import React, { Component } from 'react';
import { Button , Alert , Badge , Form , Nav , NavDropdown , Navbar } from 'react-bootstrap';

export class TopNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            comment: "",
        };
    }

    render() {
        return (
            <div> 
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="/logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        {' React Bootstrap'}
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/dashboard">Home</Nav.Link>
                        <Nav.Link href="/messages">Link</Nav.Link>
                        <NavDropdown title="Others" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                <br />
            </div>
        );
    }
}


