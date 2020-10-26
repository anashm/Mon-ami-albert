import React,{useState,useContext , useEffect} from 'react';
import './SignUp.css';

import avatar from '../../../images/avatars/Boy-3.png';
import { Link , useHistory } from 'react-router-dom';
import { Button, Form,Select} from 'semantic-ui-react';
import Animation from './AnimationLottie';
import {FirebaseContext} from '../../../firebase'
import firebase from 'firebase';
import Title from '../../general/Title/Title';
import etablissements from '../../../json/new-etablissements.json';
import Header from '../../header/Header';
import UserContext from '../../../Context/UserContext/UserContext';

const  SignUp = (props) => {

   
    const Firebase = useContext(FirebaseContext)
    //const database = Firebase.getData();

    const userContext = useContext(UserContext);
    const history = useHistory();
   
    const genderOptions = [
        { text: 'Etablissement 1', value: 'Etablissement 1' },
        {  text: 'Etablissement 2', value: 'Etablissement 2' },
        {  text: 'Etablissement 3', value: 'Etablissement 3' },
        {  text: 'Etablissement 4', value: 'Etablissement 4' },
      ]
      
     
      

    const data = {
        first_name : '',
        last_name : '',
        email : '',
        password : '',
        re_password : '',
        etablissement : '',
        usersRef : firebase.database().ref('users')
    }

    const [SignUpData,setSignUpData] = useState(data);
    const [error , setError] = useState('');
    const [school , setSchool] = useState('')
    

    /* const handleChange = (e) => { 
       //data.etablissement({value: e.target.value});
        setSignUpData({...SignUpData,[e.target.id] : e.target.value})
       
    } */

    const handleChangeFirstName = (e) => {
        setSignUpData({...SignUpData,[e.target.id] : e.target.value})

    }

    const handleChangeLastName = (e) => {
        setSignUpData({...SignUpData,[e.target.id] : e.target.value})
    }

    const handleChangeEmail = (e) => {
        setSignUpData({...SignUpData,[e.target.id] : e.target.value})
    }

    const handleChangePass = (e) => {
        setSignUpData({...SignUpData,[e.target.id] : e.target.value})
    }

    const handleSchoolChange = (e,result) => {       
        setSchool(result.value)
    }   

    const saveUser = (createdUser) => {
       
        return data.usersRef.child(createdUser.user.uid).set({
            lastName: SignUpData.last_name,
            firstName: SignUpData.first_name,
            level:props.location.state.fonction,
            points : 50,
            avatar : props.location.state.avatar ? props.location.state.avatar : 'Boy-3',
            pays : props.location.state.pays,
            etablissement : props.location.state.etablissement,
           Progression : {
               
                'Maths Spe' : {
                    progression_matiere :0,
                    Mathematique : {
                        progression : {
                            points : 50,
                            found_questions : 0,
                            current_question_index : 0
                        }
                    }
                },
                'Maths Sup' : {
                    progression_matiere :0,
                    Mathematique : {
                        progression : {
                            points : 50,
                            found_questions : 0,
                            current_question_index : 0
                        }
                    }
                },
                Première : {
                    progression_matiere :0,
                    Mathematique : {
                        progression : {
                            points : 50,
                            found_questions : 0,
                            current_question_index : 0
                        }
                    }
                },
                Seconde : {
                    progression_matiere :0,
                    Mathematique : {
                        progression : {
                            points : 50,
                            found_questions : 0,
                            current_question_index : 0
                        }
                    }
                },
                Terminale : {
                    progression_matiere :0,
                    Mathematique : {
                        progression : {
                            points : 50,
                            found_questions : 0,
                            current_question_index : 0
                        }
                    }
                },
           }
        });
        /* return data.usersRef.child(createdUser.user.uid+"/Progression").set({

        }) */
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       
        Firebase.signupUser(SignUpData.email,SignUpData.password)
        .then(createdUser => {
            setSignUpData({...data})

 
           /*  createdUser.user.updateProfile({
                displayName : SignUpData.last_name,
                first_name:SignUpData.first_name
            }) */
           
                saveUser(createdUser).then( () => {
                    console.log('user saved') ;
                    props.history.push('/dashboard-user')
                })
        })
        .catch(errors => {
            setError(errors)
            setSignUpData({...data})
        })
    }

    const btn = (SignUpData.first_name !== '' && SignUpData.last_name !== '' && SignUpData.password !=='' &&
                SignUpData.re_password !=='' && SignUpData.email !== '' && SignUpData.re_password === SignUpData.password ) ?  <Button   className = 'submit-btn w-100' style={{marginTop:'5%',marginBottom:'10%'}}>S'inscrire</Button> :
                <Button  disabled className = 'submit-btn w-100' style={{marginTop:'5%',marginBottom:'10%'}}>S'inscrire</Button>
    const errorMsg = error !== '' ? <span style={{color: 'red',fontWeight: '400'}}>{error.message}</span> : null

    
    useEffect(() => {
        userContext.update_current_location(history.location.pathname);
        return () => {
            userContext.update_current_location("");
        }

    } , []);

    
    
    return (
      
        <section className="container signup-section">               
                <Title text = 'CREEZ VOTRE COMPTE' textcentered centerOverlined />

                <div className="row" style={{marginTop:'-2%'}}>
                    <div className="col-md-4"></div>

                    <div className="col-md-4" style={{marginLeft:'4%'}}>
                        <div style={{float:"left",width:'20%'}}>
                             {/* <img src={avatar} style={{width : '70%'}} /> */}
                             {
                                 props.location.state.avatar ? 
                                    <img src={require(`../../../images/avatars/${props.location.state.avatar}.png`)} style={{width : '80%'}} />
                                 :
                                    <img src={avatar} style={{width : '70%'}} />
                             }
                               
                        </div>
                        
                        <p className="text-avatar"> <b> {props.location.state.fonction}</b>.&nbsp;&nbsp;
                     
                            <Link to="/eleve-create-account"> Modifier </Link>
                        </p>
                    </div>
                </div>


                <center>{errorMsg}</center>
                <Form onSubmit={handleSubmit}>
                    <div className="form-sign-up">
                      
                        {/* <div>
                            <div className="col">
                             
                                    <Form.Field 
                                        control={Select}
                                        options={etablissements}                                     
                                        placeholder='Etablissement'
                                        onChange = {handleSchoolChange}
                                        search
                                        searchInput={{ id: 'form-select-control-gender' }}
                                    />
                               
                                  
                            </div>
                        </div> */}

                        <div className="row">

                            <div className="col">
                                <input type="text" onChange={handleChangeFirstName} value={SignUpData.first_name} className="form-control" placeholder="Prénom" id="first_name" />
                            </div>

                            <div className="col">
                                <input type="text" onChange={handleChangeLastName} value={SignUpData.last_name} className="form-control" placeholder="Nom" id="last_name" />
                            </div>

                            
                        </div>
                        <div className="row">
                            <div className="col">
                                <input type="email" onChange={handleChangeEmail} value={SignUpData.email} className="form-control" placeholder="Email" id="email" />
                            </div>
                        </div>

                        


                        <div className="row">
                            <div className="col">
                                <input type="password" onChange={handleChangePass}  value={SignUpData.password} className="form-control" placeholder="Mot de passe" id="password" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input type="password" onChange={handleChangePass}  value={SignUpData.re_password} className="form-control" placeholder="Retaper le mot de passe" id="re_password" />
                            </div>
                        </div>

                       {/*  <Link to="/dashboard-user">  */}
                            {btn}
                        {/* </Link>   */}
                        <p className="deja_un_compte">Tu as déjà un compte ? <Link to="/login"> Connecte-toi </Link></p>
                    </div>
                </Form>

               {/*  { loaded ? <Animation /> : '' } */}
                
        </section>

    )
}


export default SignUp;
