import { useContext } from "react";

import endImage from "../assets/quiz-complete.png";
import { QuizContext } from "../store/quiz-context";

export default function Summary() {
  const { answers, questions } = useContext(QuizContext);

  const skippedAnswers = answers.filter((a) => a.answer === null);
  const correctAnswers = answers.filter((a) => a.isCorrect);

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / answers.length) * 100
  );
  const correctAnswersShare = Math.round(
    (correctAnswers.length / answers.length) * 100
  );
  const incorrectAnswersShare =
    100 - (correctAnswersShare + skippedAnswersShare);

  return (
    <div id="summary">
      <img src={endImage} alt="Quiz Trophy" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{incorrectAnswersShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {answers.map((answer, index) => {
          let cssClass = "user-answer";

          if (answer.answer === null) {
            cssClass += " skipped";
          } else if (answer.isCorrect) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }

          return (
            <li key={answer.answer}>
              <h3>{index + 1}</h3>
              <p className="question">{questions[index].text}</p>
              <p className={cssClass}>{answer.answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
