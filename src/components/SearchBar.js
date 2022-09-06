import React from "react";
import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="input">
      
      <label>Name</label>
      <input type="text" />
      <label>User Type</label>
      <select>
        <option>Praksa</option>
        <option>Zaposlen</option>
        <option>Nezaposlen</option>
      </select>
        <button>Search</button>
          
    </div>
  );
}

export default SearchBar;
