import React from 'react';
import Reason from './Reason/Reason';

const Reasons = ({ reasons }) => {
    return (
        <div className = 'reasons-container'>
            { 
                reasons.map((reason , index) => <Reason index = {index + 1}  text = {reason} />                )
            }
        </div>
    )
}

export default Reasons;
