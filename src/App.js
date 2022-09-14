import "./../src/App.css";
import Persons from "./components/Persons";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import AddPersonForm from "./components/AddPersonForm";
import EditPersonForm from "./components/EditPersonForm";


function App() {
  return (
    <Router>
      <div className="app">
        <header>Users</header>
        <div className="page-body">
          <div>
            <div className="list">  
              <ul>
                <li><NavLink activeclassname="active" to="/"><div>Home</div></NavLink></li>
                <li><NavLink activeclassname="active" to="/add"><div>Add User</div></NavLink></li>
                <li><NavLink activeclassname="active" to="/about"><div>About</div></NavLink></li>
              </ul>
            </div>
          </div>
          <div className="main">
            <Routes>
              <Route exact path="/" element={<Persons />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/add" element={<AddPersonForm />} />
              <Route exact path="/edit/:id" element={<EditPersonForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;