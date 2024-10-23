import React, { useContext, useState } from 'react';
import { Col, Card, Image, Modal, Button } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import { Context } from '../index';
import { deleteDevice } from '../http/deviceAPI';
import ChangeDevice from "./modals/ChangeDevice";

const AdminDeviceItem = ({ oneDevice, brand, type }) => {
    const { device } = useContext(Context);
    const [changeVisible, setChangeVisible] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleDeleteDevice = async () => {
        try {
            await deleteDevice(oneDevice.id);
            device.setUpdateTrigger(true);
            handleCloseModal();
        } catch (error) {
            console.error('Error with deletion', error);
        }
    };

    const handleCloseModal = () => {
        setShowConfirmModal(false);
    };

    const handleShowModal = () => {
        setShowConfirmModal(true);
    };

    return (
        <Col md={3} sm={6} className="mt-3">
            <Card  
           
            className="card_device_adm br-0 d-flex flex-column justify-content-between p-2">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Image width={145} height={145} className="Imga_Devs_Item" src={process.env.REACT_APP_API_URL + '/' + oneDevice.img} alt="device" />
                </div>
                <div className="d-flex flex-column justify-content-start">{oneDevice.name}</div>
                <div className="smText text-black-50 mt-1 d-flex justify-content-between align-items-center">{type.name}, {brand.name}</div>
                <hr />
                <div className="d-flex justify-content-between">
                    <GoGear className="gear" onClick={() => setChangeVisible(true)} />
                    <FaTrashAlt className="trashAlt" onClick={handleShowModal} />
                </div>
            </Card>

            <Modal show={showConfirmModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are u sure with deletion: "{oneDevice.name}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteDevice}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <ChangeDevice
                show={changeVisible}
                onHide={()=>setChangeVisible(false)}
                id={oneDevice.id}
                brand={brand}
                type={type}
            />
        </Col>
    );
};

export default AdminDeviceItem;
