import { useContext, useEffect } from "react";

import { QuizContext } from "../store/quiz-context";
import Question from "./Question";
import Summary from "./Summary";

const TIMER = 10000;

export default function QuizBoard() {
  const { setFirstQuestion, currentPhase } = useContext(QuizContext);

  useEffect(() => {
    setFirstQuestion();
  }, [setFirstQuestion]);

  return currentPhase === "done" ? (
    <Summary />
  ) : (
    <main id="quiz">
      <Question answerTimer={TIMER} />
    </main>
  );
}
