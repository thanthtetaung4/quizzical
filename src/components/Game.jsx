import { useEffect, useState } from "react";
import PropsTypes from "prop-types";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function Game(props) {
  const quiz = props.quiz;
  const [loading, setLoading] = useState(true);

  // console.log(quiz);

  useEffect(() => {
    fetchDataWithRetry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    quiz.length > 0 && setLoading(false);
    // quiz.forEach((q) => console.log(q));
  }, [quiz]);

  const fetchDataWithRetry = async (retryCount = 10) => {
    try {
      const response = await fetch(props.api);

      if (!response.ok) {
        // If the response is not successful, throw an error to trigger the catch block
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const arr = data.results.map((d) => {
        const mcq = {
          id: nanoid(),
          question: d.question,
          answers: shuffleArr([
            { answer: d.correct_answer, chosen: false },
            ...d.incorrect_answers.map((a) => ({ answer: a, chosen: false })),
          ]),
          correct_answer: d.correct_answer,
        };
        return mcq;
      });
      props.setQuiz(arr);
    } catch (error) {
      console.error("Error fetching data:", error);

      // Implement retry logic
      if (retryCount > 0) {
        console.log(`Retrying... Attempts left: ${retryCount}`);
        // Retry after 1 second (adjust the delay as needed)
        setTimeout(() => {
          fetchDataWithRetry(retryCount - 1);
        }, 1000);
      } else {
        console.error("Max retry attempts reached. Unable to fetch data.");
      }
    }
  };

  function shuffleArr(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function answerCheck(event) {
    let chosenCount = 0;
    let point = 0;
    event.preventDefault();
    quiz.forEach((q) => {
      q.answers.forEach((a) => {
        if (a.chosen) {
          a.answer === q.correct_answer && point++;
          chosenCount = chosenCount + 1;
        }
      });
    });
    console.log(point);
    if (chosenCount < 5) {
      alert("You need to answer all the question!");
    } else {
      props.setGameState("over");
      props.setPoint(point);
    }
  }

  return (
    <>
      {loading ? (
        <main>
          <h2>Loading</h2>
        </main>
      ) : (
        <main>
          <div className="quiz-form-container">
            <form action="submit" onSubmit={(e) => answerCheck(e)}>
              <Question
                quiz={quiz}
                setQuiz={props.setQuiz}
                gameState={props.gameState}
              />
              <div className="btn-container">
                <button
                  className="submit-btn"
                  onClick={() => {
                    props.setGameState("before");
                    props.setQuiz([]);
                  }}
                >
                  Back
                </button>
                <button className="submit-btn">Check Answer</button>
              </div>
            </form>
          </div>
          <img src="src/assets/big-blob-thingy.svg" className="top-graphic" />
          <img
            src="src/assets/small-blob-thingy.svg"
            alt=""
            className="bot-graphic"
          />
        </main>
      )}
    </>
  );
}

Game.propTypes = {
  api: PropsTypes.string.isRequired,
  setGameState: PropsTypes.func.isRequired,
  setPoint: PropsTypes.func.isRequired,
  quiz: PropsTypes.array.isRequired,
  setQuiz: PropsTypes.func.isRequired,
  gameState: PropsTypes.string.isRequired,
};
