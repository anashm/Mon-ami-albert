import React from 'react';

const HorizontalCard = ( { img , text , animation , delay , once , children  } ) => {
    return (
        <div 
        data-aos= {animation} data-aos-delay={delay} data-aos-once={once}
        className = 'horizontal-card-conatiner' >
            <div className="horizontal-card-image-container">
                <img src={img} alt="albert"/>
            </div>
            <p className="horizontal-card-text-container"> { children } </p>
        </div>
    );
}

export default HorizontalCard;