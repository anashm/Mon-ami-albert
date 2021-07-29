import React from 'react'
import Container from '../../components/library/Container';
import { Accordion, Icon } from 'semantic-ui-react'
// import { Container } from 'semantic-ui-react';
import albert from '../../assets/images/albert-quiz.png';

import './style.css';
import Title from '../../components/general/Title/Title';
import { contact } from '../../components/footer/FooterText';

const Contact = () => {

    return (
        <div className = 'contact-page'>
            <header className="header">
                <img src={albert} alt="" />
                <Title text = 'Contact' centerOverlined textcentered />
            </header>

            <main className = "main">
                <Container>
                    <div className="main-content">
                        {contact}
                    </div>
                    <Accordion fluid styled>
                        
                    </Accordion>
                </Container>
            </main>
        </div>
    )
}

export default Contact
