import React from 'react';

import { useLottie } from "lottie-react";

import albertLottie from '../../../../../animation/homepage/alber-welcome.json';



const test = () => {

    const options = {
        animationData: albertLottie,
        loop: true,
        autoplay: true
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { View } = useLottie(options);


    return (
        <div>
            {View}
        </div>
    )
}

export default test;
