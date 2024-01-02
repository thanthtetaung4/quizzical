import PropsTypes from "prop-types";
import * as entities from "html-entities";

export default function Question(props) {
  const quiz = props.quiz;
  //   console.log(
  //     quiz.map((q) => {
  //       return q.id, q.answers.map((a, index) => q.id + index);
  //     })
  //   );

  function choose(answerSelected, qID) {
    // console.log("This is quiz", quiz);
    const newQuiz = quiz.map((q) => {
      if (q.id === qID) {
        const newAnswers = q.answers.map((a) => {
          // console.log(answerSelected, a.answer);
          // answerSelected === a.answer && console.log("same");
          return a.answer === answerSelected
            ? { ...a, chosen: true }
            : { ...a, chosen: false };
        });
        q = { ...q, answers: newAnswers };
        return q;
      }
      return q;
    });
    // console.log("This is newQuiz", newQuiz);
    props.setQuiz(newQuiz);
  }
  const mcqQuestions = quiz.map((q) =>
    props.gameState === "playing" ? (
      <div key={q.id} className="quiz-container">
        <h3 className="question">{entities.decode(q.question)}</h3>
        <div className="answer-container" id={q.id}>
          {q.answers.map((a, index) => (
            <div key={index}>
              <input
                type="radio"
                id={q.id + index}
                name={q.id}
                onChange={() => choose(a.answer, q.id)}
              />
              <label htmlFor={q.id + index}>{entities.decode(a.answer)}</label>
            </div>
          ))}
        </div>
        <hr />
      </div>
    ) : (
      <div key={q.id} className="quiz-container">
        <h3 className="question">{entities.decode(q.question)}</h3>
        <div className="answer-container" id={q.id}>
          {q.answers.map((a, index) => (
            <div
              key={index}
              className={a.answer !== q.correct_answer ? "result-radio" : ""}
            >
              <input
                type="radio"
                id={q.id + index}
                name={q.id}
                onChange={() => choose(a.answer, q.id)}
                disabled
                checked={a.chosen}
                style={{ pointerEvents: "none", cursor: "default" }}
              />
              <label
                htmlFor={q.id + index}
                className={
                  a.answer === q.correct_answer
                    ? "correct_answer"
                    : a.chosen
                    ? "wrong_answer"
                    : ""
                }
                style={{ pointerEvents: "none", cursor: "default" }}
              >
                {entities.decode(a.answer)}
              </label>
            </div>
          ))}
        </div>
        <hr />
      </div>
    )
  );
  return (
    <>
      <div className="quiz-container">{mcqQuestions}</div>
    </>
  );
}

Question.propTypes = {
  quiz: PropsTypes.array.isRequired,
  setQuiz: PropsTypes.func.isRequired,
  gameState: PropsTypes.string.isRequired,
};
