import React,{useState} from 'react'
import './EleveCompte.css';

const NiveauComponent = (props) => {

    const [btnClicked,setbtnClicked] = useState(undefined)

    const functionHandler = () => {
        console.log('clicked')
        props.passChildData(props.niveau);
        setbtnClicked(true)
       /*  props.matiereClicked(props.niveau) */
       
    }
    
    return (
      
        <span onClick={functionHandler}  className = {btnClicked ? 'niveaux_clicked' : 'niveaux'}>{props.niveau}</span>
          
    )
}

export default NiveauComponent;
