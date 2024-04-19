import Header from "./components/Header";
import QuizBoard from "./components/QuizBoard";
import QuizContextProvider from "./store/quiz-context";

function App() {
  return (
    <>
      <Header />
      <QuizContextProvider>
        <QuizBoard />
      </QuizContextProvider>
    </>
  );
}

export default App;
