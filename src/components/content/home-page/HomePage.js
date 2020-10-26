import React , { Fragment , useContext , memo , useEffect , useState } from 'react'
import HeroSection from './HeroSection';
import SchoolInfosSection from './SchoolInfosSection';
import ThirdDiv from './Thirddiv';
/* import FourthDiv from './Fourthdiv';*/
import Sixthdiv from './Sixthdiv';
import ApplicationSection from './Application/ApplictaionSection';
import ClassesSection from './ClassesSection/ClassesSection';
/* import FreeChapterSection from './FreeChapterSection/FreeChapterSection';*/
import Footer from '../../footer/Footer';
 import Header from '../../header/Header'
import './style/homapage.scss';

import UserContext from '../../../Context/UserContext/UserContext';
/* import firebase from 'firebase';*/
import { Redirect } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';





const HomePage =  memo( ({ loading }) => {

  const [ redirect , setRedirect ] = useState(false);

    console.log(' from homepage' ,loading)
    const userContext = useContext(UserContext);
    //console.log(userContext);

    useEffect(() => {

      if(userContext.user && window.innerWidth <= 500){
        setRedirect(true);
      }

    } , [userContext.user])


    if(loading ){
      return (
        <Fragment>
              <Dimmer active inverted style = {{ background: 'white' }}>
              <Loader inverted content='Chargement en cours ... ' />
            </Dimmer>
        </Fragment>
      )
    }else{

      if(redirect){
        return <Redirect to = '/dashboard-user' />
      }
      
      return(
        <Fragment>
          <section id = 'homepage'>
            <HeroSection userConnected={userContext.user} />
            <SchoolInfosSection />
            <ThirdDiv /> 
            {/*  <FourthDiv />
            <FreeChapterSection /> */}
            <Sixthdiv />
            <ApplicationSection />
            <ClassesSection />
          </section>
          </Fragment>
        
      )
    }
})

export default HomePage;
