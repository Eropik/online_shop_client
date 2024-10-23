import React from 'react';
import { Container, Row, Col,Button } from 'react-bootstrap';

import Image from "react-bootstrap/Image";
import img from "../assets/disc.jpg"


import img2 from "../assets/catalog.avif"
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';


const HomePage = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Container className="welcome_text" ><p ><h3 >Welcome to HIPPOSHOP!</h3></p></Container>
        <p>
            <Row className="inf_p"> <Col md={4}>
                <div className="mt-5"><h5>Comming soon!</h5>
                    <p>Summer sale from 15% to 35% discounts!
                    Only now profitable installments,
                    new- from 30 to 42 month!</p>

                </div>
            </Col>
                <Col md={8}><Image style={{width:600, height:450}} src={img}/></Col> </Row>
        </p>
        <hr></hr>
        <p>
            <Row className="inf_p">
                <Col md={8}><Image style={{width:650, height:420}}  src={img2}/></Col>
                <Col md={4}>
                <div className="mt-5"><Button variant="outline-dark" className="adminAddButton"
                    onClick={()=>navigate(SHOP_ROUTE)}><h5>Choose your favorit!</h5> </Button>
                    <p>Only trusted companies!
                    Only verified devices!</p>
                </div>
                </Col>
            </Row>
        </p>
        
        <hr/>


    </div>

    );
};

export default HomePage;