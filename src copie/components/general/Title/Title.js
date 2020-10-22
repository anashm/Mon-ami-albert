import React from 'react';

const Title = ({ text , centerOverlined , leftOverlined , textcentered , animation , delay , once }) => {
    return (
        <h2 
            data-aos= {animation} data-aos-delay={delay} data-aos-once={once}
            className = { `main-sectiontitle ${ centerOverlined ? 'overlined-center' : '' }  ${leftOverlined ? 'overlined-left' : ''}  ${textcentered ? 'text-center' : ''}` } 
        > {text} </h2>
    )
}

export default Title;
