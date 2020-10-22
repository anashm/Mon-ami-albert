import React , { useEffect } from 'react';
import AOS from 'aos';


const Reason = ({ index , text }) => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset: -50
        });
    }, []);


    return (
        <div className = 'reason-container' data-aos="fade-up" data-aos-delay={100 + index*100} data-aos-once="true">
            <div className="reason-number">  { index } </div>
            <p className="reason-text"> { text } </p>
        </div>
    )
}

export default Reason;
