import React , { Fragment , useContext, useEffect , useState  } from 'react'
import HeroSection from './HeroSection';
import SchoolInfosSection from './SchoolInfosSection';
import ThirdDiv from './Thirddiv';
import FourthDiv from './Fourthdiv';
import Sixthdiv from './Sixthdiv';
import ApplicationSection from './Application/ApplictaionSection';
import ClassesSection from './ClassesSection/ClassesSection';
import FreeChapterSection from './FreeChapterSection/FreeChapterSection';
import Footer from '../../footer/Footer';

import './style/homapage.scss';

import UserContext from '../../../Context/UserContext/UserContext';
import firebase from 'firebase';

import { Dimmer, Loader } from 'semantic-ui-react';





const HomePage = props => {



    const [ loading , setLoading ] = useState(true);

    const userContext = useContext(UserContext);
    //console.log(userContext);

    useEffect(() => {

    

        firebase.auth().onAuthStateChanged( user => {
            if(user){
              userContext.get_connected_user(user);
              setLoading(false);
            }else{
              console.log('not logged in');
              setLoading(false);
            }
          });
    },[firebase]);


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
        <Fragment>
          <HeroSection userConnected={userContext.user} />
          <SchoolInfosSection />
          <ThirdDiv /> 
          <FourthDiv />
          {/* <FreeChapterSection /> */}
          <Sixthdiv />
          <ApplicationSection />
          <ClassesSection />
          <Footer />
        </Fragment>
      )
    }
}

export default HomePage;
