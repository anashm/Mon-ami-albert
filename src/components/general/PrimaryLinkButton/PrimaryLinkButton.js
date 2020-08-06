import React from 'react';
import { Link } from 'react-router-dom'

const PrimaryLinkButton = ({ text , link }) => <Link to = {link} className = 'primary-link-button'> { text } </Link>

export default PrimaryLinkButton;
