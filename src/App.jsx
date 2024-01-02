import { useState } from "react";
import Welcome from "./components/Welcome";
import Game from "./components/Game";
import Result from "./components/Result";

export default function App() {
  const [gameState, setGameState] = useState("before");
  const [api, setApi] = useState(
    "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple&encode=base64"
  );
  const [quiz, setQuiz] = useState([]);
  const [point, setPoint] = useState(0);

  return (
    <>
      {gameState === "before" ? (
        <Welcome setApi={setApi} setGameState={setGameState} />
      ) : gameState === "playing" ? (
        <Game
          api={api}
          gameState={gameState}
          setGameState={setGameState}
          setPoint={setPoint}
          quiz={quiz}
          setQuiz={setQuiz}
        />
      ) : (
        <Result
          point={point}
          quiz={quiz}
          setQuiz={setQuiz}
          gameState={gameState}
          setGameState={setGameState}
        />
      )}
    </>
  );
}
