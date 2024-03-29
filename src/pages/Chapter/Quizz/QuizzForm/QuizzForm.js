import React, { useState, useContext, useEffect, Fragment } from "react";
import { Checkbox, Form, Button, Icon } from "semantic-ui-react";
import "./QuizzForm.scss";
import UserContext from "../../../../Context/UserContext/UserContext";
import { FirebaseContext } from "../../../../firebase";
import QuizzSummary from "./QuizzSummary/QuizzSummary";
import albertHead from "./QuizzSummary/assets/images/albert-quiz.png";
import { useHistory } from "react-router-dom";
import Latex from "react-latex";

const QuizzForm = ({
  multiple,
  title,
  choices,
  correct,
  current_index,
  question_limit,
  course,
  question_length,
  chapter,
  quizz_questions,
}) => {
  const history = useHistory();

  const userContext = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const [foundAnswer, setFoundAnswer] = useState(0);
  const [Response, setResponse] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [checkAnswer, setCheckAnswer] = useState("");
  const [userPoints, setUserPoints] = useState(0);
  const [finished, setFinished] = useState(false);
  const [reset, setReset] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [bad_checked_response_index, set_bad_checked_response_index] = useState(
    null
  );

  const database = firebase.getData();

  useEffect(() => {
    if (userContext.user) {
      //code if realod page pour garder context api values
      const userId = userContext.user.uid;
      const reference = database.ref(
        `users/${userId}/Progression/${userContext.user_informations.level}/${course}/${chapter}`
      );
      const hasProgression =
        userContext["user_informations"]["Progression"][
          `${userContext.user_informations.level}`
        ][`${course}`][`${chapter}`];
      //console.log(user_informations.val())

      if (!hasProgression) {
        //console.log('create a collection');
        reference
          .child(`/progression`)
          .set({
            current_question_index: 0,
            found_questions: 0,
            points: 0,
            finished: false,
            onReset: false,
            badResponses: {
              default: "default",
            },
          })
          .then(() => {
            //console.log('created');
            setFoundAnswer(0);
            setUserPoints(0);
            userContext.update_user_progression(0);
            userContext.update_user_current_question_index(0);
            userContext.update_user_points(0);
          })
          .catch((e) => {
            console.log(e);
            history.push("/404");
          });
      } else {
        //console.log(user_informations.val())
        const {
          current_question_index,
          found_questions,
          points,
          finished,
          onReset,
        } = userContext["user_informations"]["Progression"][
          `${userContext.user_informations.level}`
        ][`${course}`][`${chapter}`]["progression"];
        //console.log( 'from quizz form' , question_limit , current_question_index , found_questions , points , finished);
        userContext.update_user_progression(
          (current_question_index + 1) / question_length
        );
        userContext.update_user_current_question_index(current_question_index);
        userContext.update_user_points(points);
        userContext.update_user_found_answer(found_questions);
        onReset
          ? userContext.update_user_not_found_answer(
              current_question_index + 1 - found_questions
            )
          : userContext.update_user_not_found_answer(
              current_question_index - found_questions
            );
        setFoundAnswer(found_questions);
        setUserPoints(points);
        setReset(onReset);
        userContext.update_user_on_quizz_summary_page(onReset);
        userContext.update_quizz_next_index(current_question_index + 1);

        if (finished) {
          setFinished(finished);
        }
      }
    }
  }, [userContext.user]);

  const handleResetButton = () => {
    //alert('hello')

    const reference = database.ref(
      `users/${userContext.user.uid}/Progression/`
    );
    //console.log(reference)
    reference
      .child(
        `${userContext.user_informations.level}/${course}/${chapter}/progression`
      )
      .update({
        current_question_index: 0,
        found_questions: 0,
        onReset: false,
      })
      .then(() => {
        //update user context progress
        userContext.update_user_progression(0);
        //update current index
        userContext.update_user_current_question_index(0);
        //update user points
        setFoundAnswer(0);
        setReset(false);
        setLoading(false);
        setShowAnswer(false);
        userContext.update_user_check_true_answer(false);
        userContext.update_user_checked_false_answer(false);
        userContext.update_user_found_answer(0);
        userContext.update_user_on_quizz_summary_page(false);
        userContext.update_quizz_next_index(0);
        userContext.update_user_not_found_answer(0);
      })
      .catch((e) => {
        history.push("/404");
        console.log(e);
      });
    //console.log(userContext.user_informations.level)
  };

  const handleClick = (e, titleProps) => {
    const { value, id } = titleProps;
    //console.log(checked , value , e.target.value);
    setResponse(value);
    setAnswer(id);
    setCheckAnswer(value);
    set_bad_checked_response_index(id - 1);
  };

  const handleSubmit = (e) => {
    //console.log('hello');
    e.preventDefault();
    setLoading(true);

    if (current_index <= question_limit) {
      if (answer === correct) {
        setShowAnswer(true);
        userContext.update_user_check_true_answer(true);
        userContext.update_user_checked_false_answer(false);
        userContext.update_quizz_next_index(current_index + 1);
        userContext.update_user_found_answer(foundAnswer + 1);
        //alert('found');
        setFoundAnswer(foundAnswer + 1);

        if (userContext.user) {
          let score = 0;

          if (!finished && (foundAnswer + 1) / question_length <= 0.25) {
            userContext.update_user_points(0);
            setUserPoints(0);
            score = 0;
          }

          if (
            !finished &&
            (foundAnswer + 1) / question_length > 0.25 &&
            (foundAnswer + 1) / question_length <= 0.5
          ) {
            userContext.update_user_points(20);
            setUserPoints(20);
            score = 20;
          }

          if (
            !finished &&
            (foundAnswer + 1) / question_length > 0.5 &&
            (foundAnswer + 1) / question_length <= 0.75
          ) {
            userContext.update_user_points(40);
            setUserPoints(40);
            score = 40;
          }

          if (
            !finished &&
            (foundAnswer + 1) / question_length > 0.75 &&
            (foundAnswer + 1) / question_length <= 1
          ) {
            userContext.update_user_points(60);
            setUserPoints(60);
            score = 60;
          }

          if (finished) {
            score = userPoints;
          }

          if (current_index < question_limit) {
            const reference = database.ref(
              `users/${userContext.user.uid}/Progression/`
            );
            //console.log(reference)
            reference
              .child(
                `${userContext.user_informations.level}/${course}/${chapter}/progression`
              )
              .update({
                current_question_index: current_index + 1,
                found_questions: foundAnswer + 1,
                points: score,
                onReset: false,
              })
              .then(() => {
                setResponse("");
                setShowNextBtn(true);
                setLoading(false);
                userContext.update_user_progression(
                  (current_index + 2) / question_length
                );
                userContext.update_user_on_quizz_summary_page(false);
                setShowNextBtn(true);
              })
              .catch((e) => {
                console.log(e);
                history.push("/404");
              });
            //console.log(userContext.user_informations.level)
          }

          if (current_index === question_limit) {
            if (!finished) {
              //console.log('hello_anas')
              let last_points = score;
              const progress_reference = database.ref(
                `users/${userContext.user.uid}`
              );
              progress_reference.once("value", (points) => {
                last_points += points.val().points;
                //console.log( 'last_points' , last_points,points.val().points)
                const promise = new Promise((resolve, reject) => {
                  resolve(last_points);
                });
                promise
                  .then(() => {
                    userContext.update_user_points_anas(last_points);
                    progress_reference.update({
                      points: last_points,
                    });
                  })
                  .catch((e) => {
                    console.log(e.message);
                    history.push("/404");
                  });
              });
            }

            if (finished) {
              score = userPoints;
            }

            const reference = database.ref(
              `users/${userContext.user.uid}/Progression/`
            );
            //console.log(reference);
            reference
              .child(
                `${userContext.user_informations.level}/${course}/${chapter}/progression`
              )
              .update({
                found_questions: foundAnswer + 1,
                points: score,
                finished: true,
                onReset: true,
              })
              .then(() => {
                setReset(true);
                userContext.update_user_check_true_answer(false);
                userContext.update_user_checked_false_answer(false);
                userContext.update_user_current_question_index(current_index);
                userContext.update_user_on_quizz_summary_page(true);
              })
              .catch((e) => {
                console.log(e.message);
                history.push("/404");
              });
            //console.log(userContext.user_informations.level)
          }
        }
      }

      if (answer !== correct) {
        setShowAnswer(true);
        //alert('Not found');
        userContext.update_user_check_true_answer(false);
        userContext.update_user_checked_false_answer(true);
        userContext.update_quizz_next_index(current_index + 1);
        userContext.update_user_not_found_answer(
          current_index + 1 - foundAnswer
        );

        if (current_index < question_limit) {
          let former_bad_responses = {};
          //console.log('in the false bvalue')

          const bad_response_reference = database.ref(
            `users/${userContext.user.uid}/Progression/${userContext.user_informations.level}/${course}/${chapter}/progression/badResponses`
          );
          bad_response_reference.once("value", (response) => {
            //console.log(  "bad response" , response.val());
            former_bad_responses = {
              ...response.val(),
            };
            former_bad_responses[
              `${bad_checked_response_index}`
            ] = bad_checked_response_index;

            const reference = database.ref(
              `users/${userContext.user.uid}/Progression/`
            );
            //console.log(reference)
            reference
              .child(
                `${userContext.user_informations.level}/${course}/${chapter}/progression`
              )
              .update({
                current_question_index: current_index + 1,
                onReset: false,
                badResponses: former_bad_responses,
              })
              .then(() => {
                setShowNextBtn(true);
                setLoading(false);
                userContext.update_user_progression(
                  (current_index + 2) / question_length
                );
                userContext.update_user_on_quizz_summary_page(false);
                setShowNextBtn(true);
              })
              .catch((e) => {
                console.log(e.message);
                history.push("/404");
              });
            //console.log(userContext.user_informations.level)
          });
        }

        if (current_index === question_limit) {
          //alert('Not found');
          if (userContext.user) {
            if (!finished) {
              //console.log('hello_anas')
              let last_points = userPoints;
              const progress_reference = database.ref(
                `users/${userContext.user.uid}`
              );
              progress_reference.once("value", (points) => {
                last_points += points.val().points;
                //console.log( 'last_points' , last_points,points.val().points)
                const promise = new Promise((resolve, reject) => {
                  resolve(last_points);
                });
                promise
                  .then(() => {
                    userContext.update_user_points_anas(last_points);
                    progress_reference.update({
                      points: last_points,
                    });
                  })
                  .catch((e) => {
                    console.log(e.message);
                    history.push("/404");
                  });
              });
            }

            let former_bad_responses = null;
            const bad_response_reference = database.ref(
              `users/${userContext.user.uid}/Progression/${userContext.user_informations.level}/${course}/${chapter}/progression/badResponses`
            );
            bad_response_reference.once("value", (response) => {
              former_bad_responses = {
                ...response.val(),
              };
              former_bad_responses[
                `${bad_checked_response_index}`
              ] = bad_checked_response_index;

              const reference = database.ref(
                `users/${userContext.user.uid}/Progression/`
              );
              reference
                .child(
                  `${userContext.user_informations.level}/${course}/${chapter}/progression`
                )
                .update({
                  finished: true,
                  onReset: true,
                  badResponses: former_bad_responses,
                })
                .then(() => {
                  userContext.update_user_current_question_index(current_index);
                  userContext.update_user_check_true_answer(false);
                  userContext.update_user_checked_false_answer(false);
                  userContext.update_user_on_quizz_summary_page(true);
                  setReset(true);
                })
                .catch((e) => {
                  console.log(e.message);
                  history.push("/404");
                });
            });
          }
        }
      }
    }
  };

  const handleNextButtonClick = () => {
    setResponse("");
    setShowAnswer(false);
    userContext.update_user_check_true_answer(false);
    userContext.update_user_checked_false_answer(false);
    userContext.update_user_current_question_index(current_index + 1);
    setShowNextBtn(false);
  };

  return (
    <Fragment>
      {!reset && (
        <div className="quizz-form-container">
          <div className="quizz-title-container">
            <div className="img-container">
              <img src={albertHead} alt="" />
            </div>
            <h2 className="quizz-form-title">
              {" "}
              <Latex>{String.raw`${title}`}</Latex>{" "}
            </h2>
          </div>

          <Form
            loading={loading}
            className="quizz-form"
            onSubmit={handleSubmit}
          >
            {choices.length > 0
              ? choices.map((choice, index) => {
                  if (showAnswer) {
                    return (
                      <div
                        className={`response-container ${
                          correct == index + 1 ? "border-green" : "border-red"
                        } `}
                        key={choice}
                      >
                        <Form.Field
                          control={Checkbox}
                          name={choice}
                          id={`${index + 1}`}
                          label={
                            <label>
                              {" "}
                              <Latex>{String.raw`${choice}`}</Latex>{" "}
                            </label>
                          }
                          checked={checkAnswer === choice}
                          value={choice}
                        />
                      </div>
                    );
                  } else {
                    if (Response.length < 0) {
                      return (
                        <div className={`response-container `} key={choice}>
                          <Form.Field
                            control={Checkbox}
                            name={choice}
                            id={`${index + 1}`}
                            label={
                              <label>
                                {" "}
                                <Latex>{String.raw`${choice}`}</Latex>{" "}
                              </label>
                            }
                            onClick={(e, data) => handleClick(e, data)}
                            checked={Response === choice}
                            value={choice}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div className={`response-container `} key={choice}>
                          <Form.Field
                            control={Checkbox}
                            name={choice}
                            id={`${index + 1}`}
                            label={
                              <label>
                                {" "}
                                <Latex>{String.raw`${choice}`}</Latex>{" "}
                              </label>
                            }
                            onClick={(e, data) => handleClick(e, data)}
                            checked={Response === choice}
                            value={choice}
                          />
                        </div>
                      );
                    }
                  }
                })
              : null}

            {!showNextBtn ? (
              <div className="quizz-submit-btn">
                <Button
                  type="submit"
                  disabled={Response.length === 0 ? true : false}
                >
                  Valider
                </Button>
              </div>
            ) : (
              <div className="quizz-submit-btn">
                <Button type="button" onClick={handleNextButtonClick}>
                  {" "}
                  Suivant <Icon name="long arrow alternate right" />{" "}
                </Button>
              </div>
            )}
          </Form>
        </div>
      )}

      {reset && (
        <Fragment>
          <QuizzSummary
            finished={finished}
            img={albertHead}
            quizz_questions={quizz_questions}
            found_answer={foundAnswer}
            course={course}
            chapter={chapter}
          />
          <div className="quizz-reset-btn">
            <button type="button" onClick={handleResetButton}>
              {" "}
              <span style={{ marginRight: "5px" }}> Recommencer </span>{" "}
              <Icon name="redo" />{" "}
            </button>
            <button
              type="button"
              onClick={() => history.push("/dashboard-user")}
            >
              {" "}
              Découvrez d’autres cours{" "}
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default QuizzForm;
