import React,{useState} from 'react'
import './EleveCompte.css';

const NiveauComponent = (props) => {

    const [btnClicked,setbtnClicked] = useState(undefined)

    const functionHandler = () => {
        console.log(props.active)
        props.passChildData(props.niveau);
        setbtnClicked(true)
        props.niveauClicked(props.niveau)
       /*  props.matiereClicked(props.niveau) */
       
    }
    
    return (
      
        <span onClick={functionHandler}  className = {props.active}>{props.niveau}</span>
          
    )
}

export default NiveauComponent;
