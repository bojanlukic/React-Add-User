import "./../src/App.css";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddPersonForm from "./components/AddPersonForm";
import EditPersonForm from "./components/EditPersonForm";
import Navbar from "./components/Navbar";
import Persons from "./components/Persons";

function App() {
  return (
    <Router>
      <div className="app">
        <header>Add User</header>
        <div className="page-body">
          <Navbar />
          <div>
            <Routes>
              <Route  path="/" element={<Persons/>} />
              <Route  path="/add" element={<AddPersonForm />} />
              <Route  path="/about" element={<About />} />
              <Route  path="/edit/:id" element={<EditPersonForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
