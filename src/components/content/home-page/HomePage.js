import React, { Fragment, useContext, memo, useEffect, useState} from "react";
import HeroSection from "./HeroSection";

/* import FreeChapterSection from './FreeChapterSection/FreeChapterSection';*/

//  import Header from '../../header/Header'
import "./style/homapage.scss";

import UserContext from "../../../Context/UserContext/UserContext";
/* import firebase from 'firebase';*/
import { Redirect } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";

import SchoolInfosSection  from "./SchoolInfosSection";
import ThirdDiv  from "./Thirddiv";
import Sixthdiv  from "./Sixthdiv";
import ApplicationSection  from "./Application/ApplictaionSection";
import ClassesSection  from "./ClassesSection/ClassesSection";
import Footer from "../../footer/Footer";

import phone from '../../../assets/images/phone-icon.png';

const HomePage = memo(({ loading }) => {
  const [redirect, setRedirect] = useState(false);

  // console.log(" from homepage", loading);
  //console.log(userContext);
  const userContext = useContext(UserContext);

  if (loading) {
    return (
      <Fragment>
        <Dimmer active inverted style={{ background: "white" }}>
          <Loader inverted content="Chargement en cours ... " />
        </Dimmer>
      </Fragment>
    );
  } else {
    if (redirect) {
      return <Redirect to="/dashboard-user" />;
    }

    return (
      <Fragment>
        <section id="homepage">
        
            <HeroSection userConnected={userContext.user} />
            <SchoolInfosSection />
            <ThirdDiv />
            <Sixthdiv />
            <ApplicationSection />
            <ClassesSection />
            <a target = '_blank' rel= "noopener norefferer" href = 'https://play.google.com/store/apps/details?id=ma.dba.monamialbert'>

              <div className="use-on-phone">
                <img src={phone} className="float-phone" alt="phone" />
                  <span class="ml-20">
                    <span class="font-w700">Télécharge l'application</span>
                    <br/>Pour une meilleure expérience.
                  </span>
              </div>
            </a>
              
        </section>
      
          <Footer />
       
      </Fragment>
    );
  }
});

export default HomePage;
