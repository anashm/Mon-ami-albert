import React, { useContext  , useCallback, useState, useEffect,Suspense,lazy } from "react";
import Header from "./components/header/Header";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import "./style/_style.scss";
import HomePage from "./components/content/home-page/HomePage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import PrivateRoute from './components/PrivateRoute'




// import Quizz from "./pages/Chapter/Quizz/Quizz";


import NotFound from "./pages/404/NotFound";
import "aos/dist/aos.css";


import FooterMenu from "./components/footer/FooterMenu/FooterMenu";
import UserContext from "./Context/UserContext/UserContext";
/* import ErrorContext from './Context/ErrorContext/ErrorContext';
 */ import firebase from "firebase";
import { FirebaseContext } from "./firebase";
import Chapter from"./pages/Chapter/Chapter";
import Dashboard from "./pages/LoggedIn/Dashboard";
import WichEnseigant from "./components/content/inscription/WichEnseignant";
import CreatAccount from "./components/content/inscription/create_account";
import Contact from "./pages/Contact";

const Profil =  lazy(() => import("./components/header/ProfilPage"));
const QRCode =  lazy(() => import("./pages/QRCode/QRComponent"));
const ClassementGeneral =  lazy(() => import("./components/header/Classement/ClassementGeneral"));
const ClassementLycee =  lazy(() => import("./components/header/Classement/ClassementLycee"));
const SignUp =  lazy(() => import("./components/content/inscription/SignUp"));
const Register =  lazy(() => import("./pages/Register"));
const LoginWithPhone = lazy(() => import("./pages/LoginWithPhone"));
// const Contact =  lazy(() => import("./pages/Contact"));



const Chapitres =  lazy(() => import( "./pages/LoggedIn/Chapitres"));
const Login =  lazy(() => import( "./pages/Login/Login"));


const EleveAccount =  lazy(() => import( "./components/content/inscription/EleveCompte"));
// import Footer from "./components/footer/Footer";

// import ClassesSection from "./components/content/home-page/ClassesSection/ClassesSection";

const App = () => {
  /*   const errorContext = useContext(ErrorContext);
   */
  const userContext = useContext(UserContext);
  const firebaseContext = useContext(FirebaseContext);
  const [loading, setLoading] = useState(true);

  const authenticateUser = useCallback(async () => {
    try {
      firebase.auth().onAuthStateChanged(  user => {
        console.log(user)
        if(!user) return setLoading(false); 
      
        userContext.get_connected_user(user);
        setLoading(false);
        const userId = user.uid;
        const database = firebaseContext.getData();
        const reference = database.ref(`users/${userId}`);
        reference.once("value", (user_informations) => {
          userContext.get_user_informations(user_informations.val());
        });
      } );
      
    } catch (error) {
      console.log(error?.message);
      setLoading(false);
    }
  } , [])


  useEffect(() => {
    //console.log(errorContext.hasError);
    authenticateUser();
  }, [authenticateUser]);

  return (
    <Router>
      <div id="recaptcha-container" style = {{ display : 'none' }}></div>

      <Header />
      <main
        className={` ${userContext.current_location.replace("/", "")} ${
          userContext.current_location !== "/" ? "main_content" : ""
        }  ${
          userContext.user && userContext.current_location !== "/"
            ? "pad-bottm-mobile"
            : ""
        }`}
        style={{
          padding: `${
            userContext.current_location === "/" ? "0 !important" : null
          }`,
        }}
      >
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <HomePage {...props} loading={loading} />}
          />

          <Route exact path="/contact" component={Contact} />

         
          
         <Route exact path="/creat-account" component={CreatAccount} />
       
          
          <Route exact path="/wich-enseignant" component={WichEnseigant} />
       
         
         
         
          

          <Suspense fallback={<div></div>}>
           <Route exact path="/register" component={Register} />
           <Route exact path="/login" component={LoginWithPhone} />

           
            <Route exact path="/eleve-create-account" component={EleveAccount} />
            {/* <Route exact path="/login" component={Login} /> */}
            <PrivateRoute
              exact
              path="/chapitres/:level/:course/:chapter/cours"
              component={Chapter}
            />
            <Route exact path="/sign-up" component={SignUp} />
            <PrivateRoute
              exact
              path="/dashboard-user"
              component={Dashboard}
            />
            <PrivateRoute exact path="/chapitres/:level/:matieres" component={Chapitres} />
            <PrivateRoute exact path="/profil" component={Profil} />
            <PrivateRoute
              exact
              path="/classement-general"
              component={ClassementGeneral}
            />
              <PrivateRoute exact path="/classement-lycee" component={ClassementLycee} />
              <PrivateRoute exact path="/test_qr_code" component={QRCode} />
          </Suspense>
         
          <Route exact path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </main>
      {userContext.user && <FooterMenu />}
    </Router>
  );
};

export default App;
