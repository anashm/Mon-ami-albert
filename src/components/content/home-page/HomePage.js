import React , { Fragment } from 'react'
import HeroSection from './HeroSection';
import SchoolInfosSection from './SchoolInfosSection';
import ThirdDiv from './Thirddiv';
import FourthDiv from './Fourthdiv';
import Fifthdiv from './Fifthdiv';
import Sixthdiv from './Sixthdiv';
import Seventhdiv from './Seventhdiv';
import Lastdiv from './Lastdiv';
import ApplicationSection from './Application/ApplictaionSection';
import ClassesSection from './ClassesSection/ClassesSection';
import FreeChapterSection from './FreeChapterSection/FreeChapterSection';
import Footer from '../../footer/Footer';

import './style/homapage.scss';

import { useContext, useEffect , useState} from 'react';
import UserContext from '../../../Context/UserContext/UserContext';
import firebase from 'firebase';


export default function HomePage(props) {

    const userContext = useContext(UserContext);
    //console.log(userContext);

    useEffect(() => {

        firebase.auth().onAuthStateChanged( user => {
            if(user){
             // console.log(user);
              userContext.get_connected_user(user);
            }else{
              console.log('not logged in')
            }
          });

       //const user = userContext.get_connected_user();
    //   console.log(user)
    },[])



    

    return (
        <Fragment>
            <HeroSection userConnected={userContext.user} />
            <SchoolInfosSection />
            <ThirdDiv /> 
            <FourthDiv />
            <FreeChapterSection />
            <Sixthdiv />
            <ApplicationSection />
            <ClassesSection />
            {/*
            
              <Fifthdiv />
            
              <Seventhdiv /> 
              <Lastdiv />
            
            */}
            <Footer />

        </Fragment>
    )
}
