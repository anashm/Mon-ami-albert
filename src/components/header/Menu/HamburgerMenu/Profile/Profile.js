import React, { Fragment, useContext, useEffect, useState } from "react";
import UserContext from "../../../../../Context/UserContext/UserContext";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../../../../../firebase";
import { Link } from "react-router-dom";

const Profile = ({ close }) => {
  const history = useHistory();
  const firebase = useContext(FirebaseContext);
  const userContext = useContext(UserContext);

  const [showProfile, seShowProfile] = useState(false);
  const [avatarPath, setAvatarPath] = useState("");

  const handleSignOut = () => {
    close();
    firebase
      .signOutUser()
      .then(() => {
        userContext.get_connected_user(null);
        userContext.update_user_informations(null);
        history.push("/");
        seShowProfile(false);
      })
      .catch((e) => {
        console.log(e.message);
        history.push("/404");
      });
  };

  const handleSignIn = () => {
    close();
    history.push("/login");
  };

  useEffect(() => {
    if (userContext.user_informations) {
      //console.log(userContext.user_informations.avatar);
      setAvatarPath(userContext.user_informations.avatar);
      seShowProfile(true);
    } else {
      seShowProfile(false);
    }
  }, [userContext.user_informations]);

  return (
    <Fragment>
      {showProfile && (
        <Fragment>
          <Link to="/profil">
            {" "}
            <img
              src={require(`../../../../../images/avatars/${avatarPath}.png`)}
              alt=""
            />{" "}
          </Link>
          <button onClick={handleSignOut}> Se deconnecter </button>
        </Fragment>
      )}

      {!showProfile && <button onClick={handleSignIn}> Se connecter </button>}
    </Fragment>
  );
};

export default Profile;
