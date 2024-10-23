import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {Button, ButtonGroup, Container, Nav, Navbar,  NavDropdown} from "react-bootstrap";
import { NavLink, useNavigate} from "react-router-dom";
import {
    ADMIN_ROUTE, BASKET_ROUTE,
    CONTACT_ROUTE,
    HOME_ROUTE,
    INFO_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    ORDER_ROUTE,
    SHOP_ROUTE
} from "../utils/consts";
import {observer} from "mobx-react-lite";



const NavBar =observer(() => {
    const {user} = useContext(Context)

    const navigate = useNavigate();

    let Auth= user.isAuth
    let Admn= user.user ?  user.user.role : null

    useEffect(()=>{

    },[user.isAuth])

   const logOut=()=>{
       user.setUser({})
       user.setIsAuth(false)
       localStorage.clear()
       navigate(HOME_ROUTE )
   }

    return (
        <Navbar bg ="dark" data-bs-theme="dark" expand="bg" collapseOnSelect className="navbar-dark">
            <Container >
                    <NavLink to={HOME_ROUTE}  className={"d-flex align-self-center nav-link md-4"}><Navbar.Brand > HIPPOSHOP</Navbar.Brand></NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            <NavDropdown title="Info" id="collapsible-nav-dropdown">
                                <NavDropdown.Item className = "nav-info">
                                    <NavLink  className="nav-link" to={INFO_ROUTE}>

                                        About us

                                    </NavLink>
                                </NavDropdown.Item>

                                
                                <NavDropdown.Item className="nav-info">
                                    <NavLink className="nav-link" to={CONTACT_ROUTE} >

                                        Contacts

                                    </NavLink>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavLink className="nav-link" to = {SHOP_ROUTE}>Catalog</NavLink>

                        </Nav>
                        {(Auth? Admn==='ADMIN'?
                            <Nav>
                                    <NavDropdown.Item className = "nav-info">
                                        <NavLink  className="nav-link" to={ADMIN_ROUTE}>
                                            Admin panel
                                        </NavLink>
                                    </NavDropdown.Item>
                                    <Button variant="outline-light" className={"authNavBar"} onClick={()=>logOut()}>Log out</Button>
                            </Nav>
                        :
                           <Nav>

                               <NavDropdown.Item className = "nav-info">
                                   
                                   <NavLink  className="nav-link" to={BASKET_ROUTE}>Cart</NavLink>
                                   <NavLink to={ORDER_ROUTE} className="nav-link">Orders</NavLink>
                               
                               </NavDropdown.Item>

                               <Button variant="outline-light" className={"authNavBar"} onClick={()=>logOut()}>Log out</Button>


                           </Nav>
                        :
                            <Nav>
                                <ButtonGroup className="auth_reg_btngroup authNavBar">
                                    <Button  variant={"outline-light"} onClick={()=>navigate(LOGIN_ROUTE)}>Authorization</Button>
                                    <Button  variant={"outline-light"} onClick={()=>navigate(REGISTRATION_ROUTE) }>Registration</Button>
                                </ButtonGroup>
                            </Nav>)
                        }

                    </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;