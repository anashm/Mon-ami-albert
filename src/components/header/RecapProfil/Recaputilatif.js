import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../../../firebase";
import UserContext from "../../../Context/UserContext/UserContext";
import "./Recaputilatif.css";
import { useHistory } from "react-router-dom";
//import Avatar from '../../images/avatars'
import { FaUserEdit, FaSignOutAlt } from "react-icons/fa";

export default function Recaputilatif() {
  const firebase = useContext(FirebaseContext);
  const userContext = useContext(UserContext);
  const history = useHistory();

  //   const path = "../../images/avatars";
  const [avatar, setAvatar] = useState(null);
  const [level, setLevel] = useState(null);
  const [etablissement, setEtablissement] = useState(null);
  useEffect(() => {
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        //code if realod page pour garder context api values
        userContext.get_connected_user(user);
        const userId = user.uid;
        const database = firebase.getData();
        const reference = database.ref("users/" + userId);

        reference.once("value", (user_informations) => {
          userContext.get_user_informations(user_informations.val());
          setAvatar(user_informations.val().avatar);
          setLevel(user_informations.val().level);
          setEtablissement(user_informations.val().etablissement);
          //console.log(user_informations.val())
        });
      } else {
        //console.log("not login");
        history.push("/");
      }
    });
  }, []);

  return (
    <div className="login-content-container">
      <p>Recaputilatif {avatar}</p>
      <span>Code de parainage :</span>
      <br></br>
      <span>
        Niveau : <span className="class-answers-etablissements"> {level} </span>{" "}
      </span>
      <br></br>
      <span>
        Institution :{" "}
        <span className="class-answers-etablissements"> {etablissement} </span>{" "}
      </span>
      <br></br>
      <div className="div-mettre-a-jour">
        <FaUserEdit /> <span>Mettre à jour mon profil</span>
      </div>
      <div className="div-mettre-a-jour">
        <FaSignOutAlt /> <span>Se déconnecter</span>
      </div>

      {avatar ? (
        <img
          src={require(`../../../images/avatars/${avatar}.png`)}
          width="40%"
        />
      ) : (
        ""
      )}
    </div>
  );
}
