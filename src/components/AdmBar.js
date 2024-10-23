import React from 'react';
import {ListGroup} from "react-bootstrap";


const AdmBar = ({onSectionChange}) => {
    return (
        <div>
            <ListGroup>
                <ListGroup.Item className="adm_button" onClick={()=>onSectionChange('Devices')}>Devices</ListGroup.Item>
                <ListGroup.Item className="adm_button" onClick={()=>onSectionChange('Orders')}>Orders</ListGroup.Item>
                
                <ListGroup.Item className="adm_button" onClick={()=>onSectionChange('Catalog')}>Catalog</ListGroup.Item>
            
            </ListGroup>
        </div>
    );
};

export default AdmBar;