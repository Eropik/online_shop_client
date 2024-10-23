import React, {useContext, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevice, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";
import {getBasketDevices} from "../http/BasketAPI";

const Shop = observer(() => {
    const {device} = useContext(Context)
   

    useEffect(() => {
        device.setSelectedBrand(null)
        device.setSelectedType(null)

        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevice(null, null, 1 ,4).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, []);

    useEffect(()=>{

        fetchDevice(device.selectedType?.id, device.selectedBrand?.id, device.page ,device.limit).then(data => { ////pagination
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })

    },[device.page,device.selectedType, device.selectedBrand])

    useEffect(() => {
        fetchDevice(null, null, 8, 1).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device.updateTrigger]);

    return (
        <Container>
            <Row className="mt-2">

                <Col md={3}>
                    <TypeBar/>
                </Col>

                <Col sm={9}>
                    <BrandBar/>

                    <DeviceList/>

                    <Pages/>
                </Col>
            </Row>

        </Container>

    );
});

export default Shop;