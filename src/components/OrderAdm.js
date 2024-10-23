

import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getAllBasketDevices} from "../http/BasketAPI";
import {Container} from "react-bootstrap";
import OrdersTableAdmin from "./OrdersTableAdmin";
const OrderAdm = observer(() => {

    const {basket} = React.useContext(Context);

    useEffect(() => {
        getAllBasketDevices().then(data=>{
            basket.setDevices(data)

        })
        basket.setUpdateTrigger(false)
    }, [basket.updateTrigger]);

    return (
        <Container>
            <OrdersTableAdmin/>
        </Container>
    );
});

export default OrderAdm;