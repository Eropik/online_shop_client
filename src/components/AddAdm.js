import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "./modals/CreateBrand";
import CreateDevice from "./modals/CreateDevice";
import CreateType from "./modals/CreateType";
import {observer} from "mobx-react-lite";

const AddAdm = observer(() => {
    const [deviceVisible, setDeviceVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    return (

        <Container>
         <Button variant="outline-dark" className="adminAddButton"
                    onClick={()=> setTypeVisible(true)}
           >Add type </Button>

           <Button variant="outline-dark" className="adminAddButton"
                 onClick={()=> setBrandVisible(true)}
           >Add brand </Button>
           <Button variant="outline-dark" className="adminAddButton"
                onClick={()=> setDeviceVisible(true)}
           >Add device </Button>

           <CreateType show={typeVisible} onHide={()=>setTypeVisible(false)}/>

            <CreateBrand show={brandVisible} onHide={()=>setBrandVisible(false) }/>
            <CreateDevice show={deviceVisible} onHide={() =>setDeviceVisible(false)}/>
        </Container>
    );
});

export default AddAdm;