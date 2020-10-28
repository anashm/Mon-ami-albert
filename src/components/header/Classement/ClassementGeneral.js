import React, { useEffect, useContext, useState } from "react";
import { FirebaseContext } from "../../../firebase";
import UserContext from "../../../Context/UserContext/UserContext";
import { useHistory } from "react-router-dom";
import { Table } from "semantic-ui-react";
import "./ClassementGeneral.css";
import { Dimmer, Loader } from "semantic-ui-react";
import highfive from "../../../images/highFive/HIGHFIVE.svg";
import Header from "../../header/Header";
import { Tab, Tabs } from "react-bootstrap";

import OrderRow from "./OrderRow/OrderRow";

import "./style.scss";

const ClassementGeneral = () => {
  const firebase = useContext(FirebaseContext);
  const userContext = useContext(UserContext);
  const history = useHistory();

  const [classement, setClassement] = useState([]);
  const [dimmer, setDimmer] = useState(true);
  const [level, setLevel] = useState("");
  const [paysEleve, setPaysEleve] = useState("");
  const [eleveMaroc, setEleveMaroc] = useState([]);
  const [eleveFrance, setEleveFrance] = useState([]);
  useEffect(() => {
    if (userContext.user && userContext.user_informations) {
      setPaysEleve(userContext.user_informations.pays);

      //code if realod page pour garder context api values
      //const userId = userContext.user.uid;
      const database = firebase.getData();
      //const reference_user = database.ref('users/'+userId);
      /*  reference_user.once("value", user_informations => {
                userContext.get_user_informations(user_informations.val()); */
      let resultat_pays = {};
      const reference = database.ref("users");
      reference
        .once("value", (snapshot) => {
          let object_final_maroc = [];
          let object_final_france = [];

          snapshot.forEach(function (childSnapshot) {
            const childData = childSnapshot.val();

            setLevel(userContext.user_informations.level);

            if (childData.points && childData.pays)
              if (
                childData.level === userContext.user_informations.level &&
                childData.pays.toLowerCase() === "ma"
              )
                object_final_maroc = [
                  ...object_final_maroc,
                  {
                    points: childData.points,
                    firstName: childData.firstName,
                    lastName: childData.lastName,
                    etablissement: childData.etablissement,
                  },
                ];

            if (childData.points && childData.pays)
              if (
                childData.level === userContext.user_informations.level &&
                childData.pays.toLowerCase() === "fr"
              )
                object_final_france = [
                  ...object_final_france,
                  {
                    points: childData.points,
                    firstName: childData.firstName,
                    lastName: childData.lastName,
                    etablissement: childData.etablissement,
                  },
                ];

            object_final_maroc.sort((a, b) => b.points - a.points);
            object_final_france.sort((a, b) => b.points - a.points);
            //setClassement(object_final)
          });
          resultat_pays = {
            maroc: object_final_maroc,
            france: object_final_france,
          };
        })
        .then(() => {
          //console.log('done');
          setDimmer(false);
          return new Promise(function (resolve, reject) {
            if (resultat_pays.maroc || resultat_pays.france) {
              resolve(resultat_pays);
            } else reject("Il y a aucun lycée");
          });
        })
        .then((data) => {
          setEleveFrance(data.france);
          setEleveMaroc(data.maroc);
          //console.log(data);
        })
        .catch((e) => {
          console.log(e);
          history.push("/404");
        });
    }
  }, [userContext.user_informations, userContext.user]);

  return (
    <div className="general-order-container">
      <h3>Classement Général {level ? level : ""} </h3>

      {paysEleve.toLowerCase() === "fr" ? (
        <div className="orderRow-container">
          {eleveFrance
            ? eleveFrance.map((user, index) => {
                return (
                  <OrderRow
                    key={index}
                    order={index + 1}
                    name={`${user.lastName} ${user.firstName}`}
                    school={user.etablissement}
                    points={user.points}
                  />
                );
              })
            : ""}
        </div>
      ) : (
        <div className="orderRow-container">
          {eleveMaroc
            ? eleveMaroc.map((user, index) => {
                return (
                  <OrderRow
                    key={index}
                    order={index + 1}
                    name={`${user.lastName} ${user.firstName}`}
                    school={user.etablissement}
                    points={user.points}
                  />
                );
              })
            : ""}
        </div>
      )}

      {dimmer && (
        <div className="loader-container" style={{ height: "30vh" }}>
          {dimmer ? (
            <Dimmer active inverted>
              <Loader inverted content="Chargement en cours..." />
            </Dimmer>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default ClassementGeneral;
