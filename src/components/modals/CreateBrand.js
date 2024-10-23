import React, {useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {createBrand} from "../../http/deviceAPI";
import { Context } from '../..';
const CreateBrand = ({show,onHide}) => {
    const [value, setValue] =useState('');
    const {device} = useContext(Context)
    const addBrand = () =>{
        createBrand({name:value}).then(data=>{
            setValue('')
            device.setUpdateTrigger(true);
            onHide()
        })

    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header closeButton>
                <Modal.Title  variant="ouline-dark" id="contained-modal-title-vcenter">
                    Add Brand
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form><Form.Control
                    value={value}
                    onChange={e=>setValue(e.target.value)}

                    placeholder="Name of type"
                />

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-danger" onClick={() => onHide()}>Close</Button>
                <Button variant="outline-success" onClick={addBrand}>Add</Button>
            </Modal.Footer>




        </Modal>
    );
};

export default CreateBrand;