import React from 'react';
import { Link } from 'react-router-dom';

const FreeChapterButtonLink = ({ img }) => {
    return (
        <Link to = '#'>  
            <p className="demo-text"> Demo </p>
            <div className="content">
                <img src={img} alt="" className = 'btn-img' />
                <h3> histoire </h3>
            </div>
        </Link>
    )
}

export default FreeChapterButtonLink
