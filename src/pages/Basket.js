import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, ListGroup, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {observer} from "mobx-react-lite";

import InputGroup from 'react-bootstrap/InputGroup';
import {buyBasketDevice, getBasketDevices} from "../http/BasketAPI";
import {Context} from "../index";
import BasketTable from "../components/BasketTable";
import {NavLink} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";


const Basket = observer(() => {
    const [validated, setValidated] = useState(false);
        const {user,basket} = useContext(Context);
        const [phoneNumber, setPhoneNumber] = useState('');
        const [agreed, setAgreed] = useState(false);

    useEffect(() => {
        const fetchBasketDevices = async ()=>{
        await getBasketDevices(user.user.id).then(data => {
            console.log(data)
            if(isNaN(data)){
                basket.setBasketId(data[0].basketId)
                basket.setBoughtDevices(data.filter(device=>device.isBought))
                basket.setDevices(data.filter(device=>!device.isBought))
            }
            else{
                basket.setBasketId(data)
                basket.setDevices([])
            }
        })
    };
        fetchBasketDevices();

        basket.setUpdateTrigger(false)

    }, [basket.updateTrigger]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (form.checkValidity() && agreed) {
            setAgreed(true);
        }
    };

    const totPrice=()=>{
        let sum = 0;
        basket.devices.forEach(data => {sum+=data.device.price;});
        return sum;
    }

    const buyDevice=()=>{
        try{
        if (phoneNumber && agreed) {
        let idList = basket.devices.map(device=>device.id);
        console.log(idList)
        buyBasketDevice(idList).then(data=>{
            console.log(data)
            basket.setUpdateTrigger(true)
        })}
        else{
            alert("Confirmation error")
        }}
        catch(e){console.log(e)}
    }

return(basket.devices.length>0?(
            <Container>
                <Row>
                    <Col md={3} className="mt-3">
                        <Card claas="form_basket " style={{width: '18rem'}}>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>
                                    <Row className="total_basket">
                                    <h3>Total:</h3>
                                    <h5>{totPrice()}</h5>
                                </Row>
                                </ListGroup.Item>

                            </ListGroup>
                            <Card.Body>
                                <ListGroup.Item  >

                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <Row >
                                            <Form.Group  controlId="validationCustomUsername">
                                                <Form.Label ><h5>Phone num</h5></Form.Label>
                                                <InputGroup hasValidation>
                                                    <InputGroup.Text id="inputGroupPrepend">+375</InputGroup.Text>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="(XX) XXX-XX-XX"
                                                        aria-describedby="inputGroupPrepend"
                                                        required
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please input mob. phone.
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                        </Row>

                                        <Form.Group className="agreement">
                                            <Form.Check
                                                required
                                                label="Agree to terms and conditions"
                                                feedback="You must agree before submitting."
                                                feedbackType="invalid"
                                                checked={agreed}
                                                onChange={(e) => setAgreed(e.target.checked)}
                                            
                                            />
                                        </Form.Group>
                                        <Button type="submit"
                                          className="buy_basket"
                                           onClick={buyDevice}
                                           disabled={!phoneNumber || !agreed} 
                                        >Buy</Button>
                                    </Form>
                                </ListGroup.Item>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={9} >
                        <BasketTable/>

                    </Col>
                    <hr className="mt-5"/>


                </Row>
            </Container>):(
                <Row className="d-flex  text-center"><p>
                    Cart is empty, u can find smth in{' '}
                    <NavLink to={SHOP_ROUTE} className="link-info">catalog</NavLink>
                </p></Row>
));






});

export default Basket;