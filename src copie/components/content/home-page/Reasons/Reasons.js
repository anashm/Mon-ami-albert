import React from 'react';
import Reason from './Reason/Reason';

const Reasons = ({ reasons }) => {

    return (
        <div className = 'reasons-container'>
            { reasons.map((reason , index) => <Reason index = {reason.index} key = {reason.index}  text = {reason.text} />) }
        </div>
    )
}

export default Reasons;
