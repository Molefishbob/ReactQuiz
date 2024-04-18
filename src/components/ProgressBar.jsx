import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../store/quiz-context";

export default function ProgressBar({ max }) {
  const { hasAnswered, selectedAnswer } = useContext(QuizContext);
  const [remainingTime, setRemainingTime] = useState(max);

  useEffect(() => {
    setRemainingTime(max);
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [hasAnswered, max]);

  return (
    <progress
      className={
        hasAnswered && selectedAnswer.mode == "selected"
          ? "answered"
          : undefined
      }
      value={remainingTime}
      max={max}
    ></progress>
  );
}
