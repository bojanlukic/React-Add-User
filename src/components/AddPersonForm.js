import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/AddPersonForm.css";

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

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(Date.now());
    const dateFormated = date.toLocaleString("en-GB", options);


    fetch('http://localhost:3000/PERSON/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...state,
        createdDate: dateFormated
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log('Uspesno dodata osoba')
        navigate('/')
      
      })
    .catch(err => console.log('Greska'))
  
  }

    /*axios
      .post("http://localhost:3000/PERSON/", {
        ...state,
        createdDate: dateFormated
      })
      .then((response) => {
        console.log("Uspesno dodat novi korisnik");
        // refresh();
        navigate("/");
      })
      .catch((err) => console.log("Greska pri ucitavanju URL-a"));*/
 

  return (
    <div className="app">
      <h1>Add new user</h1>
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
        <div className="twoButtons">
          <button className="btnAdd" type="submit">
            Add user
          </button>
          <button
            className="btnCancel"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPersonForm;
