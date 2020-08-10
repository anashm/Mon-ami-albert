import React, { Component,useState,useContext,useEffect } from 'react'
import ChapitreComponent from './ChapitresComp/ChapitreComponent';
import './style/Chapitres.css';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { useHistory  } from "react-router-dom";
import {FirebaseContext} from '../../firebase';
import UserContext from '../../Context/UserContext/UserContext';


const  Chapitres = ({match}) => {

    
    var matiere = match.params.matieres;
    const firebase = useContext(FirebaseContext)
    const userContext = useContext(UserContext)
    const [infosLevel , setinfosLevel ] = useState(null)
    const [ chapitresTitle , setChapitresTitle ] = useState([])

    const history = useHistory()
    useEffect(() => {
       

        firebase.auth.onAuthStateChanged( user => {
          if(user){
              //code if realod page pour garder context api values
               userContext.get_connected_user(user);
               const userId = user.uid;                      
               const database = firebase.getData();
               const reference =  database.ref('users/'+userId)
      
           
  
                reference.once("value", user_informations => {
                userContext.get_user_informations(user_informations.val());
                setinfosLevel(user_informations.val().level)
                
                const reference_chapitres = database.ref('schoolLevels/'+user_informations.val().level+'/subjects/'+matiere+'/all')
                    reference_chapitres.on("value", chapitres => {
                    
                        setChapitresTitle(chapitres.val())
    
                    })
                })

               
                
          }
          else{

           console.log('not login');
           history.push('/')
          }
        });
      }, []);

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
                <div className="chapters">

                    {chapitresTitle.map( (chapitre,index) => {
                        return (
                            <Link to={`/chapter/${matiere}/${chapitre}`}> 
                                <ChapitreComponent ordre={index+1} title={chapitre} />
                            </Link>
                        )
                        
                    })}
                   
                   
                </div>   
             </div>
         

        </div>
            
        </div>   
        )
    
}

export default Chapitres;
