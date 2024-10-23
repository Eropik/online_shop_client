import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { FaStar } from "react-icons/fa";

import { useParams } from "react-router-dom";
import { fetchBrands, fetchOneDevice, fetchTypes } from "../http/deviceAPI";
import { observer } from "mobx-react-lite";
import { addBasketDevice, getBasket, getBasketDevices } from "../http/BasketAPI";
import { Context } from "../index";
import Rating from "../components/Rating";



const DevicePage = observer(() => {

    const { user } = useContext(Context)
    const { basket } = useContext(Context)
    const { device } = useContext(Context)



    const stars = [];
    const [oneDevice, setDevice] = useState({ info: [] });
    const { id } = useParams()
    

    const [type, setType] = useState('');
    const [brand, setBrand] = useState('');

    useEffect(() => {
        console.log(user.user.id)
       if(user.user.role === "USER")
        getBasketDevices(user.user?.id).then(data => {
            console.log(data)
            if (isNaN(data)) {
                basket.setBasketId(data[0].basketId)
                basket.setBoughtDevices(data.filter(device => device.isBought))
                basket.setDevices(data.filter(device => !device.isBought))
            } else {
                basket.setBasketId(data)
                basket.setDevices([])
            }
        })

    }, [])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchOneDevice(id).then(data => {
            setDevice(data);
            const typeInfo = device.types.find(item => item.id === data.typeId);
            const brandInfo = device.brands.find(item => item.id === data.brandId);
            setType(typeInfo || '');
            setBrand(brandInfo || '');
        })
        device.setUpdateTrigger(false)

    }, [device.updateTrigger]);

    const addToCart = () => {
        
        addBasketDevice(basket.basketId, id).then(data => { console.log(data); //device.updateTrigger(true) 
            
        }).catch((error) => { console.error("ADD BASKET ERR(DevicePage-row_64)", error) })

    }
    const Unauthorized=()=>{
        alert("You are unauthorized")
    }
    const AdminAdding=()=>{
        alert("Admin cannot add devices")
    }
    const description = oneDevice.info?.find(item => item.title === "description")


    const rate =  oneDevice.rating!==undefined?oneDevice.rating.toFixed(1) : 0

    for (let i = 0; i < 5; i++) {
        if (i < oneDevice.rating) {
            stars.push(<FaStar key={i} color="#ff8753" />);
        } else {
            stars.push(<FaStar key={i} color="gray" />);
        }
    }

    return (

        <Container className="d-flex align-items-center">
            <Row style={{ width: 1700 }}>
                <Col md={5} className="mt-3">
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + "/" + oneDevice.img} />

                </Col>
                <Col md={5}>
                    <Row className={"mt-5"}>
                        <Col className={"mt-3"} s md={6}>
                            <h3>{oneDevice.name}</h3>
                            <div>
                                {type.name}, {brand.name}
                            </div>
                            <div className='d-flex justify-content-start align-items-center'>
                                <div className="mr-2">
                                    <Rating
                                        rating={oneDevice.rating}
                                        deviceId={id}
                                        userId={user.user.id}
                                    />

                                    {console.log(" rate: " + (oneDevice.rating) , " device id: " + id, " user id: " + user.user.id)}

                                </div>
                                <div className="mt-1">{rate}</div>
                            </div>
                        </Col>
                        <Col className={"mt-3"} md={6}>
                            <Row className="mb-3 d-flex justify-content-end align-items-center text-description">
                                {oneDevice.info
                                    ? oneDevice.info.map((item, index) => {
                                        if (item.title !== "description") {
                                            return (
                                                <>
                                                    <Col md={4} key={index + "t"}
                                                        className="d-flex justify-content-start align-items-start">
                                                        {item.title}
                                                    </Col>
                                                    <Col md={8} key={index} sm={6}>
                                                        {item.description}
                                                    </Col>
                                                </>
                                            );
                                        }
                                        return null;
                                    })
                                    : null}
                            </Row>
                        </Col>
                    </Row>
                </Col>

                <Col md={2} className={"mt3"}>
                    <Button className="cartButton"
                        variant={"outline-dark"}
                        onClick={user.user.id ? user.user.role==='ADMIN'? AdminAdding: addToCart : Unauthorized}
                    > Add to cart</Button>
                </Col>

                <hr className="mt-4" />


                <p > {description ? description.description : "This device hasnt description"}</p>

            </Row>

        </Container>
    );
});

export default DevicePage;