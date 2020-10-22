import React,{useState} from 'react'
import './EleveCompte.css';

const NiveauComponent = (props) => {

    const functionHandler = () => {
        props.setLevel(props.niveau);
       
       /*  props.matiereClicked(props.niveau) */
    }
    
    return (
        <span onClick={functionHandler}  className = { `niveaux ${ props.level === props.niveau  ? 'active' : null }` }>{props.niveau}</span>
    )
}

export default NiveauComponent;
