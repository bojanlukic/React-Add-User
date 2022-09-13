import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../components/AddPersonForm.css'

function AddPersonForm() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    userType: "",
    city: "",
    adress: "",
  });

  const handleChange = (e) => {
    // univerzalni handler za onChange event koji funkcionise za sva input polja, textarea i checkbox polja.
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("Submitujemo podatke za novog korisnika:", state);
    
      
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const newDate = new Date(Date.now());
    const dateFormated = newDate.toLocaleString("en-GB",options);

    axios
      .post("http://localhost:3000/PERSON/", {
        ...state,
        createdDate: dateFormated
      })
      .then((response) => {
        console.log("Uspesno dodat novi korisnik");
        // refresh();
        navigate("/");
      })
      .catch((err) => console.log("Greska pri ucitavanju URL-a"));
  };

  return (
    <div className="app">
      <h1>Add new person</h1>
      <form onSubmit={submit}>
        <div className="field">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={state.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={state.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label>Usertype</label>
          <select
            name="userType"
            value={state.userType}
            onChange={handleChange}
            required
          >
            <option value="">--Choose Usertype--</option>
            <option value="Internship">Internship</option>
            <option value="Employed">Employed</option>
            <option value="Unemployed">Unemployed</option>
          </select>
        </div>
        <div className="field">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={state.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label>Adress</label>
          <input
            type="text"
            name="adress"
            value={state.adress}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add user</button>
      </form>
    </div>
  );
}

export default AddPersonForm;
