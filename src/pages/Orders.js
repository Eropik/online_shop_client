import React, {useContext, useEffect,} from 'react';
import {Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {observer} from "mobx-react-lite";
import { getBasketDevices} from "../http/BasketAPI";
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";
import OrdersTableUser from "../components/OrdersTableUser";


const Orders = observer(() => {

    const {user,basket} = useContext(Context);

    useEffect(() => {
        getBasketDevices(user.user.id).then(data => {
            if(isNaN(data)){
                basket.setBasketId(data[0].basketId)
                const filteredDevices = data.filter(device => device.isBought);
                console.log(filteredDevices);
                basket.setBoughtDevices(filteredDevices)
            }
            else{
                basket.setBasketId(data)
                basket.setBoughtDevices([])
            }
        })
        basket.setUpdateTrigger(false)

    }, [basket.updateTrigger]);

    return(basket.boughtDevices?.length>0? (
        <Container className="mt-5">
            <Row>
                <Col >
                    
                    <OrdersTableUser/>
                </Col>
                <hr className="mt-5"/>
            </Row>
        </Container>):(
        <Container className="d-flex text-center min-height justify-content-center ">
            <p className="mt-4">
                You havnt got orders, go to {' '}
                <NavLink to={SHOP_ROUTE} className="link-info">catalog</NavLink>
            </p>
        </Container>
    ));






});

export default Orders;