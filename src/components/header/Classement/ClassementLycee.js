import React, { useEffect, useContext, useState } from "react";
import { FirebaseContext } from "../../../firebase";
import UserContext from "../../../Context/UserContext/UserContext";
import { useHistory } from "react-router-dom";
import { Table } from "semantic-ui-react";
import { Dimmer, Loader } from "semantic-ui-react";
import highfive from "../../../images/highFive/HIGHFIVE.svg";
import Header from "../../header/Header";

import "./ClassementGeneral.css";
import { Tab, Tabs } from "react-bootstrap";

import OrderRow from "./OrderRow/OrderRow";

const ClassementLycee = () => {
  const firebase = useContext(FirebaseContext);
  const userContext = useContext(UserContext);
  const history = useHistory();
  const [classement, setClassement] = useState([]);
  const [dimmer, setDimmer] = useState(true);
  const [dataMaroc, setDataMaroc] = useState([]);
  const [dataFrance, setDataFrance] = useState([]);
  const [paysEleve, setPaysEleve] = useState("");
  const trierLycee = (array) => {
    let object = {};
    array.forEach(function (childData) {
      if (childData.etablissement) {
        if (isNaN(object[`${childData.etablissement}`])) {
          object = {
            ...object,
          };
          //console.log(childData.points)

          object[`${childData.etablissement}`] = childData.points;
        } else {
          //console.log(childData.points)
          object[`${childData.etablissement}`] =
            object[`${childData.etablissement}`] + childData.points;
        }
      }
    });
    let sorted = Object.entries(object).sort((a, b) => b[1] - a[1]);
    //console.log(sorted)
    return sorted;
  };

  useEffect(() => {
    if (userContext.user && userContext.user_informations) {
      setPaysEleve(userContext.user_informations.pays);
      const database = firebase.getData();
      const reference = database.ref("users");
      //const mostViewedPosts = database.ref('users/'+userId).orderByChild('/points');
      /* mostViewedPosts.once("value", user_informations => {
            console.log(user_informations.val())


          }) */

      let resultat_pays;
      reference
        .once("value", (snapshot) => {
          //const reducer = (accumulator, currentValue) => accumulator + currentValue;
          let object = {};
          let array = [];

          let maSchools = [];
          let frSchools = [];

          snapshot.forEach(function (childSnapshot) {
            let childData = childSnapshot.val();
            if (childData.pays) {
              if (childData.pays.toLowerCase().includes("ma")) {
                maSchools.push(childData);
              } else {
                //console.log(childData.etablissement, childData.pays);
                frSchools.push(childData);
              }
            }

            let object_resultat = {};

            // key will be "ada" the first time and "alan" the second time
            // childData will be the actual contents of the child
            //let childData = childSnapshot.val();
            //console.log(childData.etablissement,childData.pays)
          });
          //console.log(maSchools,frSchools);
          resultat_pays = {
            maroc: maSchools,
            france: frSchools,
          };

          //setClassement(sorted);
          //console.log(array)
          //console.log(sorted)
          //userContext.get_user_informations(user_informations.val());
        })
        .then(() => {
          setDimmer(false);
          return new Promise(function (resolve, reject) {
            if (resultat_pays.maroc || resultat_pays.france) {
              resolve(resultat_pays);
            } else reject("Il y a aucun lycée");
          });
        })
        .then((data) => {
          setDataMaroc(trierLycee(data.maroc));
          setDataFrance(trierLycee(data.france));
        })
        .catch((e) => {
          console.log(e.message);
          history.push("/404");
        });
    }
  }, [userContext]);

  return (
    <div className="general-order-container">
      <h3>Classement lycée</h3>{" "}
      {paysEleve.toLowerCase() === "fr" ? (
        <div className="orderRow-container">
          {dataFrance
            ? dataFrance.map((lycee, index) => {
                return (
                  <OrderRow
                    key={index}
                    order={index + 1}
                    name={lycee[0]}
                    points={lycee[1]}
                  />
                );
              })
            : ""}
        </div>
      ) : (
        <div className="orderRow-container">
          {dataMaroc
            ? dataMaroc.map((lycee, index) => {
                return (
                  <OrderRow
                    order={index + 1}
                    name={lycee[0]}
                    points={lycee[1]}
                  />
                );
              })
            : ""}
        </div>
      )}
      {dimmer ? (
        <div className="loader-container" style={{ height: "30vh" }}>
          (
          <Dimmer active inverted>
            <Loader inverted content="Chargement en cours..." />
          </Dimmer>
          )
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default ClassementLycee;
