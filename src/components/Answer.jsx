import { useContext } from "react";
import { QuizContext } from "../store/quiz-context";

export default function Answer({ text }) {
  const { onAnswer, selectedAnswer } = useContext(QuizContext);

  let classNames = "";

  if (selectedAnswer) {
    classNames =
      !selectedAnswer.text || selectedAnswer.text === text
        ? selectedAnswer.mode
        : undefined;
  } else {
    classNames = undefined;
  }

  return (
    <li className="answer">
      <button
        disabled={selectedAnswer}
        className={classNames}
        onClick={() => onAnswer(text)}
      >
        {text}
      </button>
    </li>
  );
}
