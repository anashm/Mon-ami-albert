import React , { Fragment , useContext , memo } from 'react'
import HeroSection from './HeroSection';
import SchoolInfosSection from './SchoolInfosSection';
import ThirdDiv from './Thirddiv';
/* import FourthDiv from './Fourthdiv';
 */import Sixthdiv from './Sixthdiv';
import ApplicationSection from './Application/ApplictaionSection';
import ClassesSection from './ClassesSection/ClassesSection';
/* import FreeChapterSection from './FreeChapterSection/FreeChapterSection';
 */import Footer from '../../footer/Footer';
 import Header from '../../header/Header'
import './style/homapage.scss';

import UserContext from '../../../Context/UserContext/UserContext';
/* import firebase from 'firebase';
 */
import { Dimmer, Loader } from 'semantic-ui-react';





const HomePage =  memo( ({ loading }) => {



    console.log(' from homepage' ,loading)

    const userContext = useContext(UserContext);
    //console.log(userContext);


    if(loading ){
      return (
        <Fragment>
              <Dimmer active inverted style = {{ background: 'white' }}>
              <Loader inverted content='Chargement en cours ... ' />
            </Dimmer>
        </Fragment>
      )
    }else{
      
      return(
        <>
        <Header />
        <section id = 'homepage'>
          <HeroSection userConnected={userContext.user} />
          <SchoolInfosSection />
          <ThirdDiv /> 
         {/*  <FourthDiv />
          <FreeChapterSection /> */}
          <Sixthdiv />
          <ApplicationSection />
          <ClassesSection />
          <Footer />
        </section>
        </>
      )
    }
})

export default HomePage;
