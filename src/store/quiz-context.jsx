import { createContext, useReducer } from "react";

export const QuizContext = createContext({
  questions: [],
  activeQuestion: null,
  answers: [],
  onAnswer: () => {},
  onAnswerTimeExpired: () => {},
  onInit: () => {},
});

function quizReducer(state, action) {
  if (action.type === "INIT") {
    return {
      questions: [],
      activeQuestionId: null,
      answers: [],
      ...action.payload,
    };
  }
  if (action.type === "TIME_EXPIRED") {
    return { ...state };
  }
  if (action.type === "ANSWER") {
    return { ...state };
  }

  return state;
}

export default function QuizContextProvider({ children }) {
  const [quizState, quizStateDispatch] = useReducer(quizReducer, {
    questions: [],
    activeQuestionId: null,
    answers: [],
  });

  function handleAnswerTimeExpired() {
    quizStateDispatch({
      type: "TIME_EXPIRED",
    });
  }

  function handleAnswer(answer) {
    quizStateDispatch({
      type: "ANSWER",
      payload: {
        answer: answer,
      },
    });
  }

  function handleInit(questions) {
    quizStateDispatch({
      type: "INIT",
      payload: {
        questions,
      },
    });
  }

  const context = {
    questions: quizState.questions,
    activeQuestionId: quizState.activeQuestionId,
    answers: quizState.answers,
    onAnswer: handleAnswer,
    onAnswerTimeExpired: handleAnswerTimeExpired,
    onInit: handleInit,
  };

  return (
    <QuizContext.Provider value={context}>{children}</QuizContext.Provider>
  );
}
