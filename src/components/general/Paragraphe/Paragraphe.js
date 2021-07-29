import React from 'react'

const Paragraphe = ({ text , className , ...props }) => {
    return (
        <p {...props}  className={`paragraphe ${!!className ? className : '' }`}>
            { text }
        </p>
    );
}

export default Paragraphe;
