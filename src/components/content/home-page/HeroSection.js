
import React,{useEffect , Fragment , useState} from 'react'
import photo_einstein from '../../../images/einsten.png';
import './Firstdiv.css';
import phones_photo from '../../../images/phones.jpg';
import btn_playstore from '../../../images/btn_playstore.jpg';
import btn_appstore from '../../../images/btn_appstore.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';

import playBtn from '../../../images/Homepage/video.svg';

import { Modal } from 'react-bootstrap';

const HomepageModal = props => (
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <iframe width="100%" height="500" title = 'MAA' src="https://www.youtube.com/embed/UwoQinuH7p0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
    </Modal>
);



const PopUp = ({ closeToast }) => (

    <div style={{width:'200%'}} className="petite_div">          
        <div className="phone" >
                <img src={phones_photo} alt = '' style={{width:'100%'}} />
        </div>

        <div className="btn_stores" style={{marginTop:'10px'}}>                
                <span className="text_application">  TELECHARGER NOTRE APPLICATION</span>
                <div>
                    <div className="box_stores"> <img src={btn_playstore} alt = '' style={{width:'100%'}}/> </div>
                    <div className="box_stores"> <img src={btn_appstore} alt = ''  style={{width:'100%'}}/> </div>
                </div>                   
        </div>  
    </div>
);

const HeroSection = ( {userConnected} ) => {

    const heroSectionInfos = {
        title: 'Le soutien scolaire de la nouvelle génération',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam',
    }
    
    
    useEffect(() => {
        setTimeout(() => { toast(<PopUp />)  },2000); 
        
    }, []);

    const [ showModal , setShowModal ] = useState(false);
    
    return(
        <section className = 'container-fluid hero-section'>
            <div className = 'container'>
                <div className = 'row'>
                    <div className = 'hero-section-content-container'>
                        <div className = 'hero-section-image-container'>
                            <img src={photo_einstein} alt=""/>

                            <div className="play-btn-container" role = 'button' onClick = { () => setShowModal(true) }>
                                <img src={playBtn} alt=""/>
                            </div>
                        </div>
                        <div className="hero-section-description-container">
                            <h2 className="hero-section-title"> Le soutien scolaire de <br/> La nouvelle génération </h2>
                            <p className="hero-section-paragraphe"> { heroSectionInfos.text } </p>
                            <div className="hero-section-buttons-container">
                                { console.log(userConnected) }
                                { !userConnected ? 
                                    ( 
                                        <Fragment>
                                            <Link className = 'hero-section-button register-button' to = '/creat-account' > s'inscrire gratuitement </Link>
                                            <Link className = 'hero-section-button login-button' to = '/login'> Se connecter </Link> 
                                        </Fragment>
                                    ) : <Link className = 'hero-section-button dashboard-button' to = '/dashboard-user'> Tableau de bord </Link> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <HomepageModal
                show={showModal}
                onHide={() => setShowModal(false)}
            />
        </section>
    );
}

export default HeroSection;
