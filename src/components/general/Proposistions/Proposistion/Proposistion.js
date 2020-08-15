import React from 'react'

const Proposistion = ({ image , title , text }) => {
    return (
        <div className = 'proposition-container'>
            <img src={ image } alt="" className="proposition-image"/>
            <h3 className="proposition-title"> { title } </h3>
            <p className="proposition-text"> { text } </p>
        </div>
    )
}

export default Proposistion
