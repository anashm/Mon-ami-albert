import React , { useState,useEffect } from 'react'
import { Icon } from 'semantic-ui-react';
import Modal from 'react-bootstrap/Modal';
import './Exercise.scss';
import MathJax from 'react-mathjax-preview'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import PDFComponent from './PDFComponent';
import Pdf from "react-to-pdf";



const Exercise = ( { title ,   downloadLink , index , enonce_intitule , enonce_choices  , corrige_intitule ,corrige_choices } ) => {

    const ref = React.createRef();
    const tex = "\\int_{-\\infty}^\\infty\\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\\,d\\xi"
    const [ modalOpen , setModalOpen  ] = useState(false);

    const [loader , setLoader] = useState(true)

    

    const [ PDF ,setPDF] = useState(false)
    const handleShowModal = () =>{ 
        setModalOpen(true); 
        setTimeout(() => {
            setLoader(false)
        }, 4000);
        
    }
    const handleCloseModal = () => {
        setModalOpen(false);
        setLoader(true)
       
    }

    const [ intitule_choices ,setIntituleChoices] = useState([])
    const [ corrige_choix ,setCorrigeChoix] = useState([])
   
    const handlePDF = () => {

        setPDF(true)

    }
 
    useEffect(() => {
        setIntituleChoices(enonce_choices.split('#'));
        setCorrigeChoix(corrige_choices.split('#'))
        
    }, [])

   
   
    
    return (
       
        <div className = 'exercise-container'>
            <div className="exercise-number"> <span> { index } </span> </div>

            <p className="exercise-text" onClick = {handleShowModal}> { title } </p>
        
            <div className="exercise-icons-container">
                <a href= {downloadLink} className = 'download-link' onClick={handlePDF}> <span><Icon name='file pdf'/></span></a>
                <button className = 'open-exercise' onClick = { handleShowModal }><span><Icon name='eye'/></span></button>
            </div>

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalOpen}
                onHide={handleCloseModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
            { loader ? <Dimmer active inverted><Loader /></Dimmer> : ''} 
               
               
                     
                
                <div className="enonce-container" >
                     <h3>Enoncé</h3>
                     <p> <MathJax  math={enonce_intitule} /></p> 
                     <p className="enonce-choix">
                        {intitule_choices.map( (choix,index) => {
                            return (
                                
                                <span key={index}><MathJax  math={choix} /></span>
                            )
                        })}
                     </p>
                    
                </div>
                
                <div className="corrige-container">             
                    <h3>Corrigé</h3>  
                    
                    <p> <MathJax  math={corrige_intitule} /> </p>
                    <p className="enonce-choix">   
                        {corrige_choix.map( (choix,index) => {
                        return (
                            
                            <span key={index}><MathJax   math={choix} /></span>
                        )
                        })} 
                    </p>
                </div>
                
                <div className="pdf-displayer" ref={ref}>
                    <h1>anas</h1>
                    <p>dix vitesse</p>
                    <p>xxxxxxxxxxxxxxx</p>
                </div>
                <Pdf targetRef={ref} filename="exercices.pdf">
                                {({ toPdf }) => <button onClick={toPdf}>Dowload  PDF</button>}
                </Pdf>
                      
                
                
               
                </Modal.Body>
           
            </Modal>
            
        </div>
    )
}

export default Exercise
