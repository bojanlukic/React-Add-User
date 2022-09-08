import "./../src/App.css";
import Persons from "./components/Persons";
import About from "./components/About";
import Contact from "./components/Contact";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <header>Application</header>
      <div className="page-body">
        <div>
          <Router>
            <Routes>
              <Route exact path="/" element={<h1>Home</h1>} />
              <Route exact path="about" element={<About/>} />
              <Route exact path="contact" element={<Contact/>} />
            </Routes>

            <div className="list">
          <ul>
            <li ><Link className="active" to="/">Home</Link></li>
            <li><Link to="about">About</Link></li>
            <li><Link to="contact">Contact</Link></li>
          </ul>
        </div>
          </Router>
        </div>
        <div className="main">
          <Persons />
        </div>
      </div>
    </div>
  );
}

export default App;
