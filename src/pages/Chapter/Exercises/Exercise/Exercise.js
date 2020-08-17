import React , { useState,useEffect,useRef } from 'react'
import { Icon } from 'semantic-ui-react';
import Modal from 'react-bootstrap/Modal';
import './Exercise.scss';
import MathJax from 'react-mathjax-preview'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import PDFComponent from './PDFComponent';
import Pdf from "react-to-pdf";
import DownloadButton from '../../../Chapter/Quizz/DownloadButton/DownloadButton'


const Exercise = ( { title ,   downloadLink , index , enonce_intitule , enonce_choices  , corrige_intitule ,corrige_choices } ) => {

    const refs = React.createRef();
    let reference_pdf = useRef(null);
    
    const tex = "\\int_{-\\infty}^\\infty\\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\\,d\\xi"
    const [ modalOpen , setModalOpen  ] = useState(false);

    const [loader , setLoader] = useState(true)

    const [ isUrl , setIsUrl ] =useState(false);

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

    const isValidUrl = (value) => {
        
		    var res = value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
		    if(res == null)
		        setIsUrl(false);
		    else
            setIsUrl(true);
		
    }
   
   
    
    return (
       
        <div className = 'exercise-container'>
            <div className="exercise-number"> <span> { index } </span> </div>

            <p className="exercise-text" onClick = {handleShowModal}> { title } 
           
            </p>
        
            <div className="exercise-icons-container">
                {/* <a href= {downloadLink} className = 'download-link' onClick={handlePDF}> <span><Icon name='file pdf'/></span></a> */}
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
                    <Modal.Title id="contained-modal-title-vcenter" >
                        {title}
                        
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
            { loader ? <Dimmer active inverted><Loader /></Dimmer> : ''} 
               
               <div style={{display: 'flex',justifyContent: 'flex-end'}}>
                        <Pdf targetRef={reference_pdf} filename="exercices.pdf">
                            {({ toPdf }) => 
                                <div className = 'download-btn-container'>
                                    
                                    <button className = 'download-btn'  onClick={toPdf}><Icon name='file pdf'/>Export PDF</button>
                                </div>}
                        </Pdf>
               </div>

                        
                
                

               <div className="container-pdf" ref={reference_pdf} >
                   
                <div className="enonce-container" >
                     <h3>Enoncé</h3>
                    {/*  {isValidUrl(enonce_intitule) ? <img src={enonce_intitule} /> : <p> <MathJax  math={enonce_intitule} /></p>  } */}
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
            </div> 

              
            
                      
                
                
               
                </Modal.Body>
           
            </Modal>
            
        </div>
    )
}

export default Exercise
