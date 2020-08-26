import React , {useEffect} from 'react';

import AOS from 'aos';


const Proposistion = ({ image , title , text, animate_at }) => {

    useEffect(() => {
        AOS.init({
            duration: 2000
        });
    }, []);


    return (
        <div className = 'proposition-container' data-aos="fade-up"  data-aos-delay={animate_at} data-aos-once="true" >
            <img src={ image } alt="" className="proposition-image"/>
            <h3 className="proposition-title"> { title } </h3>
            <p className="proposition-text"> { text } </p>
        </div>
    )
}

export default Proposistion;
