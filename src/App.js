import React from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const [word, setWord] = useState("");
  // const API_URL = "https://api.datamuse.com/words?rel_syn=";
  // const API_URL = "http://127.0.0.1:8080/words?rel_syn=";
  const API_URL = "http://mern.sghauri.com?rel_syn=";
  // const API_URL = "https://modern-crabs-sink-174-170-171-75.loca.lt/words?rel_syn=";
  const [result, setResult] = useState([]);

  function handleChange(e) {
    setWord(e.target.value);
  }

  function fetchSynonyms(input) {
    setWord(input);
    const full_url = API_URL + input;
    console.log(full_url);
    fetch(full_url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Prints result from `response.json()` in getRequest

        setResult(data);
      })
      .catch((error) => console.error(error));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchSynonyms(word);
  }

  return (
    <div className="App">
      <div className="App-header">
        <form onSubmit={handleSubmit}>
          <label htmlFor="entryWord">Enter Word</label>
          <input id="entryWord" onChange={handleChange} value={word}></input>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          <br></br>
          <br></br>
          <br></br>
          {result.length !== 0 ? (
            <div>
              <label>The results in order are as follows</label>
              <ol>
                {result.map((i, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      return fetchSynonyms(i.word);
                    }}
                  >
                    {i.word}
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
