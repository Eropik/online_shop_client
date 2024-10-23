

import React, {useContext} from 'react';
import {Context} from "../index";
import {setRating} from "../http/ratingAPI";
import {FaStar} from "react-icons/fa";

const Rating = ({rating, deviceId, userId}) => {
    const {device} = useContext(Context)
    const stars = [1,2,3,4,5];
    const setRate = (rate) => {
        console.log(rate, deviceId, userId)
        if(userId)
        {setRating(deviceId, rate, userId)
            .then(data=> {
                device.setUpdateTrigger(true)
            })
                .catch((error)=>{
                    console.error("Error with adding the rating",error);
                    if(userId===1){alert("Admin cannot set the rating")}
                    else{alert("You have already added the rating")}
                });

        }
        else {alert("At first log in")}
    }

    return (
        <>
            {
                stars.map(star => (
                    star<=rating?<FaStar
                        key={star}
                        className="faStar"
                        color="gold"
                        onClick={() => setRate(star)}
                    />
                    :
                        <FaStar
                        className="faStar"
                        key={star}
                        color="gray"
                        onClick={() => setRate(star)}
                        />

                ))

            }

        </>
    );
};

export default Rating;