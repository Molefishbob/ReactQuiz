import Header from "./components/Header";
import QuizBoard from "./components/QuizBoard";
import QuizContextProvider from "./store/quiz-context";

function App() {
  return (
    <>
      <Header />
      <main id="quiz">
        <QuizContextProvider>
          <QuizBoard />
        </QuizContextProvider>
      </main>
    </>
  );
}

export default App;
