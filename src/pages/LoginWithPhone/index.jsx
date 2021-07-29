import React, { useState , useEffect , useContext } from 'react'
import { Modal } from "react-bootstrap";
import firebase from 'firebase';
import { FirebaseContext } from "../../firebase";
import UserContext from "../../Context/UserContext/UserContext";

import { Container, Divider, Form , Button  } from 'semantic-ui-react'
import Title from '../../components/general/Title/Title'
import ReactCodeInput from 'react-code-input';
import Paragraphe from '../../components/general/Paragraphe/Paragraphe'
import './style.css';
import { Redirect, useHistory } from 'react-router-dom';

const LoginWithPhone = () => {

    const history = useHistory();
    const urlState = history.location.state;
    const firebaseContext = useContext(FirebaseContext);
    const userContext = useContext(UserContext);

    const database = firebaseContext.getData();
    const usersRef = database.ref('users');



    const [ openModal , setOpenModal ] = useState(false);
    const [ indicator , setIndicator ] = useState('');
    const [ phoneNumber , setPhoneNumber ] = useState('');
    const [ signInLoading , setSignInLoading ] = useState(false);
    const [ signInError , setSignInError ] = useState(false);
    const [ verifyOtpLoading , setVerifyOtpLoading ] = useState(false);
    const [ verifyOtpError , setVerifyOtpError ] = useState('');
    const [ OTP , setOTP ] = useState('');
    const [verificationId, setVerificationId] = useState(null);

    useEffect(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container", {
                size: "invisible",
                callback: function(response) {
                    console.log(response);
                    console.log("Captcha Resolved");
                },
                defaultCountry: "MA",
            }
        );
    }, []);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if(indicator?.length > 5){
                setSignInError('Indicatif trop long !');
                return setSignInLoading(false);
            }
            let finalPhoneNumber = `${indicator}${phoneNumber}`
            finalPhoneNumber = finalPhoneNumber.replace(/\s/g, "");

            if(!finalPhoneNumber.includes('+')) finalPhoneNumber = `+${finalPhoneNumber}`;

            setSignInLoading(true);
            const appVerifier = window.recaptchaVerifier;
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verifId = await phoneProvider.verifyPhoneNumber(`${finalPhoneNumber}` , appVerifier);
            setVerificationId(verifId);
            setOpenModal(true);
            setSignInLoading(false)
            
        } catch (error) {
            console.log(error);
            setSignInLoading(false);
            setSignInError(error?.message);
        }
    }

    const handleVerifyOtp = async () => {
        setVerifyOtpError('');
        setVerifyOtpLoading(true);
        if(OTP.length < 6){
            setVerifyOtpLoading(false);
            return setVerifyOtpError("Please enter a valid 6 digit OTP");
        }
        
        try {
    
            const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                OTP
            );
            await firebase.auth().signInWithCredential(credential);
            setVerifyOtpLoading(false);
            setOpenModal(false);
            history.push('/dashboard-user')

        } catch (error) {
            console.log(error);
            setVerifyOtpLoading(false);
            setVerifyOtpError(error?.message);
        }
    }

    const handleOTP = (value) => {
        setOTP(value);
    }

    // if(Object.entries(history.location.state).length < 4){
    //     return <Redirect to= '/eleve-create-account' />
    // }

    return (
        <>
        <div className = 'page-content'>
            <Container>
                <Divider />
                <Divider />
                <Title text="CONNECTE TOI" textcentered centerOverlined />
                <Divider />

                <Form onSubmit = { handleSubmit } className = 'register-form'>
                    <Form.Group unstackable>
                        <Form.Input onChange = {( _ , event) => setIndicator(event.value) } className = 'text-center' placeholder='+Indicatif...' width={4} />
                        <Form.Input onChange = {( _ , event) => setPhoneNumber(event.value) } placeholder='00 00 00 00 00' width={12} />
                    </Form.Group>
                    {!!signInError &&  <p style = {{ marginTop : 10 , color : 'crimson' , textAlign : 'center' }}>{signInError}</p>}
                    <Divider />
                    <Button  loading = {signInLoading} className = 'submit-btn w-100'>Connexion</Button>
                </Form>
            </Container>
        </div>

        <Modal centered show = {openModal} onHide={() => setOpenModal(false)}>
            <Modal.Header closeButton />
            <Modal.Body>
                <Paragraphe style = {{ maxWidth : '100%' }} className = 'text-center' text = {`Merci de confirmer ton numéro de téléphone`} />
                <div className = 'd-flex justity-content-center'>
                    <ReactCodeInput onChange = {handleOTP}  type='text' fields={6} />
                </div>

                {!!verifyOtpError &&  <p style = {{ marginTop : 10 , color : 'crimson' }}>{verifyOtpError}</p>}

                <div style = {{ maxWidth : '60%' , margin : '20px auto' }}>
                    <Button onClick = {handleVerifyOtp} loading = {verifyOtpLoading} className = 'submit-btn w-100'>S'inscrire</Button>
                </div>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default LoginWithPhone
