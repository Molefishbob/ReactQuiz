import { useContext, useEffect } from "react";

import Answer from "./Answer";
import ProgressBar from "./ProgressBar";
import { QuizContext } from "../store/quiz-context";

export default function Question({ answerTimer }) {
  const {
    activeQuestion,
    currentPhase,
    onAnswerTimeExpired,
    onShowAnswerResult,
    onNextQuestion,
  } = useContext(QuizContext);

  const time = currentPhase !== "question" ? 1000 : answerTimer;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPhase === "answered") {
        onShowAnswerResult();
      } else if (currentPhase === "question") {
        onAnswerTimeExpired();
      } else {
        onNextQuestion();
      }
    }, time);

    return () => {
      clearTimeout(timer);
    };
  }, [
    activeQuestion,
    onAnswerTimeExpired,
    onShowAnswerResult,
    onNextQuestion,
    answerTimer,
    currentPhase,
    time,
  ]);

  return (
    <div id="question">
      {activeQuestion && (
        <>
          <ProgressBar max={time} question={activeQuestion} />

          <h2>{activeQuestion.text}</h2>
          <ul id="answers">
            {activeQuestion.answers.map((answer, index) => (
              <Answer key={index} text={answer}></Answer>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
