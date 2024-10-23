import {$authHost} from "./index";


export const setRating=async (deviceId, rate,userId )=>{
    console.log(rate, deviceId, userId)
    const {data} = await $authHost.post("api/rating", {deviceId,  rate,userId});
    return data
}