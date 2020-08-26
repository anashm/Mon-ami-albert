import React from 'react';
import Proposition from './Proposistion/Proposistion';

const Proposistions = ({ propositions }) => {
    return (
        <div className = 'propositions-container'>
            {
                propositions.map( (proposition , index) => (
                    <Proposition
                        animate_at = {400 + index*100}
                        key = { index }
                        image = { proposition.img }
                        title = { proposition.title }
                        text = { proposition.text }
                    />
                ) )
            }
        </div>
    )
}

export default Proposistions;
