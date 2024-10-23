import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    CONTACT_ROUTE,
    DEVICE_ROUTE,
    HOME_ROUTE,
    INFO_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    ORDER_ROUTE
} from "./utils/consts";
import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import DevicePage from "./pages/DevicePage";
import Auth from "./pages/Auth";
import Home from "./pages/HomePage";
import Contacts from "./pages/Contacts";
import ShopInfo from "./pages/ShopInfo";

import Orders from "./pages/Orders";

import React from "react";

export const authRoutes= [
    {
        path: ADMIN_ROUTE,

        element: <Admin />

    },
    {
        path: BASKET_ROUTE,
       element:<Basket/>

    },
    {
        path: ORDER_ROUTE,
        element:<Orders/>
    },
    
]


export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        element:<Shop/>
    },
    {
      path  : HOME_ROUTE,
        element:<Home/>

    },
    {
        path  : CONTACT_ROUTE,
        element:<Contacts/>

    },
    {
        path  : INFO_ROUTE,
        element:<ShopInfo/>

    },


    {
        path: LOGIN_ROUTE,
        element:<Auth/>

    },
    {
        path: REGISTRATION_ROUTE,
        element:<Auth/>

    },
    {
        path: DEVICE_ROUTE+'/:id',
        element:<DevicePage/>

    },
]