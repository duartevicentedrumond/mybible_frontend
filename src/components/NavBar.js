import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from 'styled-components';

const NavbarButton = {
    outline: "none",
    border: "none",
    ':hover': {
        transition: ".3s ease-in-out",
      }
}

const LinkNavBar = styled(Nav.Link)`
    img {
        &:hover {
            transform: scale(1.1);
            transition: .3s ease-in-out;
        }
    }
    margin-left: 10px;
    margin-right: 10px;
`;
 
class NavBar extends Component {
    render() {
        return (
            <main>
                {/*Non-collapsed navbar*/}
                    <Nav bg="white" className="justify-content-center">
                        <LinkContainer to="/" className="d-none d-sm-block">
                            <LinkNavBar>
                                <img src={process.env.PUBLIC_URL + '/static/images/logo.svg'} width="100" alt=""/>
                            </LinkNavBar>
                        </LinkContainer>
                    </Nav>
                    <Nav bg="white" className="justify-content-center">
                        <LinkContainer to="/" className="d-none d-sm-block">
                            <LinkNavBar>
                                <img src={process.env.PUBLIC_URL + '/static/images/folder.svg'} width="20" height="30" alt=""/>
                            </LinkNavBar>
                        </LinkContainer>
                        <LinkContainer to="/statistic" className="d-none d-sm-block">
                            <LinkNavBar>
                                <img src={process.env.PUBLIC_URL + '/static/images/pie-chart.svg'} width="20" height="30" alt=""/>
                            </LinkNavBar>
                        </LinkContainer>
                        <LinkContainer to="/calendar" className="d-none d-sm-block">
                            <LinkNavBar>
                                <img src={process.env.PUBLIC_URL + '/static/images/calendar.svg'} width="20" height="30" alt=""/>
                            </LinkNavBar>
                        </LinkContainer>
                    </Nav>
                    
                {/*Collapsed navbar*/}
                    <Navbar bg="white" expand="sm" className="justify-content-center text-center d-sm-none">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" style={NavbarButton}>
                            <img src="./static/images/logo.svg" width="100" alt=""/>
                        </Navbar.Toggle>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="justify-content-center">
                                <LinkContainer to="/">
                                    <LinkNavBar>
                                        <img src={process.env.PUBLIC_URL + '/static/images/folder.svg'} width="20" height="30" alt=""/>
                                    </LinkNavBar>
                                </LinkContainer>
                                <LinkContainer to="/statistic">
                                    <LinkNavBar>
                                        <img src={process.env.PUBLIC_URL + '/static/images/pie-chart.svg'} width="20" height="30" alt=""/>
                                    </LinkNavBar>
                                </LinkContainer>
                                <LinkContainer to="/calendar">
                                    <LinkNavBar>
                                        <img src={process.env.PUBLIC_URL + '/static/images/calendar.svg'} width="20" height="30" alt=""/>
                                    </LinkNavBar>
                                </LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
            </main>
        )
    }
}

export default NavBar;