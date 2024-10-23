import React, {useContext, useEffect} from 'react';
import {Container,  Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {observer} from "mobx-react-lite";
import {getAllBasketDevices} from "../http/BasketAPI";
import {Context} from "../index";
import OrdersTableAdmin from "./OrdersTable";


const OrdersAdmin = observer(() => {

    const {basket} = useContext(Context);

    useEffect(() => {
        getAllBasketDevices().then(data => {
            if(isNaN(data)){
                basket.setDevices(data)
            }
            else{
                basket.setDevices([])
            }
        })
        basket.setUpdateTrigger(false)

    }, [basket.updateTrigger]);

    return(
        <Container className="min-height mt-5">
            <Row>
                <Col md={12} >
                    <OrdersTableAdmin/>
                </Col>
                <hr className="mt-5"/>
            </Row>
        </Container>
    );
});

export default OrdersAdmin;