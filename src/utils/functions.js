import React from 'react';
import Latex from "react-latex-next";

export  const convertText = text => {
    // console.log(text?.includes('textbf{}'))
    if(!text || text?.length < 1 || text?.includes('textbf{}')){
        return ''
    }
    const delimiters = [
        { left: '$$', right: '$$', display: true },
        { left: '\\(', right: '\\)', display: false },
        { left: '$', right: '$', display: false },
        { left: '\\[', right: '\\]', display: true },
        { left: '{', right: '}', display: true },
        { left: '\\', right: '\\', display: true },
        { left: '\ec{', right: '}', display: true },
        { left: '\[', right: '\]', display: true },
        { left: '{\bf', right: '}', display: true },
        { left: '{\textit', right: '}', display: true },
        { left: '\\', right: '{', display: true },
        { left: '\\', right: '}', display: true },
        { left: '\\', right: '\\', display: true },
        { left: '\\', right: '{', display: true },
        { left: '\\', right: '}', display: true },
        { left: '\\', right: '\\', display: true },
        { left: '\\', right: '{', display: true },
        { left: 'begin', right: '\end', display: true },
        { left: 'begin', right: 'end', display: true },
        { left: '\\begin{equation}', right: '\\end{equation}', display: true },
        { left: '\\begin{align}', right: '\\end{align}', display: true },
        { left: '\\begin{equation*}', right: '\\end{equation*}', display: true },
        { left: '\\begin{align}', right: '\\end{align}', display: true },
        { left: '\\begin{align*}', right: '\\end{align*}', display: true },
        { left: '\\begin{eqnarray}', right: '\\end{eqnarray}', display: true },
        { left: '\\begin{eqnarray*}', right: '\\end{eqnarray*}', display: true },
        { left: '\\begin{math}', right: '\\end{math}', display: true },
        { left: '\\begin{displaymath}', right: '\\end{displaymath}', display: true },
        { left: '\\begin{gather}', right: '\\end{gather}', display: true },
        { left: '\\begin{gather*}', right: '\\end{gather*}', display: true },
        { left: '\\begin{alignat*}', right: '\\end{alignat*}', display: true },
        { left: '\\begin{alignat}', right: '\\end{alignat}', display: true },
        { left: '\\begin{multline}', right: '\\end{multline}', display: true },
        { left: '\\begin{multline*}', right: '\\end{multline*}', display: true },
        { left: '\\begin{gather}', right: '\\end{gather}', display: true },
    
    ];
    return <Latex delimiters = {[...delimiters]}>{String.raw`${text}`}</Latex>
}
