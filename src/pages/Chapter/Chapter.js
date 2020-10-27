import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../Context/UserContext/UserContext";

import courseImg from "./assets/images/Cours.png";
import quizzImg from "./assets/images/Quiz.png";
import exercisesImg from "./assets/images/exercices.png";
import Courses from "./Courses/Courses";
import Exrecises from "./Exercises/Exercises";
import Quizz from "./Quizz/Quizz";
import ChapterButton from "./ChapterButton/ChapterButton";
import { Breadcrumb } from "semantic-ui-react";
import { Link } from "react-router-dom";
import AOS from "aos";

// import { Icon } from 'semantic-ui-react';

import "./style/Chapter.scss";

import { animateScroll as scroll } from "react-scroll";

const Chapter = ({ match }) => {
  const userContext = useContext(UserContext);
  // const history = useHistory();
  const Scroll = scroll;

  /* Component data */
  //console.log(match)
  /* Component state */
  const [coursesContent, setCoursesContent] = useState(true);
  const [quizzContent, setQuizzContent] = useState(false);
  const [exercisesContent, setExercisesContent] = useState(false);
  const [courses_memoized, set_courses_memoized] = useState(null);
  const [active, setActive] = useState("course");
  const [showBackTop, setShowBackTop] = useState(true);

  /*--- Component functions  ---*/
  const handleChapterCoursesButton = () => {
    setCoursesContent(true);
    setQuizzContent(false);
    setExercisesContent(false);
    setActive("course");
    setShowBackTop(true);
  };

  const handleChapterQuizzButton = () => {
    setQuizzContent(true);
    setCoursesContent(false);
    setExercisesContent(false);
    setActive("quizz");
    setShowBackTop(false);
    //history.push(`/quizz/${match.params.matieres}/${match.params.chapitre}`);
  };

  const handleChapterExercisesButton = () => {
    setExercisesContent(true);
    setCoursesContent(false);
    setQuizzContent(false);
    setActive("exercise");
    setShowBackTop(false);
  };

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });

    const chapter_features_container = document.querySelector(
      ".chapter-features-container"
    );
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setShowBackTop(true);
        } else {
          setShowBackTop(false);
        }
      });
    }, {});
    observer.observe(chapter_features_container);
  }, [userContext.user]);

  return (
    <section className="container chapter-page-container">
      <div className="breadcrumb-container">
        <Breadcrumb>
          <Breadcrumb.Section className="breadcrumb-home">
            {" "}
            <Link to="/"> Accueil </Link>{" "}
          </Breadcrumb.Section>
          <Breadcrumb.Divider
            className="breadcrumb-home-chevron"
            icon="right chevron"
          />
          <Breadcrumb.Section className="breadcrumb-evolution">
            {" "}
            <Link to={`/dashboard-user`}> Mon parcours </Link>{" "}
          </Breadcrumb.Section>
          <Breadcrumb.Divider
            className="breadcrumb-evolution-chevron"
            icon="right chevron"
          />
          <Breadcrumb.Section>
            {" "}
            <Link to={`/chapitres/${match.params.matieres}`}>
              {" "}
              {match.params.matieres}{" "}
            </Link>{" "}
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section active>
            {" "}
            {match.params.chapitre}{" "}
          </Breadcrumb.Section>
        </Breadcrumb>
      </div>
      {/* <div className="chapter-title-container">
                <h2 className="chapter-title"> Les différentes écritures d'un nombre  </h2>
            </div> */}

      <div className="chapter-features-container">
        <ChapterButton
          name="Course"
          tab={active}
          imgSrc={courseImg}
          clicked={handleChapterCoursesButton}
        />
        <ChapterButton
          name="Quizz"
          tab={active}
          imgSrc={quizzImg}
          clicked={handleChapterQuizzButton}
        />
        <ChapterButton
          name="Exercise"
          tab={active}
          imgSrc={exercisesImg}
          clicked={handleChapterExercisesButton}
        />
      </div>

      <div className="chapter-content">
        {coursesContent && (
          <div className="chapter-exercises-container">
            {" "}
            <Courses
              urlParams={match.params}
              courses_memoized={courses_memoized}
              memoized={(courses) => set_courses_memoized(courses)}
            />{" "}
          </div>
        )}
        {quizzContent && (
          <div className="chapter-courses-container">
            {" "}
            <Quizz
              chapitre={match.params.chapitre}
              matiere={match.params.matieres}
            />{" "}
          </div>
        )}
        {exercisesContent && (
          <div className="chapter-quizz-container">
            {" "}
            <Exrecises urlParams={match.params} exercises="exercices" />{" "}
          </div>
        )}
      </div>

      {showBackTop && (
        <button className="back-top" onClick={() => Scroll.scrollToTop()}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="28"
            viewBox="0 0 12 28"
          >
            <title>long-arrow-up</title>
            <path d="M11.953 7.703c-0.078 0.172-0.25 0.297-0.453 0.297h-3.5v19.5c0 0.281-0.219 0.5-0.5 0.5h-3c-0.281 0-0.5-0.219-0.5-0.5v-19.5h-3.5c-0.203 0-0.375-0.109-0.453-0.297s-0.047-0.391 0.078-0.547l5.469-6c0.094-0.094 0.219-0.156 0.359-0.156v0c0.141 0 0.281 0.063 0.375 0.156l5.547 6c0.125 0.156 0.156 0.359 0.078 0.547z"></path>
          </svg>
        </button>
      )}
    </section>
  );
};

export default Chapter;
