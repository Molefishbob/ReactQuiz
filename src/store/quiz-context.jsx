import { createContext, useReducer, useCallback } from "react";

import QUESTIONS from "../questions";

export const QuizContext = createContext({
  questions: [],
  activeQuestionIndex: null,
  activeQuestion: null,
  selectedAnswer: null,
  answers: [],
  currentPhase: null,
  quizDone: false,
  onAnswer: () => {},
  onAnswerTimeExpired: () => {},
  onShowAnswerResult: () => {},
  getQuestion: () => {},
});

function shuffle(ar) {
  let array = [...ar];
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function quizReducer(state, action) {
  if (action.type === "ANSWER" || action.type === "TIME_EXPIRED") {
    return {
      ...state,
      currentPhase: "answered",
      selectedAnswer: {
        text: action.payload.answer,
        mode: "selected",
      },
      answers: [...state.answers, action.payload.answer],
    };
  }
  if (action.type === "NEXT_QUESTION") {
    let i = state.activeQuestionIndex + 1;
    if (i < state.questions.length) {
      return {
        ...state,
        activeQuestionIndex: i,
        currentPhase: "question",
        activeQuestion: {
          ...state.questions[i],
          answers: shuffle(state.questions[i].answers),
        },
      };
    } else {
      return {
        ...state,
        hasAnswered: false,
        quizDone: true,
      };
    }
  }
  if (action.type === "FIRST_QUESTION") {
    if (state.questions.length > 0) {
      return {
        ...state,
        activeQuestionIndex: 0,
        currentPhase: "question",
        activeQuestion: {
          ...state.questions[0],
          answers: shuffle(state.questions[0].answers),
        },
      };
    }
    return undefined;
  }
  if (action.type === "SHOW_ANSWER_RESULT") {
    return {
      ...state,
      currentPhase: "result",
      selectedAnswer: {
        ...state.selectedAnswer,
        mode:
          state.selectedAnswer.text ===
          state.questions[state.activeQuestionIndex].answers[0]
            ? "correct"
            : "wrong",
      },
    };
  }

  return state;
}

export default function QuizContextProvider({ children }) {
  const [quizState, quizStateDispatch] = useReducer(quizReducer, {
    questions: [...shuffle(QUESTIONS)],
    activeQuestionIndex: null,
    activeQuestion: null,
    selectedAnswer: null,
    currentPhase: "waiting",
    quizDone: false,
    answers: [],
  });

  const handleAnswerTimeExpired = useCallback(
    function handleAnswerTimeExpired() {
      quizStateDispatch({
        type: "TIME_EXPIRED",
        payload: { answer: "" },
      });
    },
    []
  );

  function handleAnswer(answer) {
    quizStateDispatch({
      type: "ANSWER",
      payload: {
        answer: answer,
      },
    });
  }
  const handleFirstQuestion = useCallback(function handleFirstQuestion() {
    quizStateDispatch({
      type: "FIRST_QUESTION",
    });
  }, []);

  const handleShowAnswerResult = useCallback(function handleShowAnswerResult() {
    quizStateDispatch({
      type: "SHOW_ANSWER_RESULT",
    });
  }, []);

  const context = {
    activeQuestion: quizState.activeQuestion,
    selectedAnswer: quizState.selectedAnswer,
    answers: quizState.answers,
    quizDone: quizState.quizDone,
    currentPhase: quizState.currentPhase,
    onAnswer: handleAnswer,
    onAnswerTimeExpired: handleAnswerTimeExpired,
    onShowAnswerResult: handleShowAnswerResult,
    setFirstQuestion: handleFirstQuestion,
  };

  return (
    <QuizContext.Provider value={context}>{children}</QuizContext.Provider>
  );
}
