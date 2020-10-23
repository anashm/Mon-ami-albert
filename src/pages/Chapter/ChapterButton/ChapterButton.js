import React from 'react'
import './ChapterButton.scss';

const ChapterButton = ({ imgSrc , name , clicked , tab }) => {
    return (
        <button className = {`chapterButton ${tab === name.toLowerCase() ? 'active' : null}`} onClick = {clicked}>
            <img src= { imgSrc } alt= { name} />
        </button>
    )
}

export default ChapterButton;
