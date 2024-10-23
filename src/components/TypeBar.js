import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const TypeBar =observer( () => {
   const {device} = useContext(Context)


    const click = (type) => {
        if(device.selectedType && device.selectedType.id === type.id){
            device.setSelectedType(null)
        }
        else {
            device.setSelectedType(type)
        }
    }
    return (
        <ListGroup>
            {device.types.map(type=>
                <ListGroup.Item
                    style={{cursor:'pointer'}}

                    active = {type.id === device.selectedType?.id}
                    onClick={()=> click(type)}
                    border={type.id === device.selectedType?.id?'dark':'light'}
                    
                    className = "p-2 type_bar br-0"

                    variant="otline-dark"

                    key={type.id}>
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;