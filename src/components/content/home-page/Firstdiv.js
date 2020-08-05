import React,{useEffect} from 'react'
import photo_einstein from '../../../images/einsten.png';
import './Firstdiv.css';
import phones_photo from '../../../images/phones.jpg';
import btn_playstore from '../../../images/btn_playstore.jpg';
import btn_appstore from '../../../images/btn_appstore.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
import CreatAccount from '../inscription/create_account';



const PopUp = ({ closeToast }) => (
    <div style={{width:'200%'}} className="petite_div">          
                <div className="phone" >
                        <img src={phones_photo} style={{width:'100%'}} />
                </div>

                <div className="btn_stores" style={{marginTop:'10px'}}>                
                        <span className="text_application">  TELECHARGER NOTRE APPLICATION</span>
                        <div>
                            <div className="box_stores"> <img src={btn_playstore} style={{width:'100%'}}/> </div>
                            <div className="box_stores"> <img src={btn_appstore}  style={{width:'100%'}}/> </div>
                        </div>                   
                </div>
                
                
    </div>
  )

export default function Firstdiv( props ) {
    
    useEffect(() => {
        setTimeout(() => { toast(<PopUp />)  },2000); 
        
      }, []);
    
   
    return ( 
        <div>    
            <div className="container">
            
                <br></br><br></br><br></br>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-3">
                        <img src={photo_einstein} style={{width:'80%'}} alt="" />
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-6">
                        <br></br> <br></br><br></br>
                        <h2 className="title_text">LE SOUTIEN SCOLAIRE DE LA NOUVELLE GENERATION</h2>
                        <br></br>
                        <p className="text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
                        <br></br>
                        <div >
                            
                            <Link  style={{borderRadius:'30px',paddingBottom:'10px',paddingTop:'10px',paddingLeft:'30px',paddingRight:'30px'}}  className="btn btn-secondary" to="/creat-account">S'INSCRIRE GRATUITEMENT</Link>
                            
                            <Link to = '/login' style={{color:'#707070',marginLeft:'30px',borderRadius:'30px',paddingBottom:'10px',paddingTop:'10px',paddingLeft:'30px',paddingRight:'30px'}} className="btn btn-light" >SE CONNECTER</Link>
                        </div>
                    </div>
                </div>
            </div>

          
            {/* <ToastContainer position="bottom-left" autoClose={false} /> */}

        </div>
    )
}
