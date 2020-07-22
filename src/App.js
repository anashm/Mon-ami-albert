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
        </Switch>
      </div>
      <Footer />
     </Router>
  );
}

export default App;
