import React, {useContext} from 'react';
import Col from "react-bootstrap/Col";
import {Card, Image, ListGroupItem, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";
import {FaStar} from "react-icons/fa";
import {Context} from "../index";

const DeviceItem = ({oneDevice, type, brand}) => {
    const navigate = useNavigate();
    const {device} = useContext(Context);
    const rate =  oneDevice.rating!==undefined?oneDevice.rating.toFixed(1) : 0

    return (
        <Col md={3} className="mt-3" onClick={() => {
            navigate(DEVICE_ROUTE + '/' + oneDevice.id);
            device.setSelectedType(type);
            device.setSelectedBrand(brand);
        }}>
            <Card className='card_Device'>
                <Image
                    className="Imga_Devs_Item"
                    width={145} height={145}
                    src={process.env.REACT_APP_API_URL + "/" + oneDevice.img}
                    alt='device'
                />
                <div className='card-content'>
                    <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                        <div className="smText">
                            {type.name}, {brand.name}
                        </div>
                        <div className="d-flex align-items-center">
                            {rate}
                            <FaStar className='gold'/>
                        </div>
                    </div>
                        {oneDevice.name}
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;