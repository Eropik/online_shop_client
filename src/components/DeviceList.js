import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer( ()=> {
    const {device} = useContext(Context)

    let mp=[]

    function findTypeById(typesArray, typeId) {
        const foundType = typesArray.find(type => type.id === typeId);
        return foundType || null;
    }
    function findBrandById(brandsArray, brandId) {
        const foundBrand = brandsArray.find(brand => brand.id === brandId);
        return foundBrand || null;
    }

    return (
        <Row  className = "d-flex">
            {device.devices.map(data => {
                const type = findTypeById(device.types,data.typeId)
                const brand = findBrandById(device.brands, data.brandId)
                    return ( <DeviceItem
                key = {device.id}
                oneDevice = {data}
                type = {type}
                brand = {brand}
                />)}
            )}
        </Row>
    );
});

export default DeviceList;