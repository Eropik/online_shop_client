import React, { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const OrdersTableUser = observer(() => {
    const { basket } = useContext(Context);

    return (
        <div className="text-center">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>№</th>
                    <th></th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>is Delivered</th>
                    <th>Delivery state</th>
                </tr>
                </thead>
                <tbody>
                {basket.boughtDevices.map((device, index) => (
                    <tr key={device.id}>
                        <td>{index + 1}</td>
                        <td style={{ textAlign: 'center' }}  >
                            <Image width={145} height={145} className="Imga_Devs_Item" src={`${process.env.REACT_APP_API_URL}/${device.device.img}`} alt={device.device.name} />
                        </td>
                        <td>{device.device.name}</td>
                        <td>{device.device.price}</td>
                        <td>{device.isDelivered ? 'Yes' : 'No'}</td>
                        <td>{device.state}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
});

export default OrdersTableUser;
