import React from "react";

import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
