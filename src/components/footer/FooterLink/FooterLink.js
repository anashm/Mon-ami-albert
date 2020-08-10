import React from 'react';
import { Link } from 'react-router-dom';

const FooterLink = ({ link , text }) => <Link to = { link } className = 'footer-link' > { text } </Link>

export default FooterLink;
