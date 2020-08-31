import React , {useContext , useState , useEffect} from 'react';
import './QuizzSummary.scss';

import { useLottie } from "lottie-react";

import albert from './assets/images/Logo.png';
import albertLottie from '../../../../../animation/homepage/alber-welcome.json';
import lottieTrophee from './assets/lottie/tropheeLottie.json';

import test from './test';
import UserContext from '../../../../../Context/UserContext/UserContext';

import QuizzQuestion from './QuizzQuestion/QuizzQuestion';

import { Button , Icon , Popup , Message } from 'semantic-ui-react'


const QuizzSummary = ({ quizz_questions , found_answer , chapter , img }) => {

    const userContext = useContext(UserContext);

    const [ message , SetMessage ] = useState('');

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
    const { View } = useLottie(options);

    const congratulations = {
        seconde: {
            first: `Le passage en première n'est pas encore gagné, mais ne crains rien je suis avec toi !`,
            second : `Est ce vraiment ton meilleur travail ? Je suis ceratin que tu peux mieux faire !`,
            third: `Tiens tiens, un majorant se cache en toi !`,
            fourth: `Bien joué ! Tu serai pas majorant comme par hasard ?`
        },
        première: {
            first: `Le passage en terminale n'est pas encore gagné, mais ne crains rien je suis avec toi !`,
            second : `N’abandonne pas avant d'avoir mieux réussi, je suis avec toi !`,
            third: `Tiens tiens, un majorant se cache en toi !`,
            fourth: `Bien joué ! Tu serai pas majorant comme par hasard ?`
        },
        terminale: {
            first: `Pour le moment, on oublie la prépa !`,
            second : `Est ce vraiment ton meilleur travail ? Je suis ceratin que tu peux mieux faire !`,
            third: `Si tu continue ça, la mention très bien est à toi !`,
            fourth: `Bien joué ! la mention très bien est dans la poche.`
        },
        maths_sup: {
            first: `Bon, le passage en Spé n'est pas gagné, mais ne crains rien , je suis avec toi !`,
            second : `Est ce vraiment ton meilleur travail ? Je suis ceratin que tu peux mieux faire !`,
            third: `Le passage en étoile n'est pas encore d'actualité mais tu es sur la bonne voie !`,
            fourth: `Bien joué ! si tu continues comme ça, la classe étoile est dans la poche.`
        },
        ecs_1_ece_1_ect1: {
            first: `Bon, le passage en carré n'est pas gagné, mais ne crains rien je suis avec toi`,
            second : `Est ce vraiment ton meilleur travail ? Je suis ceratin que tu peux mieux faire !`,
            third: `Intégrer HEC n'est pas encore d'actualité mais tu es sur le bon chemin !`,
            fourth: `Bien joué ! si tu continues comme ça, HEC est dans la poche.`
        },
        maths_spe:{
            first: `La 5/2 n'est pas un si mauvais plan, mais ne crains rien, je suis avec toi !`,
            second : `Les E3A c'est déjà dans la poche mais tu peux faire mieux !`,
            third: `Si tu continues comme ça, Les mines ou centrale t'attendent les bras ouverts !`,
            fourth: `Bien joué ! honnêtement si tu rates l'X/ENS, tu ne seras plus mon ami !`
        },
        ecs2_ece_2_ect2 : {
            first: `Bon, cuber n'est pas un si mauvais plan, mais ne crains rien, je suis avec toi !`,
            second : `Les écricome c 'est déjà dans la poche mais tu peux faire mieux !`,
            third: `Si tu continues comme ça, l'EDHEC et l'EM t'attendent les bras ouverts !`,
            fourth: `Bien joué, honnêtement si tu rates une parisienne tu ne seras plus mon ami!`
        }
    }

    const handleMessage = ( level , question_length ) => {

        const classes = [ 
            'seconde ',
            'première',
            'terminale',
            'Maths sup',
            'ECS 1 -ECE 1- ECT1',
            'Maths spe',
            'ECS2 - ECE 2 - ECT2'
        ]

        classes.forEach( classElement => {
            if(level.trim().toLowerCase().includes(classElement.trim().toLowerCase())){

                let newLevel = level.trim().toLowerCase().replace(/\s+/g, '').split('-').join('_');
    
                if(  ( ((userContext.user_found_answer)/question_length) <= 0.25) ){
                    SetMessage(congratulations[newLevel].first)
                }

                if( (((userContext.user_found_answer)/question_length) > 0.25 && ((userContext.user_found_answer)/question_length) <= 0.5 )){
                    SetMessage(congratulations[newLevel].second)
                }


                if( (((userContext.user_found_answer)/question_length) > 0.5 && ((userContext.user_found_answer)/question_length) <= 0.75) ){
                    SetMessage(congratulations[newLevel].third)
                }

                if(  (((userContext.user_found_answer)/question_length) > 0.75 && ((userContext.user_found_answer)/question_length) <= 1 )){
                    SetMessage(congratulations[newLevel].fourth)
                }
    
            }

        } )


    }

    useEffect(() => {
        handleMessage(userContext.user_informations.level , userContext.quizz_questions);
    } , [ userContext.user_found_answer , userContext.quizz_questions]);



    return (
        <div className = 'quizz-summary-container'>

            {console.log(message)}

            <div className="quizz-congratulation-container sm-shadow">
                { message.length > 1 && <Message visible warning className = 'text-center'>  { message } </Message>}
                

                <h2 className="congratulation-title"> Bravo </h2>
                <div className="congratulation-images-container">
                    <div className="albert-img-container">
                       {/*  <img src={albert} alt="" className="albert-img"/> */}

                    </div>
                    <div className="congratulation-trophee">
                        {View}
                    </div>
                    <div className="empty">
                    </div>
                </div>
                <p className="quizz-text-completed"> Vous avez complété le Quiz </p>
                <p className="gained-points-text"> Vous avez gagné <span className = 'text-green'> { userContext.user_points } points </span> </p>

            </div>

            <div className="quizz-result-title-container">
                <h2> Résultat du Quiz </h2>
            </div>

            <div className="quizz-result-summary-container sm-shadow">
                <p className="quizz-end-text">Vous avez terminé le questionnaire <span className = 'text-bold'> Quiz :  {chapter} </span> </p>
                <p className="score-text"> Votre Score est de <span className = 'text-green'> {found_answer} sur {userContext.quizz_questions} </span> </p>
                <div className="custom-divider"/>
                <p className="answers-text"> Vos réponses sont en gras, les bonnes réponses sont en vert. </p>

                <div className="answers-container">
                    { quizz_questions.map(quizz_question => (
                        <QuizzQuestion  title = { quizz_question[0].question } choices = { quizz_question[0].choices } correct = { quizz_question[0].correct } />
                    )) }

                </div>
            </div>

            
        </div>
    )
}

export default QuizzSummary
