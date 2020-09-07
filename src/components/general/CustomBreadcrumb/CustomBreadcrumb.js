import React from 'react';
import { Link } from 'react-router-dom'

import { Breadcrumb } from 'semantic-ui-react';


const CustomBreadcrumb = () => {


    const sections = [
        { key: 'Home', content: 'Home', link: true , href: '/' },
        { key: 'Store', content: 'Store', link: true },
        { key: 'Shirt', content: 'T-Shirt', active: true },
      ]

    return (
        <div className = 'breadcrumb-container'>
            <Breadcrumb>
                <Breadcrumb.Section > <Link to = '/'> Accueil </Link> </Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>Mon parcours</Breadcrumb.Section>
            </Breadcrumb>
        </div>
    )
}

export default CustomBreadcrumb;
