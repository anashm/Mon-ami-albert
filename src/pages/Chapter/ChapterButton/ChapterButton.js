import React from 'react'
import './ChapterButton.scss';

const ChapterButton = ({ imgSrc , name , clicked }) => {
    return (
        <button className = 'chapterButton' onClick = {clicked}>
            <img src= { imgSrc } alt= { name} />
        </button>
    )
}

export default ChapterButton;
