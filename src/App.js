import React from 'react';
import Header from './components/header/Header'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import './style/_style.scss';
import HomePage from './components/content/home-page/HomePage';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import CreatAccount  from './components/content/inscription/create_account';
import EleveAccount from './components/content/inscription/EleveCompte';
import Login from './pages/Login/Login';
import JeSuisUnComponent from './components/content/inscription/JesuisUnComponent';
import WichEnseigant from './components/content/inscription/WichEnseignant';
import Chapter from './pages/Chapter/Chapter';
import SignUp from './components/content/inscription/SignUp';
import Dashboard from './pages/LoggedIn/Dashboard';
import Chapitres from './pages/LoggedIn/Chapitres';
import Quizz from './pages/Chapter/Quizz/Quizz';
import TestPDF from './pages/Chapter/Exercises/Exercise/TestPDF'
import Profil from './components/header/ProfilPage'

const  App = () => {


  return (
    <Router>
      <Header  />
      <main className="main_content">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/creat-account" component={CreatAccount} />
            <Route exact path="/eleve-creat-account" component={EleveAccount} />
            <Route exact path="/individu-create-account" component={JeSuisUnComponent} />
            <Route exact path="/wich-enseignant" component={WichEnseigant} />
            <Route exact path="/chapter/:matieres/:chapitre" component={Chapter} />
            <Route exact path="/quizz/:matieres/:chapitre" component={Quizz} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/dashboard-user" component={Dashboard} />
            <Route exact path="/chapitres/:matieres" component={Chapitres} />
            <Route exact path="/test-pdf" component={TestPDF} />
            <Route exact path="/profil" component={Profil} />
          </Switch>
          
          {/* </LoggedinProvider> */}
          {/*  <LoggedinProvider> */}
          {/* </LoginProvider> */}
          {/*  </FadeIn> */}
          {/*  <FadeIn  delay="1000"> */}
          {/* <LoginProvider> */}
        
      </main>

    </Router>


  
  );
}

export default App;


