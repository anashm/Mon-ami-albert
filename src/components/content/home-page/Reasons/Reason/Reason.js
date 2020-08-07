import React from 'react'

const Reason = ({ index , text }) => {
    return (
        <div className = 'reason-container'>
            <div className="reason-number">  { index } </div>
            <p className="reason-text"> { text } </p>
        </div>
    )
}

export default Reason;
