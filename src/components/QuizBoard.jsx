import { QuizContext } from "../store/quiz-context";
import Question from "./Question";
import { useContext, useEffect } from "react";
import QUESTIONS from "../questions";

export default function QuizBoard() {
  const { questions, onInit } = useContext(QuizContext);

  useEffect(() => {
    onInit(QUESTIONS);
  }, []);

  return (
    <section id="quiz">
      <Question />
    </section>
  );
}
