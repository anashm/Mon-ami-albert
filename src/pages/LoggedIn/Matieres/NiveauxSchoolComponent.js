import React, { useContext } from "react";
import { FirebaseContext } from "../../../firebase";
import UserContext from "../../../Context/UserContext/UserContext";
import "./NiveauxSchoolComponent.css";
import { Icon } from "semantic-ui-react";

const NiveauxSchoolComponent = (props) => {
  const firebase = useContext(FirebaseContext);
  const userContext = useContext(UserContext);

  const handleChangeLevel = () => {
    const level = props.title;
    // const userId=props.userConnected;
    const database = firebase.getData();
    const usersRef = database.ref("users/" + userContext.user.uid);
    userContext.update_user_informations(level);
    props.clicked();

    usersRef
      .update({ level: level })
      .then(() => {
        console.log(level);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="niveaux_elements">
      <h5 className="title_niveaux" onClick={handleChangeLevel}>
        {props.title}
        <span className="arrow_niveaux">
          {" "}
          <Icon name="angle right" />
        </span>
      </h5>
    </div>
  );
};

export default NiveauxSchoolComponent;
