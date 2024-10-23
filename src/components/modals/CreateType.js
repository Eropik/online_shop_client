import React, {useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {createType} from "../../http/deviceAPI";
import { Context } from '../..';


const CreateType = ({show,onHide}) => {
    const {device} = useContext(Context)
    const [value, setValue] =useState('');

    const addType = () =>{
        createType({name:value}).then(data=>{
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
                <Modal.Title variant="ouline-dark" id="contained-modal-title-vcenter">
                    Add Type
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form><Form.Control
                    placeholder="Name of type"
                    value={value}
                    onChange={e=>setValue(e.target.value)}
                />

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-danger" onClick={() => onHide()}>Close</Button>
                <Button variant="outline-success" onClick={addType}>Add</Button>
            </Modal.Footer>




        </Modal>
    );
};

export default CreateType;