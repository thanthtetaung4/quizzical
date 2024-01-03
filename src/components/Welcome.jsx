import { useState, useEffect } from "react";
import PropsTypes from "prop-types";
import topImage from "../assets/big-blob-thingy.svg";
import bottomImage from "../assets/medium-blob-thingy.svg";

export default function Welcome(props) {
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories")) || []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => {
        setCategories([
          { id: 0, name: "All Categories" },
          ...data.trivia_categories,
        ]);
        localStorage.setItem(
          "categories",
          JSON.stringify([
            { id: 0, name: "All Categories" },
            ...data.trivia_categories,
          ])
        );
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    categories.length > 0 && setLoading(false);
  }, [categories]);

  const cat = categories.map((category) => (
    <option key={category.id} value={category.id} className="custom-select  ">
      {category.name}
    </option>
  ));

  function formSubmit(event) {
    event.preventDefault();
    const difficulty = document.getElementById("difficulty");
    const category = document.getElementById("category");
    category.value === 0
      ? props.setApi(
          `https://opentdb.com/api.php?amount=5&difficulty=${difficulty.value}&type=multiple`
        )
      : props.setApi(
          `https://opentdb.com/api.php?amount=5&category=${category.value}&difficulty=${difficulty.value}&type=multiple`
        );
    props.setGameState("playing");
  }

  return (
    <main className="welcome">
      <h1>Quizzical</h1>
      <p className="game-description">
        Embark on an exhilarating journey of knowledge with Quizzical! Test your
        intellect and learn fascinating facts across various categories. Get
        ready for an engaging quiz experience that combines fun and learning.
      </p>
      <h2>
        Select your preferred Category and Difficulty level. By default, the
        game will include all categories with a medium difficulty setting.
      </h2>

      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <form onSubmit={(e) => formSubmit(e)}>
          <select name="category" id="category" defaultValue={0}>
            {cat}
          </select>
          <br />
          <select name="difficulty" id="difficulty" defaultValue="medium">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <br />
          <button className="submit-btn start">Start</button>
        </form>
      )}
      <img src={topImage} className="top-graphic" />
      <img src={bottomImage} alt="" className="bot-graphic" />
    </main>
  );
}

Welcome.propTypes = {
  setApi: PropsTypes.func.isRequired,
  setGameState: PropsTypes.func.isRequired,
};
