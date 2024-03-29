import React from "react";

import QuizzAnswer from "./QuizzAnswer/QuizzAnswer";
import MathJax from "react-mathjax-preview";
import { MathComponent } from "mathjax-react";

import Latex from "react-latex";

const QuizzQuestion = ({
  title,
  choices,
  correct,
  user_bad_responses,
  questionIndex,
  quizz_questions,
}) => {
  return (
    <div className="quizz-question">
      <h3 className="quizz-question-title">
        {" "}
        {/* MathJax math={title} />  */} <Latex>{String.raw`${title}`}</Latex>{" "}
        {/* <MathComponent tex={title} />  */}{" "}
      </h3>
      {choices.map((choice, index) => {
        return (
          <QuizzAnswer
            key={index}
            found={parseInt(correct[0]) - 1 === index}
            not_found={false}
            text={choice}
            not_the_answer={false}
          />
        );
      })}
      <div className="custom-divider"></div>
    </div>
  );
};

export default QuizzQuestion;
