import React , {useContext} from 'react';
import './QuizzSummary.scss';

import { useLottie } from "lottie-react";

import albert from './assets/images/Logo.png';
import albertLottie from '../../../../../animation/homepage/alber-welcome.json';
import lottieTrophee from './assets/lottie/tropheeLottie.json';

import test from './test';
import UserContext from '../../../../../Context/UserContext/UserContext';

const QuizzSummary = () => {

    const userContext = useContext(UserContext);

    const options = {
        animationData: lottieTrophee,
        loop: true,
        autoplay: true
    };
    

    const alberLottieOption = {
        animationData: albertLottie,
        loop: true,
        autoplay: true
    }

    const { albetLootionAnimation } = useLottie(alberLottieOption);
    const { View } = useLottie(alberLottieOption);




    return (
        <div className = 'quizz-summary-container'>

            <div className="quizz-congratulation-container sm-shadow">
                <h2 className="congratulation-title"> Bravo </h2>
                <div className="congratulation-images-container">
                    <div className="albert-img-container">
                       {/*  <img src={albert} alt="" className="albert-img"/> */}
                       <test />

                    </div>
                    <div className="congratulation-trophee">
                        {View}
                    </div>
                    <div className="empty"></div>
                </div>
                <p className="quizz-text-completed"> Vous avez complété le Quiz </p>
                <p className="gained-points-text"> Vous avez gagné <span className = 'text-green'> { userContext.user_points } points </span> </p>
            </div>

            <div className="quizz-result-title-container">
                <h2> Résultat du Quiz </h2>
            </div>

            <div className="quizz-result-summary-container sm-shadow">
                <p className="quizz-end-text">Vous avez terminé le questionnaire Quiz : Chapitre … </p>
            </div>

            
        </div>
    )
}

export default QuizzSummary
