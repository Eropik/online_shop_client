import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Dropdown, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../../index';
import Col from 'react-bootstrap/Col';
import {changeDevice, createDevice, fetchTypes, fetchBrands, fetchOneDevice} from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';

const ChangeDevice = observer(({ show, onHide, id, brand, type }) => {
    const { device } = useContext(Context);
    const [oneDevice, setOneDevice] = useState({info :[]});
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const [ch_brand, setCh_brand] = useState(brand);
    const [ch_type, setCh_type] = useState(type);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        fetchOneDevice(id).then(data => {
            setOneDevice(data)
            setName(data.name)
            setPrice(data.price)
            setInfo(
                oneDevice.info.map(item => ({
                    title: item.title || '',
                    description: item.description || '',
                    number: item.id
                }))
            );
        });
    }, []);

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }]);
    };

    const removeInfo = number => {
        setInfo(info.filter(item => item.number !== number));
    };

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const changeInfo = (key, value, number) => {
        setInfo(
            info.map(item => (item.number === number ? { ...item, [key]: value } : item))
        );
    };

    const addDevice = () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', `${price}`);
            formData.append('img', file);
            formData.append('brandId', ch_brand.id);
            formData.append('typeId', ch_type.id);
            formData.append('info', JSON.stringify(info));
            changeDevice(id, formData).then(data => {
                device.setUpt(true);
                onHide();
                device.setSelectedGenre(null);
                device.setSelectedAuthor(null);
            });
        } catch (error) {
            console.error('Error with adding the book:', error);
        }
    };

    const options = [
        'description',
        'weight',
        'Power',
        'Made in'
    ];

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Device</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="dropdownDevice mt-2">
                        <Dropdown.Toggle variant="outline-dark">
                            {ch_brand.name || 'Brand'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand => (
                                <Dropdown.Item
                                    key={brand.id}
                                    onClick={() => setCh_brand(brand)}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="dropdownDevice mt-2">
                        <Dropdown.Toggle variant="outline-dark">
                            {ch_type.name || 'Type'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type => (
                                <Dropdown.Item
                                    key={type.id}
                                    onClick={() => setCh_type(type)}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-2"
                        placeholder="Device's name"
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-2"
                        placeholder="Device's price"
                        type="number"
                        step="0.01"
                        min="0"
                    />
                    <Form.Control className="mt-2" type="file" onChange={selectFile} />
                    <hr />
                    <Button variant="outline-dark" onClick={addInfo}>
                        Add description
                    </Button>
                    {info.map(item => (
                        <Row key={item.number}>
                            <Col md={4}>
                                <Dropdown className="dropdownDevice mt-2">
                                    <Dropdown.Toggle variant="outline-dark">
                                        {item.title ? item.title : 'Choose description'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {options.map((option, index) => (
                                            <Dropdown.Item
                                                key={item.number}
                                                onClick={() =>
                                                    changeInfo('title', option, item.number)
                                                }
                                            >
                                                {option}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={item.description}
                                    onChange={e =>
                                        changeInfo('description', e.target.value, item.number)
                                    }
                                    className="mt-2"
                                    placeholder="description"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    className="mt-2"
                                    variant="outline-danger"
                                    onClick={() => removeInfo(item.number)}
                                >
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <ButtonGroup>
                    <Button variant="danger" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="success" onClick={addDevice}>
                        Add
                    </Button>
                </ButtonGroup>
            </Modal.Footer>
        </Modal>
    );
});

export default ChangeDevice;
