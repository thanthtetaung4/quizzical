import PropsTypes from "prop-types";
import Question from "./Question";
import topImage from "../assets/big-blob-thingy.svg";
import bottomImage from "../assets/small-blob-thingy.svg";

export default function Result(props) {
  const quiz = props.quiz;
  return (
    <>
      <main>
        <Question
          quiz={quiz}
          setQuiz={() => props.setQuiz}
          gameState={props.gameState}
        />
        <div className="score-container">
          <h3 className="final-score">
            You scored {props.point}/5 correct answers
          </h3>
          <button
            className="submit-btn"
            onClick={() => {
              props.setQuiz([]);
              props.setGameState("before");
            }}
          >
            Restart
          </button>
        </div>
        <img src={topImage} className="top-graphic" />
        <img src={bottomImage} alt="" className="bot-graphic" />
      </main>
    </>
  );
}

Result.propTypes = {
  point: PropsTypes.number.isRequired,
  quiz: PropsTypes.array.isRequired,
  setQuiz: PropsTypes.func.isRequired,
  gameState: PropsTypes.string.isRequired,
  setGameState: PropsTypes.func.isRequired,
};
