import React, { useEffect, useContext, useState, Fragment } from "react";
import {
  Input,
  Form,
  Button,
  Checkbox,
  Icon,
  Loader,
  Dimmer,
} from "semantic-ui-react";
import { FirebaseContext } from "../../firebase";
import UserContext from "../../Context/UserContext/UserContext";
import { useHistory } from "react-router-dom";
import NiveauxSchool from "../../pages/LoggedIn/Matieres/NiveauxSchoolComponent";
import Avatar from "./Avatar/Avatar";
import "./ProfilPage.css";
import firebase_db from "firebase/app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
// import Header from '../../components/header/Header';
import SchoolSearchInput from "../content/inscription/SchoolSearchInput/SchoolSearchInput";
/* import {
    FacebookShareButton ,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon
   
  } from "react-share"; */

import { Spinner } from "react-bootstrap";
import { avatars } from "./ProfileAvatars";

export default function ProfilPage() {
  const firebase = useContext(FirebaseContext);
  const userContext = useContext(UserContext);
  const history = useHistory();
  const [firstName, setfirstName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [lastName, setlastName] = useState("");
  const [, setEmail] = useState("");
  //   const [checked, setChecked] = useState(false);
  const [passwordChecked, setPasswordChecked] = useState(false);
  const [clickedAvatar, setClickedAvatar] = useState(null);
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [level, setLevel] = useState("");
  const [etablissement, setEtablissement] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // const [textModal , setTextModal] = useState('')
  const [showListInstitut, setShowListInstitut] = useState(false);
  const [school, setSchool] = useState("");
  //   const [showSocialIcons, setShowSocialIcons] = useState(false);
  const [niveauxSchool, setNiveauxSchool] = useState([]);
  const [showScrollAvatars, setShowScrollAvatars] = useState(false);
  const [fromFacebook, setFromFacebook] = useState(false);
  const [modalDeconnexion, setModalDeconnexion] = useState(false);
  const [pays, setPays] = useState("");

  useEffect(() => {
    if (userContext.user && userContext.user_informations) {
      setEmail(userContext.user.email);
      setfirstName(userContext.user_informations.firstName);
      setlastName(userContext.user_informations.lastName);
      setAvatar(userContext.user_informations.avatar);
      setEtablissement(userContext.user_informations.etablissement);
      setLevel(userContext.user_informations.level);
      setFromFacebook(userContext.user_informations.fromFacebook);
      setLoading(false);

      if (niveauxSchool.length < 1) {
        const database = firebase.getData();
        const ref_niveaux = database.ref("schoolLevels/all");
        ref_niveaux.on("value", (snapshot) => {
          setNiveauxSchool(snapshot.val());
        });
      }
    }
  }, [userContext.user, userContext.user_informations]);

  const HandleChangeFirstName = (e) => setfirstName(e.target.value);

  const HandleChangeTelephone = (e) => {
    setTelephone(e.target.value);
  };

  const handleChangeInstitut = (value, pays) => {
    setPays(pays);
    setSchool(value);
  };

  //   const HandleChangeEmail = (e) => setEmail(e.target.value);

  const HandleChangeLastName = (e) => setlastName(e.target.value);

  //   const HandleChecked = (e) =>
  //     !checked ? setChecked(true) : setChecked(false);

  const HandleCheckedPassword = (e) =>
    !passwordChecked ? setPasswordChecked(true) : setPasswordChecked(false);

  const [sourceImage, setSourceImage] = useState("");

  const handleAvatarClicked = (src) => setSourceImage(src);

  const getAvatarClicked = (avatar) => {
    setAvatar(avatar);
    setClickedAvatar(avatar);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [useConnectedId] = useState(null);
  const handleShowModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const reauthenticates = (currentPassword) => {
    const utilisateur = firebase_db.auth().currentUser;
    const cred = firebase_db.auth.EmailAuthProvider.credential(
      utilisateur.email,
      currentPassword
    );
    return utilisateur.reauthenticateWithCredential(cred);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userContext.user) {
      //code if realod page pour garder context api values
      const user = userContext.user;
      const userId = user.uid;
      const database = firebase.getData();
      const reference = database.ref("users/");

      //   let utilisateur = firebase_db.auth().currentUser;

      //if user from Facebbok
      if (fromFacebook) {
        if (clickedAvatar) {
          reference
            .child(userId)
            .update({
              lastName: lastName,
              firstName: firstName,
              avatar: clickedAvatar,
            })
            .then(() => {
              userContext.update_user_lastname(lastName);
              userContext.update_user_firstname(firstName);
              userContext.update_user_avatar(clickedAvatar);
              //history.push('/dashboard-user')
              setShowToast(true);
              toast.success("Votre Profil a été mis à jour ! 🧐");
            });
        } else {
          if (school) {
            reference
              .child(userId)
              .update({
                lastName: lastName,
                firstName: firstName,
                etablissement: school,
                pays: pays,
              })
              .then(() => {
                userContext.update_user_lastname(lastName);
                userContext.update_user_firstname(firstName);
                userContext.update_user_etablissement(school);
                userContext.update_user_pays(pays);
                //history.push('/dashboard-user')
                setShowToast(true);
                toast.success("Votre Profil a été mis à jour ! 🧐");
              });
          } else {
            reference
              .child(userId)
              .update({
                lastName: lastName,
                firstName: firstName,
              })
              .then(() => {
                //history.push('/dashboard-user')
                userContext.update_user_lastname(lastName);
                userContext.update_user_firstname(firstName);
                setShowToast(true);
                toast.success("Votre Profil a été mis à jour ! 🧐");
              });
          }
        }
      }

      //if user not from facebook
      else {
        //if user dont want to change password
        if (!passwordChecked) {
          if (clickedAvatar) {
            reference
              .child(userId)
              .update({
                lastName: lastName,
                firstName: firstName,
                avatar: clickedAvatar,
              })
              .then(() => {
                userContext.update_user_lastname(lastName);
                userContext.update_user_firstname(firstName);
                userContext.update_user_avatar(clickedAvatar);
                //history.push('/dashboard-user')
                setShowToast(true);
                toast.success("Votre Profil a été mis à jour ! 🧐");
              });
          } else {
            if (school) {
              reference
                .child(userId)
                .update({
                  lastName: lastName,
                  firstName: firstName,
                  etablissement: school,
                  pays: pays,
                })
                .then(() => {
                  userContext.update_user_lastname(lastName);
                  userContext.update_user_firstname(firstName);
                  userContext.update_user_etablissement(school);
                  userContext.update_user_pays(pays);
                  //history.push('/dashboard-user')
                  setShowToast(true);
                  toast.success("Votre Profil a été mis à jour ! 🧐");
                });
            } else {
              reference
                .child(userId)
                .update({
                  lastName: lastName,
                  firstName: firstName,
                })
                .then(() => {
                  //history.push('/dashboard-user')
                  userContext.update_user_lastname(lastName);
                  userContext.update_user_firstname(firstName);
                  setShowToast(true);
                  toast.success("Votre Profil a été mis à jour ! 🧐");
                });
            }
          }
        } else {
          reauthenticates(currentPassword)
            .then(() => {
              user
                .updatePassword(newPassword)
                .then(function () {})
                .catch(function (error) {});
              if (clickedAvatar) {
                reference
                  .child(userId)
                  .update({
                    lastName: lastName,
                    firstName: firstName,
                    avatar: clickedAvatar,
                  })
                  .then(() => {
                    userContext.update_user_lastname(lastName);
                    userContext.update_user_firstname(firstName);
                    userContext.update_user_avatar(clickedAvatar);
                    //history.push('/dashboard-user')
                    setShowToast(true);
                    toast.success("Votre Profil a été mis à jour ! 🧐");
                  });
              } else {
                if (school) {
                  reference
                    .child(userId)
                    .update({
                      lastName: lastName,
                      firstName: firstName,
                      etablissement: school,
                      pays: pays,
                    })
                    .then(() => {
                      userContext.update_user_lastname(lastName);
                      userContext.update_user_firstname(firstName);
                      userContext.update_user_etablissement(school);
                      userContext.update_user_pays(pays);
                      //history.push('/dashboard-user')
                      setShowToast(true);
                      toast.success("Votre Profil a été mis à jour ! 🧐");
                    });
                } else {
                  reference
                    .child(userId)
                    .update({
                      lastName: lastName,
                      firstName: firstName,
                    })
                    .then(() => {
                      //history.push('/dashboard-user')
                      userContext.update_user_lastname(lastName);
                      userContext.update_user_firstname(firstName);
                      setShowToast(true);
                      toast.success("Votre Profil a été mis à jour ! 🧐");
                    });
                }
              }
            })
            .catch(function (error) {
              setShowToast(true);
              toast.error(
                "Ce mot de passe ne correspond pas à cet utilisateur!"
              );
            });
        }
      }
    }
  };

  const HandleShowModalBesoinProf = () => {
    setShowModal(true);
    //setTextModal("T'inquiète,je vais te mettre bien ! Un de mes conseillers va t'appeler dans les 24 heures .")
  };

  const HandleShowModalBesoinBilan = () => {
    setShowModal(true);
    //setTextModal(" T'inquiète,je gère! Un de mes conseillers  va t'appeler dans les 24 heures.")
  };

  const HandleLogout = () => {
    firebase.signOutUser();
    userContext.get_connected_user(null);
    history.push("/");
  };

  const HandleNumeroTelephone = (e) => {
    e.preventDefault();
    var letters = /^[0-9]+$/;

    // console.log('hnaya '+typeof(telephone))

    if (telephone == "") alert("Veuillez remplir le champ");
    else {
      if (telephone.match(letters) && telephone.length === 10) {
        if (userContext.user) {
          const user = userContext.user;
          const userId = user.uid;
          const database = firebase.getData();
          const reference = database.ref("users/");

          reference
            .child(userId)
            .update({
              telephone: telephone,
            })
            .then(() => {
              setShowModal(false);
              setTimeout(() => {
                setShowToast(true);
                toast.success("C'est noté 😁");
              }, 500);
            });
        }
      } else {
        alert("Veuillez entrer un numéro valide !");
      }
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        >
          <Spinner animation="grow" />
        </div>
      </div>
    );
  }

  return (
    <div className="login-content-container">
      {showScrollAvatars ? (
        <div className="container-profil-images-scroll">
          {avatars.map((avatar, index) => {
            return (
              <Avatar
                avatarClicked={handleAvatarClicked}
                key={index}
                active={
                  sourceImage === avatar.image
                    ? "avatar_clicked"
                    : "image-avatar"
                }
                getAvatar={getAvatarClicked}
                logo={avatar.image}
                name={avatar.name}
              />
            );
          })}
        </div>
      ) : (
        ""
      )}

      <div className="profile-image-container">
        <div className="image-container">
          {avatar ? (
            <>
              <img src={require(`../../images/avatars/${avatar}.png`)} alt="" />
              <Icon name="edit" onClick={() => setShowScrollAvatars(true)} />
            </>
          ) : (
            ""
          )}
        </div>
        <div className="user-infos">
          <span>
            Niveau :{" "}
            <span className="class-answers-etablissements"> {level} </span>{" "}
            <Icon name="edit" onClick={handleShowModal} />{" "}
          </span>
          <span>
            Institution :{" "}
            <span className="class-answers-etablissements">
              {" "}
              {etablissement}{" "}
            </span>{" "}
            <Icon name="edit" onClick={() => setShowListInstitut(true)} />{" "}
          </span>
        </div>
        {showListInstitut ? (
          <SchoolSearchInput changed={handleChangeInstitut} />
        ) : (
          ""
        )}
      </div>

      <Form onSubmit={handleSubmit} className="profile-form">
        <Form.Field>
          <label>Prénom</label>
          <input
            placeholder="Prénom"
            value={firstName}
            onChange={HandleChangeFirstName}
          />
        </Form.Field>

        <Form.Field>
          <label>Nom</label>
          <input
            placeholder="Nom"
            value={lastName}
            onChange={HandleChangeLastName}
          />
        </Form.Field>
        {showToast ? <ToastContainer hideProgressBar={true} /> : ""}

        {fromFacebook ? (
          ""
        ) : (
          <>
            <Form.Field>
              <Checkbox
                label="Modifier le mot de passe"
                onChange={HandleCheckedPassword}
              />
            </Form.Field>

            {passwordChecked ? (
              <>
                <Form.Field>
                  <label>Votre mot de passe</label>
                  <input
                    type="password"
                    placeholder="Votre mot de passe"
                    value={currentPassword}
                    onChange={(e) => {
                      setcurrentPassword(e.target.value);
                    }}
                  />
                </Form.Field>
                <div>
                  <Form.Field>
                    <label>Nouveau mot de pass</label>
                    <input
                      type="password"
                      placeholder="Nouveau mot de pass"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                    />
                  </Form.Field>
                </div>
              </>
            ) : (
              ""
            )}
          </>
        )}
        {/* <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' value={email} onChange={HandleChangeEmail}  />
                </Form.Field> */}
        {/* <Form.Field>
                    <Checkbox label="Modifier l'avatar"  onChange={HandleChecked} />
                </Form.Field>

                {checked ? (
                <div className="images_profil_container">
                    {avatars.map( (avatar , index) => {
                        return(
                            <Avatar avatarClicked = { handleAvatarClicked }  key={index} active = { sourceImage === avatar.image ? 'avatar_clicked' : 'image-avatar' }  getAvatar={getAvatarClicked} logo={avatar.image} name={avatar.name} />
                        )
                    })}
                    
                </div>
                ) : '' } */}

        <Button
          type="submit"
          className="profile-submit-btn"
          style={{ color: "white" }}
        >
          Mettre à jour
        </Button>
      </Form>

      <div>
        <Button onClick={HandleShowModalBesoinProf} id="button_besoin_prof">
          BESOIN D'UN PROF A TES COTES ?
        </Button>

        {/*  <Button   id="button_inviter_ami" onClick={() => setShowSocialIcons(true)} >INVITER UN AMI</Button>
                    {
                        showSocialIcons ? 
                        <div className="div_social_media_container">
                            <WhatsappShareButton
                                url="https://preprod.monamialbert.com/"
                                title="Rejoins les amis d’Albert, veuillez utiliser mon code de parrainage"
                                separator=":"
                                className="Demo__some-network__share-button"
                            >
                                <div className="share_on_whatsapp">
                                    <WhatsappIcon size={32} round />
                                    <span className="st-label">Partager</span>
                                </div>
                                
                            </WhatsappShareButton>

                            <FacebookShareButton
                                url="https://preprod.monamialbert.com/"
                                title="Rejoins les amis d’Albert, veuillez utiliser mon code de parrainage"
                                separator=":"
                                className="Demo__some-network__share-button"
                            >
                                <div className="share_on_facebook">
                                    <FacebookIcon size={32} round />
                                    <span className="st-label">Partager</span>
                                </div>
                            </FacebookShareButton>
                        </div> : ''

                    } */}

        <Button onClick={HandleShowModalBesoinBilan} id="button_besoin_bilan">
          BESOIN D'UN BILAN PEDAGOGIQUE ?
        </Button>

        <Button
          id="button_deconnexion_version_mobile"
          onClick={() => setModalDeconnexion(true)}
        >
          Déconnexion
        </Button>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            T'inquiète, je vais te mettre bien ! Un de mes <br />
            conseillers va t'appeler dans les 24 heures , laisse ton numéro
            ci-dessous.
            <br />
            <br />
            <Input
              placeholder="Ton numéro de Téléphone"
              maxLength="10"
              className="input-numero-telephone-modal"
              onChange={HandleChangeTelephone}
            />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            id="okey-btn-model"
            onClick={HandleNumeroTelephone}
          >
            Okey
          </Button>
          <Button
            onClick={() => setShowModal(false)}
            id="nomMerci-btn-model"
            variant="light"
          >
            Non Merci
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalOpen}
        onHide={handleCloseModal}
        className="dashboard-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4 className="text-center">ALLER EN ...</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="niveaux_school">
            {niveauxSchool.map((niveau, index) => (
              <div key={index}>
                <NiveauxSchool
                  userConnected={useConnectedId}
                  title={niveau}
                  clicked={handleCloseModal}
                />
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>

      {modalDeconnexion == true ? (
        <Modal
          show={modalDeconnexion}
          onHide={() => setModalDeconnexion(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Déconnexion
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Es-tu sûr de vouloir te déconnecter ? </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={HandleLogout}>
              Oui
            </Button>
            <Button
              onClick={() => setModalDeconnexion(false)}
              id="nomMerci-btn-model"
              variant="light"
            >
              Non
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
