import React from 'react';
import Header from './components/header/Header'
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import './style/_style.scss';
import HomePage from './components/content/home-page/HomePage';
import Footer from './components/footer/Footer';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import CreatAccount  from './components/content/inscription/create_account';
import EleveAccount from './components/content/inscription/EleveCompte';
import Login from './pages/Login/Login';
import JeSuisUnComponent from './components/content/inscription/JesuisUnComponent';
import WichEnseigant from './components/content/inscription/WichEnseignant';
<<<<<<< HEAD
import Chapter from './pages/Chapter/Chapter';

=======
import SignUp from './components/content/inscription/SignUp';
import Dashboard from './pages/LoggedIn/Dashboard';
import Chapitres from './pages/LoggedIn/Chapitres';
>>>>>>> 33b4b60e79cc1061aa862636dc475be0865a7cd1

function App() {
  
  return (
    <Router>
      <Header />
      <div className="main_content">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/creat-account" component={CreatAccount} />
          <Route exact path="/eleve-creat-account" component={EleveAccount} />
          <Route exact path="/individu-create-account" component={JeSuisUnComponent} />
          <Route exact path="/wich-enseignant" component={WichEnseigant} />
<<<<<<< HEAD
          <Route exact path="/chapter" component={Chapter} />
=======
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/dashboard-user" component={Dashboard} />
          <Route exact path="/chapitres" component={Chapitres} />
>>>>>>> 33b4b60e79cc1061aa862636dc475be0865a7cd1
        </Switch>
      </div>
      <Footer />
     </Router>
  );
}

export default App;
