import "./../src/App.css";
import Persons from "./components/Person";

function App() {
  return (
    <div className="app">
      <header>Application</header>
      <div className="page-body">
        <aside>
          <ul>
            <li>
              <a className="active" href="https://www.google.com/">Home</a>
            </li>
            <li>
              <a href="https://www.google.com/">About</a>
            </li>
            <li>
              <a href="https://www.google.com/">Contact</a>
            </li>
          </ul>
        </aside>
        <div className="main">
          <Persons />
        </div>
      </div>
    </div>
  );
}

export default App;
