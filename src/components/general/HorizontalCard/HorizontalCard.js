import React from 'react';

const HorizontalCard = ( { img , text } ) => {
    return (
        <div className = 'horizontal-card-conatiner'>
            <div className="horizontal-card-image-container">
                <img src={img} alt=""/>
            </div>
            <p className="horizontal-card-text-container"> { text } </p>
        </div>
    )
}

export default HorizontalCard;
