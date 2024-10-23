import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import AdminDeviceItem from "./AdminDeviceItem";

const AdminDeviceList = observer( ()=> {
    const {device} = useContext(Context)

    function findBrandById(brandsArray, brandId) {
        const foundBrand = brandsArray.find(brand => brand.id === brandId);
        return foundBrand || null;
    }
    function findTypeById(typesArray, typeId) {
        const foundType = typesArray.find(type => type.id === typeId);
        return foundType || null;
    }

    return (
        <Row  className = "d-flex">
            {device.devices.map(data => {
                const brand = findBrandById(device.brands,data.brandId)
                const type = findTypeById(device.types, data.typeId)
                return (
                    <AdminDeviceItem
                        key = {data.id}
                        oneDevice = {data}
                        brand= {brand}
                        type= {type}
                    />)}
            )}
        </Row>
    );
});

export default AdminDeviceList;