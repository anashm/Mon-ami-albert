
import React,{useEffect , Fragment , useState , memo} from 'react'
import albert_image from '../../../images/quizz/albert-quiz.png';
import './Firstdiv.css';
import phones_photo from '../../../images/phones.jpg';
import btn_playstore from '../../../images/btn_playstore.jpg';
import btn_appstore from '../../../images/btn_appstore.jpg';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
import Lottie from "lottie-react";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Testimony from '../home-page/TestimonySection/Testimony/Testimony';


import playBtn from '../../../images/Homepage/video.svg';

import { Modal } from 'react-bootstrap';

import { useLottie } from "lottie-react";

import albert from '../../../animation/homepage/alber-welcome.json';

import arrow from '../../../animation/homepage/arrow-bottom.json';

import AOS from 'aos';









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

const HeroSection = memo( ( {userConnected} ) => {


    const text_slider = [
        {
            title : 'UN PROGRAMME COMPLET ',
            text : 'Conforme au nouveau programme et aux nouvelles réformes'
        },
        {
            title : 'DES EXEMPLES D’ÉVALUATIONS',
            text : 'Des évaluations fréquentes, pour valider les acquis à la fin de chaque chapitre.'
        },
        {
            title : 'UN SYSTÈME DE POINTS ET DE RÉCOMPENSES :',
            text : 'Les étudiants gagnent des points à hauteur de leurs efforts'
        },
        {
            title : 'DES RÉSULTATS CONCRETS ET APPROUVÉS',
            text : 'Nos étudiants gagnent jusqu’à 4.2 points sur leur moyenne générale.'
        },
    
    ];

    const options = {
        animationData: albert,
        loop: true,
        autoplay: true
    };
    
    const { View } = useLottie(options);

    const [ settings ,  ] = useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    });


    const heroSectionInfos = {
        title: 'Le soutien scolaire de la nouvelle génération',
        text: 'Mon Ami Albert est une application et un site web de soutien scolaire, qui accompagne les élèves du lycée et des classes préparatoires pour combler leurs lacunes et à prendre de l’avance de manière continue. Des cours, des quizz, des exercices corrigés, des annales ou des exemples de contrôles sont au rendez-vous pour un accompagnement pointu.',
    }
    
    
    useEffect(() => {
        /* setTimeout(() => { toast(<PopUp />)  },2000);  */
        AOS.init({
            duration: 1500,
            offset: -50
        });
        
    }, []);

    const [ showModal , setShowModal ] = useState(false);
    
    return(
        <section className = 'container-fluid hero-section'>
            <div className = 'container'>
                <div className = 'row'>
                    <div className = 'hero-section-content-container'>
                        <div className = 'hero-section-image-container' data-aos="fade" data-aos-once="true">
                            {/* <img src={photo_einstein} alt=""/> */}
                            {View}

                            <img src={albert_image} alt="albert"  />

                            <div className="play-btn-container d-none" role = 'button' onClick = { () => setShowModal(true) }>
                                <img src={playBtn} alt=""/>
                            </div>
                        </div>

                        <div className = 'testimonies-container' data-aos="fade-up" data-aos-once="true"  data-aos-delay="100"> 
                            <Slider {...settings}>
                                { text_slider.map( (slide) => <Testimony key = { slide.title } name = { slide.title }  text = { slide.text } />) }
                            </Slider>
                        </div>


                        <div className="hero-section-description-container">
                            <h2 className="hero-section-title" data-aos="fade-up" data-aos-once="true"  data-aos-delay="100"> Le soutien scolaire de <br/> La nouvelle génération </h2>
                            <p className="hero-section-paragraphe" data-aos="fade-up" data-aos-once="true"  data-aos-delay="200"> { heroSectionInfos.text } </p>
                            <div className="hero-section-buttons-container fade-bottom" >
                                { console.log(userConnected) }
                                { !userConnected ? 
                                    ( 
                                        <Fragment>
                                            <Link className = 'hero-section-button register-button' to = '/eleve-create-account' > s'inscrire gratuitement </Link>
                                            <Link className = 'hero-section-button login-button' to = '/login'> Se connecter </Link> 
                                        </Fragment>
                                    ) : 
                                    <Fragment>
                                        <Link className = 'hero-section-button dashboard-button' to = '/dashboard-user'>  Mon Parcours </Link>
                                        {/* <Link className = 'hero-section-button qr-button'  to = '/test_qr_code'>  Scan QR </Link> */}
                                    </Fragment>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="arrow-bottom">
                <Lottie initialSegment = {[0 , 60]} speed = {1} animationData={arrow} />
            </div>

            <HomepageModal
                show={showModal}
                onHide={() => setShowModal(false)}
            />
        </section>
    );
});

export default HeroSection;
