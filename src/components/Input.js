import React from "react";
import "./Input.css";

function Input() {
  return (
    <div className="main">
      
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

export default Input;
