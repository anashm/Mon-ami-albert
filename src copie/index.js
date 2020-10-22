import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase , {FirebaseContext}  from './firebase';
import UserState from './Context/UserContext/UserState';
import ErrorState from './Context/ErrorContext/ErrorState';



ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <ErrorState>
      <UserState>
      <App />
      </UserState>
    </ErrorState>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
