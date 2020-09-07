import React , { useContext , useState , useEffect , useCallback  } from 'react';
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
import Profil from './components/header/ProfilPage';
import 'aos/dist/aos.css';
import ClassementGeneral from './components/header/Classement/ClassementGeneral'
import ClassementLycee from './components/header/Classement/ClassementLycee'
import Recaputilatif from './components/header/RecapProfil/Recaputilatif'


import FooterMenu from './components/footer/FooterMenu/FooterMenu';

import UserContext from './Context/UserContext/UserContext';

import firebase from 'firebase';

import {FirebaseContext} from './firebase';



const  App = () => {

  const userContext = useContext(UserContext);
  const firebaseContext = useContext(FirebaseContext);


  const [ loading , setLoading ] = useState(true);
  const [ test , setTest ] = useState(null);



  useEffect(() => {
    
    //alert(navigator.userAgent);
    //console.log('from app js')

    console.log(test)

    if(!userContext.user){
      console.log('inside app')
      firebase.auth().onAuthStateChanged( user => {
        if(user){
          userContext.get_connected_user(user);
          setLoading(false);
          const userId = user.uid;                      
          const database = firebaseContext.getData();
          const reference =  database.ref('users/'+userId)
          reference.once("value", user_informations => {
              userContext.get_user_informations(user_informations.val());
          });

        }else{
          console.log('not logged in');
          setLoading(false);
        }
      });
    }
      
  
},[]);


  return (
    <Router>
      <Header  />
      <main className="main_content">
          <Switch>
            <Route exact path="/" render = { (props) => <HomePage { ...props } loading = { loading } />  } />
            <Route exact path="/login" component={Login} />
            <Route exact path="/creat-account" component={CreatAccount} />
            <Route exact path="/eleve-create-account" component={EleveAccount} />
            <Route exact path="/individu-create-account" component={JeSuisUnComponent} />
            <Route exact path="/wich-enseignant" component={WichEnseigant} />
            <Route exact path="/chapter/:matieres/:chapitre" component={Chapter} />
            <Route exact path="/quizz/:matieres/:chapitre" component={Quizz} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/dashboard-user"  render = { (props) => <Dashboard { ...props } testFn = { (test) => setTest(test) } />  }  />
            <Route exact path="/chapitres/:matieres" component={Chapitres} />
            <Route exact path="/test-pdf" component={TestPDF} />
            <Route exact path="/profil" component={Profil} />
            <Route exact path="/classement-general" component={ClassementGeneral} />
            <Route exact path="/classement-lycee" component={ClassementLycee} />
            <Route exact path="/recapitulatif" component={Recaputilatif} />
          </Switch>
          
          {/* </LoggedinProvider> */}
          {/*  <LoggedinProvider> */}
          {/* </LoginProvider> */}
          {/*  </FadeIn> */}
          {/*  <FadeIn  delay="1000"> */}
          {/* <LoginProvider> */}
      </main>
      { userContext.user && <FooterMenu /> } 
    </Router>

  );
}

export default App;


