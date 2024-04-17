import Answer from "./Answer";
import ProgressBar from "./ProgressBar";

export default function Question() {
  return (
    <div id="question">
      <ProgressBar value={5} max={10} />
      <h2>Question?</h2>
      <div id="answers">
        <Answer></Answer>
        <Answer></Answer>
        <Answer></Answer>
      </div>
    </div>
  );
}
