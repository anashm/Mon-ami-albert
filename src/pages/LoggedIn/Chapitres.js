import React, { Component,useState } from 'react'
import ChapitreComponent from './ChapitresComp/ChapitreComponent';
import './style/Chapitres.css';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';


const  Chapitres = () => {


    const [ openTab , setOpenTab ] = useState(true);

        return (
            <div className="container" style={{backgroundColor:'#FAFAFA',margin:'50px 50px 50px 60px'}}>

            
            <div className="exercices-container">
            <div className = 'exercises-title-container ' onClick = { () => setOpenTab(!openTab) } >
                <h2 className="exercises-title">Chapitres</h2>

                <div className="exercises-infos">
                    <div className="exercises-number"> 9 </div>
                    <div className="show-hide-icon">
                        <span> <Icon name= {` ${ openTab ? 'minus square outline' : 'plus square outline' } `} link size='small' className = 'minus-icon' /> </span>
                    </div>
                </div>
            </div>


            
            <div className="exercises-content" style = { { transform: `${!openTab ? 'scaleY(0)' : 'scaleY(1)'}` , transformOrigin: '100% 0%' } } >
                <div style={{display:'flex'}}>
                    <Link to="/chapter">
                        <ChapitreComponent ordre="1" title="Les différentes écritures d'un nombre" />
                    </Link>
                    
                         <ChapitreComponent ordre="2" title="Les diviseurs et les multiples" />
                      
                        <ChapitreComponent ordre="3" title="Calcul littéral" />
                   
                </div>
                

                <div style={{display:'flex'}}>
                  
                        <ChapitreComponent ordre="4" title="Les équations et les inéquations" />
                   
                        <ChapitreComponent ordre="5" title="Organisation et gestion de données" />
                   
                        <ChapitreComponent ordre="6" title="Les probabilités" />
                  
                </div>

                <div style={{display:'flex'}}>
               
                        <ChapitreComponent ordre="7" title="Notion de fonction" />

                        <ChapitreComponent ordre="8" title="Notion de fonction" />
                    
                        <ChapitreComponent ordre="9" title="Théorème de Thalès et réciproque" />
                 
                </div>
            </div>
         

        </div>
            
        </div>   
        )
    
}

export default Chapitres;
