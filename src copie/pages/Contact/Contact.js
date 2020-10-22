import React from 'react'
import './Contact.css';


const Contact = () => {
    return (
        <div className = 'contact-content-container'>
            <div class="ui input">
                <input type="text" placeholder="Nom" />
            </div>

            <div class="ui input">
                <input type="text" placeholder="Prénom" />
            </div>

            <div class="ui input">
                <input type="text" placeholder="Nom" />
            </div>
        </div>
    )
}

export default Contact;
