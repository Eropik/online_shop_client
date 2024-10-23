import {Container, Nav} from "react-bootstrap";
import React from 'react';
import {
    MDBFooter,
    MDBContainer,

    MDBCol,
    MDBRow,

} from 'mdb-react-ui-kit';
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaVk } from "react-icons/fa";
import {NavLink} from "react-router-dom";
import {CONTACT_ROUTE, HOME_ROUTE, INFO_ROUTE, SHOP_ROUTE} from "../utils/consts";

const Footer = () => {
    return (
        <MDBFooter  bg="dark" expand="md" data-bs-theme = "dark" className='navbar-dark text-center mt-5' color='white' bgColor='dark'>
            <MDBContainer className='p-4'>
                <section className='mb-4'>
                    <NavLink to={"https://www.instagram.com/"}>
                        <FaInstagram className="footer-media-link m-2 k" />
                    </NavLink>
                    <NavLink to={""}>
                        <FaVk className="footer-media-link m-2"/>
                    </NavLink>
                    <NavLink to={""}>
                        <FaYoutube className="footer-media-link m-2"/>
                    </NavLink>
                    <NavLink to={""}>
                        <FaTiktok className="footer-media-link m-2"/>
                    </NavLink>
                </section>
                <section className=''>
                    <MDBRow className='d-flex justify-content-center align-items-start'>
                        <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                            <h5 className='text-uppercase'>HIPPOSHOP</h5>
                            <ul className='list-unstyled mb-0'>
                                <li>
                                    <NavLink className="nav-link footer-link" to={HOME_ROUTE}>Main</NavLink>
                                </li>
                                <li>
                                    <NavLink className=" nav-link footer-link" to={SHOP_ROUTE}>Catalog</NavLink>
                                </li>
                                <li>
                                    <NavLink className="nav-link footer-link" to={INFO_ROUTE}>About us</NavLink>
                                </li>
                                <li>
                                    <NavLink className="nav-link footer-link" to={CONTACT_ROUTE}>Contacts</NavLink>
                                </li>
                            </ul>
                        </MDBCol>

                        <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                            <h5 className='text-uppercase'>Address</h5>
                            <ul className='list-unstyled mb-0 footer-text'>
                                <li>
                                    г. Минск, ул. Ежи Гедройца, д.5
                                </li>
                            </ul>
                        </MDBCol>

                        <MDBCol lg='3' md='6' className=' mb-4 mb-md-0'>
                            <h5 className='text-uppercase'>Working time</h5>
                            <ul className='footer-text list-unstyled mb-0'>
                                <li>Operator:</li>
                                <li>Mon-Fri: 10:00 - 20:00</li>
                                <li>Sat-Sun: 10:00 - 18:00</li>
                                <li>Courier:</li>
                                <li>Mon-Fri: 10:00 - 22:00</li>
                                <li>Sat-Sun: 10:00 - 22:00</li>
                            </ul>
                        </MDBCol>
                    </MDBRow>
                </section>
            </MDBContainer>
        </MDBFooter>)
};


export default Footer;