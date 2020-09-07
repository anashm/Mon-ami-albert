import React,{useState,useEffect} from 'react'
import { useLottie } from "lottie-react";
import './NotFound.css'

import newphoneLottie from '../../animation/notFound/oops.json';

const NotFound = () => {
    const [ options , setOptions ] = useState({
        animationData: newphoneLottie,
        loop: true,
        autoplay: true
    });
    

    

    const { View } = useLottie(options);

    return (
        <section className = 'not-found-container' >
            <div className="not_found_container">
                
                <p className="svg_container_not_found"> {View} </p>
                
            </div>
            <div className="title_not_found">
                <h2 >Nous n'avons pas trouvé ce que vous recherchiez.</h2>
            </div>
        </section>
    )
}

export default NotFound
