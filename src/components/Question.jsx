import { useContext, useEffect } from "react";

import Answer from "./Answer";
import ProgressBar from "./ProgressBar";
import { QuizContext } from "../store/quiz-context";

export default function Question({ answerTimer }) {
  const {
    activeQuestion,
    hasAnswered,
    onAnswerTimeExpired,
    onShowAnswerResult,
  } = useContext(QuizContext);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (hasAnswered) {
          onShowAnswerResult();
        } else {
          onAnswerTimeExpired();
        }
      },
      hasAnswered ? 3000 : answerTimer
    );

    return () => {
      clearTimeout(timer);
    };
  }, [
    activeQuestion,
    onAnswerTimeExpired,
    onShowAnswerResult,
    answerTimer,
    hasAnswered,
  ]);

  return (
    <div id="question">
      {activeQuestion && (
        <>
          <ProgressBar
            max={hasAnswered ? 3000 : answerTimer}
            question={activeQuestion}
          />

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
