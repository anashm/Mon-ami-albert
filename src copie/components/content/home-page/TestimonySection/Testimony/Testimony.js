import React from 'react';

const Testimony = ({ name , text }) => {
    return (
        <div className = 'testimony-card-container'>

            <h3 className="user-testimony-name"> {name} </h3>
            <p className="user-testinony"> {text} </p>
            
        </div>
    )
}

export default Testimony;
