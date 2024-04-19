import { createContext, useReducer, useCallback } from "react";

import QUESTIONS from "../questions";

export const QuizContext = createContext({
  questions: [],
  activeQuestion: null,
  selectedAnswer: null,
  answers: [],
  currentPhase: null,
  quizDone: false,
  onAnswer: () => {},
  onAnswerTimeExpired: () => {},
  onShowAnswerResult: () => {},
  setFirstQuestion: () => {},
  onNextQuestion: () => {},
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
      currentPhase: action.type === "ANSWER" ? "answered" : "result",
      selectedAnswer: {
        text: action.payload.answer,
        mode: action.type === "ANSWER" ? "selected" : "wrong",
      },
      answers: [
        ...state.answers,
        {
          isCorrect:
            action.payload.answer ===
            state.questions[
              state.answers.length > 0 ? state.answers.length - 1 : 0
            ].answers[0]
              ? true
              : false,
          answer: action.payload.answer,
        },
      ],
    };
  }
  if (action.type === "NEXT_QUESTION") {
    let i = state.answers.length;
    if (i < state.questions.length) {
      return {
        ...state,
        selectedAnswer: null,
        currentPhase: "question",
        activeQuestion: {
          ...state.questions[i],
          answers: shuffle(state.questions[i].answers),
        },
      };
    } else {
      return {
        ...state,
        currentPhase: "done",
      };
    }
  }
  if (action.type === "FIRST_QUESTION") {
    if (state.questions.length > 0) {
      return {
        ...state,
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
          state.questions[state.answers.length - 1].answers[0]
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
        payload: { answer: null },
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

  const handleNextQuestion = useCallback(function handleNextQuestion() {
    quizStateDispatch({
      type: "NEXT_QUESTION",
    });
  }, []);

  const handleShowAnswerResult = useCallback(function handleShowAnswerResult() {
    quizStateDispatch({
      type: "SHOW_ANSWER_RESULT",
    });
  }, []);

  const context = {
    questions: quizState.questions,
    activeQuestion: quizState.activeQuestion,
    selectedAnswer: quizState.selectedAnswer,
    answers: quizState.answers,
    quizDone: quizState.quizDone,
    currentPhase: quizState.currentPhase,
    onAnswer: handleAnswer,
    onAnswerTimeExpired: handleAnswerTimeExpired,
    onShowAnswerResult: handleShowAnswerResult,
    setFirstQuestion: handleFirstQuestion,
    onNextQuestion: handleNextQuestion,
  };

  return (
    <QuizContext.Provider value={context}>{children}</QuizContext.Provider>
  );
}
