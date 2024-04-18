import { useContext, useEffect } from "react";

import { QuizContext } from "../store/quiz-context";
import Question from "./Question";

const TIMER = 10000;

export default function QuizBoard() {
  const { setFirstQuestion, quizDone } = useContext(QuizContext);

  useEffect(() => {
    setFirstQuestion();
  }, [setFirstQuestion]);

  return quizDone ? <p>DONE</p> : <Question answerTimer={TIMER} />;
}
