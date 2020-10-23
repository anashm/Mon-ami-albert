import React , { useEffect , useRef , useState } from 'react';
import { useIntersection } from 'react-use';


import Paragraphe from '../../../general/Paragraphe/Paragraphe';
import Title from '../../../general/Title/Title';
import DownloadButton from '../../../general/DownloadButton/DownloadButton';
import phone_img_src from '../../../../images//phones.jpg';

import playstore from '../../../../images/playstore.svg';
import appleStore from '../../../../images/company.svg';

import { useLottie } from "lottie-react";

import phoneLottie from '../../../../animation/homepage/phoneLottie.json';
import newphoneLottie from '../../../../animation/homepage/animationphones.json';


import { Divider } from 'semantic-ui-react';

const ApplictaionSection = () => {

    const intersectionRef = useRef(null);

   
    const [ options , setOptions ] = useState({
        animationData: newphoneLottie,
        loop: 0,
        autoplay: false
    });

    const [ count , setCount ] = useState(0);

    
    const { View } = useLottie(options);

    const intersection = useIntersection(intersectionRef, {
        root: null,
        rootMargin: '0px',
        threshold: 0.6
    });
    

    useEffect(() => { 
      

        if(intersection && intersection.intersectionRatio < 1){
            setCount(count+1);

            if(count === 1){
                setOptions( prev =>  ({
                    ...prev,
                    autoplay: true
                }));
            }
           
        }
    
     } , [intersection])



    return (
        <section className = 'container-fluid application-section' ref = {intersectionRef}>
            <div className="container">
                <div className="row">
                    <div className=" application-section-container">
                        <Title text = 'Télécharge notre application' leftOverlined />
                        <Divider hidden/>
                        <Paragraphe text = 'Télécharge notre application mobile sur Play Store ou sur App Store pour pouvoir réviser partout où que tu sois.' />
                        <Divider hidden/>
                        <div className="application-download-link-button">
                            <DownloadButton title = 'Télécharger' subTitle = 'sur App Store' img = {appleStore} />
                            <DownloadButton title = 'Télécharger' subTitle = 'sur Play Store' img = {playstore} />
                        </div>
                    </div>

                    <div className="application-section-image-container" >
                        {/* <img src={ phone_img_src } alt=""/> */}

                        {View}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ApplictaionSection
