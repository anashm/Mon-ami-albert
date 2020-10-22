import React , { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';


const FreeChapterButtonLink = ({ img , animation , delay , once  }) => {

    useEffect(() => {
        Aos.init({
            duration: 2000,
            offset: -50
        })
    } , []);

    return (
        <Link 
            data-aos= {animation} data-aos-delay={delay} data-aos-once={once}
            to = '#'>  
            <p className="demo-text"> Demo </p>
            <div className="content">
                <img src={img} alt="" className = 'btn-img' />
                <h3> histoire </h3>
            </div>
        </Link>
    )
}

export default FreeChapterButtonLink
