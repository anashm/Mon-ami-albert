import firebase from "firebase";
import app from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBTyIDl28CRc5HwKRKf-V457xpIIvTbOgw",
    authDomain: "monamialber-74a5e.firebaseapp.com",
    databaseURL: "https://monamialber-74a5e.firebaseio.com",
    projectId: "monamialber-74a5e",
    storageBucket: "monamialber-74a5e.appspot.com",
    messagingSenderId: "234370662586",
    appId: "1:234370662586:web:35046d3cac9b18e59e4283",
    measurementId: "G-861ZMKD57K"
  };

  /* var firebaseConfig = {
    apiKey: "AIzaSyAmdGLad1MoT8LmbbadYCZVM2Ykzdz1wm4",
    authDomain: "monamialbertdev.firebaseapp.com",
    databaseURL: "https://monamialbertdev.firebaseio.com",
    projectId: "monamialbertdev",
    storageBucket: "monamialbertdev.appspot.com",
    messagingSenderId: "605978872478",
    appId: "1:605978872478:web:7d1c63debc1f6e1ccac98f",
    measurementId: "G-B8FVGWC5ZB"
  }; */


  
  class Firebase {
      constructor () {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
      }

      signupUser = (email,password) => this.auth.createUserWithEmailAndPassword(email,password);
      
      loginUser = (email,password) => this.auth.signInWithEmailAndPassword(email,password)
      
      signOutUser = () => this.auth.signOut()

      loginFacebook = () => this.auth.loginFacebook()

      getData = () => app.database();
            
        
      /*  retrieveData = () => {
          return firebase.initializeApp(firebaseConfig);
      } */
  }

  export default Firebase;

/*  const firebaseApp = firebase.initializeApp(firebaseConfig);


  const database = firebaseApp.database();
  export default database; */