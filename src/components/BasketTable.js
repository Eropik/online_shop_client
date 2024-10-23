import React, {useContext, useState} from 'react';
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import {FaTrash} from "react-icons/fa";
import {Context} from "../index";
import {removeBasketDevice} from "../http/BasketAPI";
import {observer} from "mobx-react-lite";

const BasketTable = observer(() => {
    const {basket} = useContext(Context);
    const removeFromCart = async (id)=>{

        await removeBasketDevice(id)

        basket.setUpdateTrigger(true)
    }

    return (
        <div className="table_basket">
            <Table striped bordered hover>

                <tbody>
                {
                    basket.devices.map((device, index) =>
                        <tr>
                            <td>{index + 1}</td>
                            <td style = {{textAlign:'center'}} className="cell_basket"><Image width={80} height={80} src={process.env.REACT_APP_API_URL +"/"+ device.device.img}/></td>
                            <td className="cell_basket">{device.device.name}</td>
                            <td className="cell_basket">{device.device.price}</td>
                            <td className="trash" onClick={()=>removeFromCart(device.id)}><FaTrash/></td>
                        </tr>
                    )
                }

                </tbody>
            </Table>


        </div>
    );
});

export default BasketTable;