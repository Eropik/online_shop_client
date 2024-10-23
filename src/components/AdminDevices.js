import React, {useContext, useEffect, useState} from 'react';
import AddAdm from "./AddAdm";
import {Context} from "../index";
import {fetchTypes, fetchBrands, fetchDevice} from "../http/deviceAPI";
import Row from "react-bootstrap/Row";
import {Button} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import BrandBar from "./AuthorBar";
import TypeBar from "./TypeBar";
import Container from "react-bootstrap/Container";
import Pages from "./Pages";
import AdminDeviceList from "./AdminDeviceList";
import {observer} from "mobx-react-lite";

const AdminDevices = observer( () => {
    const { book } = useContext(Context);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        book.setSelectedBrand(null);
        book.setSelectedType(null);

        fetchBrands().then(data => book.setBrands(data));
        fetchTypes().then(data => book.setTypes(data));
        fetchDevice(null, null, 4, 1).then(data => {
            console.log(data);
            device.setDevices(data.rows);
            console.log(device.devices);
            book.setTotalCount(data.count);
        });
    }, []);

    useEffect(() => {
        fetchDevice(device.selectedType?.id, device.selectedBrand?.id, device.limit, device.page).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device.page, device.selectedType, device.selectedBrand]);

    useEffect(() => {
        fetchDevice(null, null, 4, 1).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device.updateTrigger]);

    const handleSearch = async () => {
        if (searchText.trim() === '') {
            device.setUpdateTrigger(true)
        } else {
            // Иначе, загружаем книги, соответствующие поисковому запросу
            const response = await fetchDevice(null, null, 4, 1); // Здесь нужно использовать API для поиска по названию
            const filteredDevices = response.rows.filter(device => device.name.toLowerCase().includes(searchText.toLowerCase()));
            device.setDevices(filteredDevices);
            device.setTotalCount(filteredDevices.length); // Устанавливаем общее количество найденных книг
        }
    };

    return (
        <Container className="admin-container">
            <AddAdm/>
            <hr/>
            <br/>
            <Row className="mt-2 find-line">
                <div className="d-flex align-items-center mb-3">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Find by dev's name"
                        value={searchText}
                        onChange={e => {setSearchText(e.target.value)
                        }}
                    />
                    <Button variant="dark" onClick={handleSearch}>
                        Find
                    </Button>
                </div>
            </Row>
            <hr/>
            <Row className="mt-2">
                <Col md={2}>
                    <BrandBar/>
                </Col>
                <Col sm={10}>
                    <TypeBar/>
                    <Container className="p-2 ">
                        <AdminDeviceList/>
                    </Container>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default AdminDevices;