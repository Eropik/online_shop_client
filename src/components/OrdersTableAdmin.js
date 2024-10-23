import React, { useContext, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Form } from 'react-bootstrap'; // Добавлен импорт Form
import { confirmOrder, stateOrder } from "../http/BasketAPI";

const OrdersTable = observer(() => {
    const { basket } = useContext(Context);
    const [showConfirmStateModal, setShowConfirmStateModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [newOrderState, setNewOrderState] = useState('');

    const confirm = (id) => {
        console.log(id)
        confirmOrder(id).then(data=>{
            basket.setUpdateTrigger(true)
        });
    };

    const handleShowConfirmStateModal = (id) => {
        setSelectedOrderId(id);
        setShowConfirmStateModal(true);
    };

    const changeState = (id, state) => {
        stateOrder(id, state).then(data => {
            basket.setUpdateTrigger(true);
        });
    };

    return (
        <div className="text-center">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>№</th>
                    <th></th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>isDelivered</th>
                    <th>Delivery satate</th>
                </tr>
                </thead>
                <tbody>
                {basket.devices.map((device, index) => (
                    <tr key={device.id}>
                        <td>{index + 1}</td>
                        <td style={{ textAlign: 'center',}}>
                            <Image style={{ width:80,height:80 }} src={process.env.REACT_APP_API_URL +"/"+ device.device.img} alt={device.device.img} />
                        </td>
                        <td>{device.device.name}</td>
                        <td>{device.device.price}</td>
                        <td>
                            {device.isDelivered ? 'Yes' : 'No'}
                            <hr/>
                            <Button
                                onClick={() => confirm(device.id)}
                                variant="outline-dark"
                            >
                                Confirm
                            </Button>
                        </td>
                        <td>
                            {device.state}
                            <hr/>
                            <Button
                                variant="outline-dark"
                                onClick={() => handleShowConfirmStateModal(device.id)}
                            >Change
                                
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal show={showConfirmStateModal} onHide={() => setShowConfirmStateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm changings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Enter new delivery state:</p>
                    <Form.Control
                        type="text"
                        value={newOrderState}
                        onChange={(e) => setNewOrderState(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmStateModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        changeState(selectedOrderId, newOrderState);
                        setShowConfirmStateModal(false);
                        setNewOrderState(''); // Очистить значение после закрытия модального окна
                    }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
});

export default OrdersTable;
