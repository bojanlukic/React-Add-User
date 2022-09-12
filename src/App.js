import "./../src/App.css";
import Persons from "./components/Persons";
import About from "./components/About";
import Contact from "./components/Contact";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <header>Application</header>
        <div className="page-body">
          <div>
            <div className="list">  
              <ul>
                <li><NavLink activeclassname="active" to="/"><div>Home</div></NavLink></li>
                <li><NavLink activeclassname="active" to="about"><div>About</div></NavLink></li>
                <li><NavLink activeclassname="active" to="contact"><div>Contact</div></NavLink></li>
              </ul>
            </div>
          </div>
          <div className="main">
            <Routes>
              <Route exact path="/" element={<Persons />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;