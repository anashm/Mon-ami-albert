import React from 'react'
import './ChapterButton.scss';

const ChapterButton = ({ imgSrc , name , clicked , className }) => {
    return (
        <button className = {`chapterButton ${className}`} onClick = {clicked}>
            <img src= { imgSrc } alt= { name} />
        </button>
    )
}

export default ChapterButton;
