import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card} from "react-bootstrap";

const BrandBar =observer( () => {
    const {device} = useContext(Context)

     const click = (brand) => {
        if(device.selectedBrand && device.selectedBrand.id === brand.id){
            device.setSelectedBrand(null)
        }
        else {
            device.setSelectedBrand(brand)
        }
     }
    return (
       <div /*here was Container*/ className="d-flex" >
            {device.brands.map(brand =>
            <Card
                key={brand.id}

                style={{cursor:'pointer'}}
                onClick={()=> click(brand)}
                border={brand.id === device.selectedBrand?.id?'success':'light'}

                className = "p-3 brand_bar">

                {brand.name}
            </Card>

           )}


       </div>

    );
});

export default BrandBar;