import React from 'react';
import './style.css';

const Container = ({ children , className = '' }) => {
    return (
        <div className = 'app__container'>
            <div className={`content ${className}`}>
                {children}
            </div>
        </div>
    )
}

export default Container
