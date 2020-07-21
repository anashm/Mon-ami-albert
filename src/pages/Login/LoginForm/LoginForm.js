import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Message , Checkbox  , Divider} from 'semantic-ui-react';


const LoginForm = () => {

    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('');
    const [ checkBox , setCheckBox ] = useState(false);


    const handleEmail = e => setEmail(e.target.value);
    const handlePassword = e => setPassword(e.target.value);
    const handleCheckBox = () => setCheckBox(!checkBox);

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className = 'form-container'>
            <Form  onSubmit = { e => handleSubmit(e) } >
                <Form.Input 
                    required
                    placeholder='Adresse e-mail'
                    value = { email }
                    onChange = { e => handleEmail(e) }
/*                     error={{ content: 'Please enter your e-mail', pointing: 'below' }} 
 */                />
                
                <Form.Input 
                    value = { password }
                    onChange = { e => handlePassword(e) }
                    type = 'password'  
                    placeholder='Mot de passe' 
                    required
                />
                
                <div className="login-link-container my-4">
                    <small className = 'login-link'> <Link to = '/'> Mot de passe oublié ? </Link> </small>
                </div>

                <Form.Field >
                    <Checkbox 
                    onClick = { handleCheckBox }
                    value = { checkBox }
                    label='Se souvenir de moi' />
                </Form.Field>

                <Message
                success
                header='Form Completed'
                content="You're all signed up for the newsletter"
                />

                <Divider hidden />
                <Button className = 'submit-btn w-100'>Se connecter</Button>

                <p className = 'subscribe-text text-center'> <span> Pas encore de compte ? </span>  <small className = 'login-link subscribe-link'> <Link to = '/'> Inscris-toi </Link> </small> </p>
                
            </Form>
        </div>
    )
}

export default LoginForm;
