import React from 'react';
import Classes from './Classes/Classes';
import Title from '../../../general/Title/Title';

const ClassesSection = () => {
    return (
        <section className = 'container-fluid classes-section'>

            <div className="container">
                <Title text = 'voir aussi +' centerOverlined textcentered />
                <div className="row">
                    <Classes />

                    <Classes />

                    <Classes />

                    <Classes />
                </div>
            </div>
            
        </section>
    );
}

export default ClassesSection;
