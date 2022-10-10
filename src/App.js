import "./../src/App.css";
import Persons from "./components/Persons";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddPersonForm from "./components/AddPersonForm";
import EditPersonForm from "./components/EditPersonForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="app">
        <header>Add User</header>
        <div className="page-body">
          <Navbar />
          <div>
            <Routes>
              <Route exact path="/" element={<Persons />} />
              <Route exact path="/add" element={<AddPersonForm />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/edit/:id" element={<EditPersonForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
