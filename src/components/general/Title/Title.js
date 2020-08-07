import React from 'react';

const Title = ({ text , centerOverlined , leftOverlined , textcentered }) => {
    return (
        <h2 
            className = { `main-sectiontitle ${ centerOverlined ? 'overlined-center' : '' }  ${leftOverlined ? 'overlined-left' : ''}  ${textcentered ? 'text-center' : ''}` } 
        > {text} </h2>
    )
}

export default Title;
