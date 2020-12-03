import React, { Fragment, useContext, memo, useEffect, useState,Suspense,lazy } from "react";
import HeroSection from "./HeroSection";

/* import FreeChapterSection from './FreeChapterSection/FreeChapterSection';*/
import Footer from "../../footer/Footer";
//  import Header from '../../header/Header'
import "./style/homapage.scss";

import UserContext from "../../../Context/UserContext/UserContext";
/* import firebase from 'firebase';*/
import { Redirect } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";

const SchoolInfosSection  =  lazy(() => import( "./SchoolInfosSection"));
const ThirdDiv  =  lazy(() => import( "./Thirddiv"));
const Sixthdiv  =  lazy(() => import( "./Sixthdiv"));
const ApplicationSection  =  lazy(() => import( "./Application/ApplictaionSection"));
const ClassesSection  =  lazy(() => import( "./ClassesSection/ClassesSection"));

const HomePage = memo(({ loading }) => {
  const [redirect, setRedirect] = useState(false);

  console.log(" from homepage", loading);
  const userContext = useContext(UserContext);
  //console.log(userContext);

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
        <Suspense fallback={<div></div>}>
          <HeroSection userConnected={userContext.user} />
          <SchoolInfosSection />
          <ThirdDiv />
          {/*  <FourthDiv />
            <FreeChapterSection /> */}
          <Sixthdiv />
          <ApplicationSection />
          <ClassesSection />
        </Suspense>
        </section>
        <Footer />
      </Fragment>
    );
  }
});

export default HomePage;
