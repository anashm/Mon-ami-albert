import React from 'react';

import Paragraphe from '../../../general/Paragraphe/Paragraphe';
import Title from '../../../general/Title/Title';
import DownloadButton from '../../../general/DownloadButton/DownloadButton';
import phone_img_src from '../../../../images//phones.jpg';

import playstore from '../../../../images/playstore.svg';
import appleStore from '../../../../images/company.svg'

import { Divider } from 'semantic-ui-react'

const ApplictaionSection = () => {
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
                        <img src={ phone_img_src } alt=""/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ApplictaionSection
