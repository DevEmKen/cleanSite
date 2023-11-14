import React, { useRef, useEffect, useState } from "react";
//styles
import "./styles/app.scss";
//components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import LibraryButton from "./components/LibraryButton";
//song list
import musicList from "./util";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
