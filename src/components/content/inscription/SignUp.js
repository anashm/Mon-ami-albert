import React from 'react';
import './SignUp.css';
import avatar from '../../../images/avatar.png';
import { Link } from 'react-router-dom';
import { Button} from 'semantic-ui-react';

const  SignUp = (props) => {
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


                <div className="form-sign-up">
                    <div class="row">

                        <div class="col">
                            <input type="text" class="form-control" placeholder="First name" />
                        </div>

                        <div class="col">
                            <input type="text" class="form-control" placeholder="Last name" />
                        </div>

                        
                    </div>
                    <div class="row">
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Email" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Password" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Re enter Password" />
                        </div>
                    </div>

                    <Link to="/dashboard-user"> 
                        <Button  className = 'submit-btn w-100' style={{marginTop:'5%',marginBottom:'10%'}}>S'inscrire</Button>
                    </Link> 
                    <p className="text_policy">En cliquant sur terminer, vous acceptez les conditions générales d'utilisation et la politique de confidentialité de Mon ami Albert.</p>
                </div>
        </div>
    )
}


export default SignUp;
