import "./styles.css";
import React, { useState, useEffect } from "react";

export default function InspirationalQuotes() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hiding, setHiding] = useState(true);

  function fetchJoke() {
    setLoading(true); // Démarre le chargement
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur dans la requête");
        }
        return response.json();
      })
      .then((data) => {
        setData(data); // Met à jour les données de la blague
        setLoading(false); // Arrête le chargement
        setHiding(true); // Cache la punchline
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }

  // Utilisation de useEffect pour la première blague
  useEffect(() => {
    fetchJoke(); // Appelle la fonction fetchJoke lors du premier rendu
  }, []);

  function handleClick() {
    setHiding(!hiding);
  }

  function showMeMore() {
    fetchJoke();
  }

  let buttons = (
    <>
      <button onClick={handleClick}>{hiding ? "Show" : "Hide"} answer</button>
      <button className="hideButton" onClick={showMeMore}>
        I want more!
      </button>
    </>
  );

  return (
    <>
      <div className="title">
        <h1>RandomJokes</h1>
        <p className="subtitle">using a simple API</p>
      </div>

      <h2>V 2.0</h2>

      <div className="showJoke">
        <h3>{data.setup}</h3>

        {hiding ? <></> : <>{data.punchline}</>}

        <div className="bothButtons">{buttons}</div>
      </div>
      <p className="thanksTo">
        Generated with fun thanks to 'Official-Jokes-API'
      </p>
    </>
  );
}
