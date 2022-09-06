import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar() {
  const [text, setText] = useState('');

  const submitHandler= (e) => {
    e.preventDefault();

  }

  return (

    <div className="input">
     <form onSubmit={submitHandler}> 
      <label>Name</label>
      <input onChange={(e)=>(setText(e.target.value))} type="text" />
      <label>User Type</label>
      <select onChange={(e) => (setText(e.target.value))}>
        <option>Internship</option>
        <option>Employed</option>
        <option>Unemployed</option>
      </select>
        <button type="submit">Search</button>
        </form>
    </div>
  );
}

export default SearchBar;
