import React, {useContext, useEffect, useState} from 'react';
import { Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevice, fetchTypes} from "../http/deviceAPI";


import AdminDeviceList from '../components/AdminDeviceList';
import AddAdm from '../components/AddAdm';
import OrderAdm from '../components/OrderAdm';
import AdmBar from '../components/AdmBar';

const Admin = observer( () => {


    const {device} = useContext(Context);
    const [currentSection, setCurrentSection] = useState('');

    useEffect(() => {
        device.setSelectedBrand(null);
        device.setSelectedType(null);

        fetchBrands().then(data => device.setBrands(data));
        fetchTypes().then(data => device.setTypes(data));
        fetchDevice(null, null, 3, 1).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
        device.setUpdateTrigger(false)
    }, [device.updateTrigger]);

    useEffect(() => {
        fetchDevice(device.selectedType?.id, device.selectedBrand?.id, device.limit, device.page).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device.page, device.selectedType, device.selectedBrand]);

    useEffect(() => {
        fetchDevice(null, null, 3, 1).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device.updateTrigger]);

    const handleSectionChange = (section) => {
        setCurrentSection(section);
    };

    return (
       <Container className="d-flex flex-column ">
           <Row className="align-items-center mt-5">
               <Col md={2}>
               <AdmBar onSectionChange={handleSectionChange} />
               </Col>
               <Col md={10}>
                {/* {currentSection === 'MainPage'&&<MainAdm/>} */}
                   {currentSection==='Devices'&&<AddAdm/>}
                   {currentSection==='Orders'&&<OrderAdm/>}
                   {currentSection==="Catalog"&&<AdminDeviceList/>}
               </Col>
           </Row>
       </Container>
    );
});

export default Admin;