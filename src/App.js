import React from 'react';
import Header from './components/header/Header'
import './App.css';
import HomePage from './components/content/home-page/HomePage';
import Footer from './components/footer/Footer';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import CreatAccount  from './components/content/inscription/create_account';
import EleveAccount from './components/content/inscription/EleveCompte';

function App() {
  
  return (
    <Router>
      <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/creat-account" component={CreatAccount} />
          <Route exact path="/eleve-creat-account" component={EleveAccount} />
        </Switch>
      <Footer />
     </Router>
  );
}

export default App;
