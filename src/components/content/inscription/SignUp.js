import React,{useState,useContext} from 'react';
import './SignUp.css';
import avatar from '../../../images/avatar.png';
import { Link } from 'react-router-dom';
import { Button} from 'semantic-ui-react';
import Animation from './AnimationLottie';
import {FirebaseContext} from '../../../firebase'

const  SignUp = (props) => {

    const firebase = useContext(FirebaseContext)

    console.log(firebase)

    const data = {
        first_name : '',
        last_name : '',
        email : '',
        password : '',
        re_password : ''
    }
    const [SignUpData,setSignUpData] = useState(data);
    const [error , setError] = useState('');

    const handleChange = (e) => {
        setSignUpData({...SignUpData,[e.target.id] : e.target.value})
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        firebase.signupUser(SignUpData.email,SignUpData.password)
        .then(user => {
            setSignUpData({...data})
            console.log(user)
            //props.history.push('/dashboard-user')
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

    return (
        <div className="container">               
                <p  className="cree_ton_compte"><center>  CREEZ VOTRE COMPTE </center></p>

                <div className="row" style={{marginTop:'-2%'}}>
                    <div className="col-md-4"></div>

                    <div className="col-md-4" style={{marginLeft:'4%'}}>
                        <div style={{float:"left",width:'20%'}}>
                             <img src={avatar} style={{width : '70%'}} /> 
                        </div>
                        
                        <p className="text-avatar"> Je suis un <b> {props.location.state.fonction}</b>.&nbsp;&nbsp;
                        <Link to="/creat-account"> Modifier </Link></p>
                    </div>
                </div>
                <br></br><br></br><br></br>


                <center>{errorMsg}</center>
                <form onSubmit={handleSubmit}>
                    <div className="form-sign-up">
                        <div class="row">

                            <div class="col">
                                <input type="text" onChange={handleChange} value={SignUpData.first_name} class="form-control" placeholder="First name" id="first_name" />
                            </div>

                            <div class="col">
                                <input type="text" onChange={handleChange} value={SignUpData.last_name} class="form-control" placeholder="Last name" id="last_name" />
                            </div>

                            
                        </div>
                        <div class="row">
                            <div class="col">
                                <input type="email" onChange={handleChange} value={SignUpData.email} class="form-control" placeholder="Email" id="email" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <input type="password" onChange={handleChange} value={SignUpData.password} class="form-control" placeholder="Password" id="password" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <input type="password" onChange={handleChange} value={SignUpData.re_password} class="form-control" placeholder="Re enter Password" id="re_password" />
                            </div>
                        </div>

                       {/*  <Link to="/dashboard-user">  */}
                            {btn}
                        {/* </Link>   */}
                        <p className="deja_un_compte">Vous avez déjà un compte ? <Link to="/login"> Connecte-toi </Link></p>
                    </div>
                </form>

               {/*  { loaded ? <Animation /> : '' } */}
                
        </div>
    )
}


export default SignUp;
