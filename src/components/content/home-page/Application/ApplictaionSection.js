import React from 'react';

import Paragraphe from '../../../general/Paragraphe/Paragraphe';
import Title from '../../../general/Title/Title';
import DownloadButton from '../../../general/DownloadButton/DownloadButton';
import phone_img_src from '../../../../images//phones.jpg';

import playstore from '../../../../images/playstore.svg';
import appleStore from '../../../../images/company.svg';

import { useLottie } from "lottie-react";

import phoneLottie from '../../../../animation/homepage/phoneLottie.json';

import { Divider } from 'semantic-ui-react';

const ApplictaionSection = () => {

    const options = {
        animationData: phoneLottie,
        loop: true,
        autoplay: true
    };
    
    const { View } = useLottie(options);

    return (
        <section className = 'container-fluid application-section'>
            <div className="container">
                <div className="row">
                    <div className=" application-section-container">
                        <Title text = 'Télécharger notre application' leftOverlined />
                        <Divider hidden/>
                        <Paragraphe text = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam' />
                        <Divider hidden/>
                        <div className="application-download-link-button">
                            <DownloadButton title = 'Télécharger' subTitle = 'sur App Store' img = {appleStore} />
                            <DownloadButton title = 'Télécharger' subTitle = 'sur App Store' img = {playstore} />
                        </div>
                    </div>

                    <div className="application-section-image-container">
                        {/* <img src={ phone_img_src } alt=""/> */}

                        {View}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ApplictaionSection
