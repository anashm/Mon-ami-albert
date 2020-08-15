import React , { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Message , Checkbox  , Divider} from 'semantic-ui-react';
import {FirebaseContext} from '../../../firebase';
import UserContext from '../../../Context/UserContext/UserContext';


const LoginForm = (props) => {

    const firebase = useContext(FirebaseContext)
    const userContext = useContext(UserContext);

    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('');
    const [ checkBox , setCheckBox ] = useState(false);
    const [error , setError] = useState('');

  

    const handleCheckBox = () => setCheckBox(!checkBox);

    const handleSubmit = (e) => {
        e.preventDefault();

        firebase.loginUser(email,password)
        .then( user => {
            console.log('hnaya1')
            setEmail('')
            setPassword('')
           
           userContext.get_connected_user(user);

            return new Promise( (resolve , reject) => {
                if(user){
                    resolve(user)
                }else{
                    reject('error')
                }
            });

          //userContext.get_user_informations(user)
        }).then( user => {
            console.log('hnaya2')
            const userId = user.user.uid;
                      
            const database = firebase.getData();
            const reference = database.ref('users/'+userId);
         
            
           
            
            reference.once("value", user_information => {
                userContext.get_user_informations(user_information.val());
              
            }).then(  props.navigation.history.push('/dashboard-user'))
           
           
        
        } ) 
        .catch(errors => {
           
                if(errors.message == 'There is no user record corresponding to this identifier. The user may have been deleted.')
                    setError('There is no user record corresponding to this identifier.')
                else 
                    setError(errors.message)
                    
                setEmail('')
                setPassword('')
        })

    }

    const errorMsg = error !== '' ? <span style={{color: 'red',fontWeight: '400'}}>{error}</span> : null
    const btn = (email !== '' && password !== '') ? <Button className = 'submit-btn w-100'>Se connecter</Button> : <Button disabled className = 'submit-btn w-100'>Se connecter</Button>
    return (
        <div className = 'form-container'>
            {errorMsg}
            <Form  onSubmit = { handleSubmit} >
                <Form.Input 
                    type="email"
                    placeholder='Adresse e-mail'
                    value = { email }
                    onChange = { e => setEmail(e.target.value) }
               />
                
                <Form.Input 
                    value = { password }
                    onChange = { e => setPassword(e.target.value) }
                    type = 'password'  
                    placeholder='Mot de passe' 
                    
                />
                
                <div className="login-link-container my-4">
                    <small className = 'login-link'> <Link to = '/'> Mot de passe oublié ? </Link> </small>
                </div>

                {/* <Form.Field >
                    <Checkbox 
                    onClick = { handleCheckBox }
                    value = { checkBox }
                    label='Se souvenir de moi' />
                </Form.Field> */}

                <Message
                success
                header='Form Completed'
                content="You're all signed up for the newsletter"
                />

                <Divider hidden />
                {btn}

                <p className = 'subscribe-text text-center'> <span> Pas encore de compte ? </span>  <small className = 'login-link subscribe-link'> <Link to = '/creat-account'> Inscris-toi </Link> </small> </p>
                
            </Form>
        </div>
    )
}

export default LoginForm;
