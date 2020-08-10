import React,{useState} from 'react'
import './EleveCompte.css';

const NiveauComponent = (props) => {

    const [btnClicked,setbtnClicked] = useState(undefined)

    const functionHandler = () => {
        
        props.passChildData(props.niveau);
        setbtnClicked(true)
        
    }
    
    return (
      
        <span onClick={functionHandler} className = {btnClicked ? 'niveaux_clicked' : 'niveaux'}>{props.niveau}</span>
          
    )
}

export default NiveauComponent;