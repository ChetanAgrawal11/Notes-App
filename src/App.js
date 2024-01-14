import "./App.css";
import NoteState from "./Context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { About } from "./components/about";
import { Home } from "./components/home";
import { Navbar } from "./components/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
function App() {
  const [alert, setalert] = useState({ message: " ", type: "" });
  const alertfun = (message, type) => {
    setalert({ mess: message, type: type });
    setTimeout(() => {
      setalert({ message: " ", type: "" });
    }, 2000);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home alertfun={alertfun} />} />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/Login"
                element={<Login alertfun={alertfun} />}
              />
              <Route
                exact
                path="/SignUp"
                element={<SignUp alertfun={alertfun} />}
              />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
