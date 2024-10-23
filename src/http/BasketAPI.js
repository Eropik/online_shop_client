import {$authHost, $host} from "./index";

export const getBasketDevices = async (userId) => {
    const {data} = await $authHost.get("api/basket", {params:{userId}});
    return data
}
export const removeBasketDevice = async (id) => {
    const {data} = await $authHost.delete("api/basket/" + id);
    return data
}
export const addBasketDevice = async (basketId, deviceId) => {
    const {data} = await $authHost.post("api/basket", {basketId, deviceId});
    console.log(data)
    return data
}

export const buyBasketDevice = async (idList) => {
    const {data} = await $authHost.post("api/basket/buy",{idList});
    return data
}

export const confirmOrder = async (id) => {
    const {data} = await $authHost.post("api/basket/confirm",{id});
    return data
}
export const stateOrder = async (id, state) => {
    console.log(id)
    console.log(state)
    const {data} = await $authHost.post("api/basket/state",{id, state});
    return data
}

export const getAllBasketDevices = async () => {
    const {data} = await $authHost.get("api/basket/all");
    return data
}