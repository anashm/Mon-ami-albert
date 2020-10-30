import React, { useContext } from "react";
import FacebookLogin from "react-facebook-login";
import { FirebaseContext } from "../../../../firebase";
import firebases from "firebase";
import { useHistory } from "react-router-dom";
const Facebook = (props) => {
  const history = useHistory();
  const firebase = useContext(FirebaseContext);

  const appID = "2769237243305382";

  const data = {
    usersRef: firebases.database().ref("users"),
  };

  const saveUser = (createdUser) => {
    return data.usersRef.child(createdUser.user.uid).set({
      lastName: "userFromFacebook",
      firstName: "userFromFacebook",
      level: "Terminale",
      points: 50,
      avatar: "Boy-3",
      pays: "fr",
      fromFacebook: "oui",
      etablissement: "",
      Progression: {
        "Maths Spe": {
          progression_matiere: 0,
          Mathematique: {
            progression: {
              points: 50,
              found_questions: 0,
              current_question_index: 0,
            },
          },
        },
        "Maths Sup": {
          progression_matiere: 0,
          Mathematique: {
            progression: {
              points: 50,
              found_questions: 0,
              current_question_index: 0,
            },
          },
        },
        Première: {
          progression_matiere: 0,
          Mathematique: {
            progression: {
              points: 50,
              found_questions: 0,
              current_question_index: 0,
            },
          },
        },
        Seconde: {
          progression_matiere: 0,
          Mathematique: {
            progression: {
              points: 50,
              found_questions: 0,
              current_question_index: 0,
            },
          },
        },
        Terminale: {
          progression_matiere: 0,
          Mathematique: {
            progression: {
              points: 50,
              found_questions: 0,
              current_question_index: 0,
            },
          },
        },
      },
    });
  };

  const responseFacebook = (response) => {
    //e.preventDefault();

    firebase
      .signupUser(response.email, "facebook")
      .then((user) => {
        saveUser(user).then(() => {
          //console.log("user saved");
          history.push("/dashboard-user");
        });
        //props.navigation.history.push('/dashboard-user')
      })
      .catch((errors) => {
        //console.log(errors)
        if ((errors.code = "auth/email-already-in-use")) {
          //console.log('authenticated')
          firebase.loginUser(response.email, "facebook").then((user) => {
            console.log(user);
            //console.log("dkhal hna");
            history.push("/dashboard-user");
          });
        }
      });
  };

  return (
    <FacebookLogin
      appId={appID}
      fields="name,email,picture"
      /*         onClick={componentClicked}
       */ callback={responseFacebook}
      cssClass="facebook-login-btn"
      icon="fa-facebook"
      textButton="Se connecter avec Facebook"
    />
  );
};

export default Facebook;
