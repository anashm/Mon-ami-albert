import React from 'react';

const Instructor = ({ img , description , name }) => {
    return (
        <div className = 'instructor-card-container'>
            <div className="instructor-img-container">
                <img src={img} alt="" className="instructor-img"/>
            </div>
            <h2 className="instructor-name"> { name } </h2>
            <p className="instructor-description"> { description } </p>
        </div>
    )
}

export default Instructor;
