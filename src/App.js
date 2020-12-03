import React, { useContext, useState, useEffect,Suspense,lazy } from "react";
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






// import Quizz from "./pages/Chapter/Quizz/Quizz";


import NotFound from "./pages/404/NotFound";
import "aos/dist/aos.css";


import FooterMenu from "./components/footer/FooterMenu/FooterMenu";
import UserContext from "./Context/UserContext/UserContext";
/* import ErrorContext from './Context/ErrorContext/ErrorContext';
 */ import firebase from "firebase";
import { FirebaseContext } from "./firebase";
import Chapter from"./pages/Chapter/Chapter";


const Profil =  lazy(() => import("./components/header/ProfilPage"));
const QRCode =  lazy(() => import("./pages/QRCode/QRComponent"));
const ClassementGeneral =  lazy(() => import("./components/header/Classement/ClassementGeneral"));
const ClassementLycee =  lazy(() => import("./components/header/Classement/ClassementLycee"));
const SignUp =  lazy(() => import("./components/content/inscription/SignUp"));
const Dashboard =  lazy(() => import("./pages/LoggedIn/Dashboard"));

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

  useEffect(() => {
    //console.log(errorContext.hasError);
    if (!userContext.user) {
      //console.log('inside app')
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          userContext.get_connected_user(user);
          setLoading(false);
          const userId = user.uid;
          const database = firebaseContext.getData();
          const reference = database.ref(`users/${userId}`);
          reference.once("value", (user_informations) => {
            userContext.get_user_informations(user_informations.val());
          });
        } else {
          //console.log("not logged in");
          setLoading(false);
        }
      });
    }
  }, []);

  return (
    <Router>
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
         
          
          
       
         
         
         
          

          <Suspense fallback={<div></div>}>
           
            <Route exact path="/eleve-create-account" component={EleveAccount} />
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/chapter/:matieres/:chapitre"
              component={Chapter}
            />
            <Route exact path="/sign-up" component={SignUp} />
            <Route
              exact
              path="/dashboard-user"
              render={(props) => <Dashboard {...props} />}
            />
            <Route exact path="/chapitres/:matieres" component={Chapitres} />
              <Route exact path="/profil" component={Profil} />
              <Route
                exact
                path="/classement-general"
                component={ClassementGeneral}
              />
              <Route exact path="/classement-lycee" component={ClassementLycee} />
              <Route exact path="/test_qr_code" component={QRCode} />
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
