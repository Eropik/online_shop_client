import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Row} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {Context} from "../../index";
import Col from "react-bootstrap/Col";
import {createDevice, fetchBrands, fetchDevice, fetchTypes} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";


const CreateDevice =observer(({show,onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);

    const [info, setInfo] = useState([]);


    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, []);

    const addInfo=()=>{
        setInfo([...info, {title:'',description:'', number:Date.now()}])
    }
    const removeInfo=(number)=>{
        setInfo(info.filter(i=>i.number!==number))
    }

    const selectFile = e =>{
        setFile(e.target.files[0])
        console.log(file)
    }

    const changeInfo = (key,value,number) =>{
        setInfo(info.map(i=>i.number===number?{...i,[key]:value}:i))
    }

    const addDevice = () =>{
        try{const formData = new FormData();
            if(name){formData.append('name', name)}
            else {return alert("Enter dev's name")}
        formData.append('price', `${price}`)
        if(file) {formData.append('img',file)}
        else {return alert("Enter dev's pic")}
        // if(device.selectedBrand & device.selectedType)//???????????????
        //     {formData.append('brandId',device.selectedBrand.id)
        //     formData.append('typeId',device.selectedType.id)}
        // else {return alert("Choose dev's type or brand")}
        formData.append('brandId',device.selectedBrand.id)
        formData.append('typeId',device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data=>onHide())}
        catch(e){}
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header closeButton>
                <Modal.Title  variant="ouline-dark" id="contained-modal-title-vcenter">
                    Add Device
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>

                    <Dropdown className="dropdownDevice ">
                        <Dropdown.Toggle  variant="ouline-dark">
                            {device.selectedType?.name ||"Choose a type"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                            <Dropdown.Item onClick={()=>device.setSelectedType(type)} key={type.id}> {type.name} </Dropdown.Item>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="dropdownDevice">
                        <Dropdown.Toggle  variant="ouline-light">
                            {device.selectedBrand?.name || "Choose a brand"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu  >
                            {device.brands.map(brand =>
                                <Dropdown.Item onClick={()=>device.setSelectedBrand(brand)} key={brand.id}> {brand.name} </Dropdown.Item>)
                            }
                        </Dropdown.Menu>

                         <Form.Control
                             value={name}
                             onChange={e=>setName(e.target.value)}
                             className="mt-2"
                             placeholder="Name of device"

                         />
                        <Form.Control
                            value={price}
                            onChange={e=>setPrice(Number(e.target.value))}
                            className="mt-2"
                            placeholder="Price of device"
                            type="number"
                        />
                        <Form.Control
                            className="mt-2"
                            type="file"
                            onChange={selectFile}
                        />
                        <hr/>
                        <Button

                        variant="outline-dark"
                        onClick={addInfo}>
                            Add new ability
                        </Button>
                        {
                            info.map(i=>
                                <Row key={i.number}>
                                    <Col md={4}>
                                        <Form.Control
                                            value={i.title}
                                            onChange={e=>changeInfo('title', e.target.value,i.number)}
                                            className="mt-2"
                                            placeholder="Name of ability"

                                        />


                                    </Col>
                                    <Col md={4}>
                                        <Form.Control
                                            value={i.description}
                                            onChange={e=>changeInfo('description', e.target.value,i.number)}
                                            className="mt-2"
                                            placeholder="Description of ability"

                                        />


                                    </Col>
                                    <Col md={4} >
                                      <Button
                                          className="mt-2"
                                          variant="outline-danger"
                                          onClick={()=>removeInfo(i.number)}>
                                      
                                          Delete</Button>


                                    </Col>


                                </Row>
                            )
                        }







                    </Dropdown>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-danger" onClick={() => onHide()}>Close</Button>
                <Button variant="outline-success" onClick={addDevice}>Add</Button>
            </Modal.Footer>




        </Modal>
    );
});

export default CreateDevice;