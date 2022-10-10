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
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handlerOnClick = (e) => {
    console.log("Submitujemo podatke za novog korisnika:", state);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date();
    const dateFormated = date.toLocaleString("en-GB", options);

    fetch("http://localhost:3000/PERSON/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...state,
        createdDate: dateFormated,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Uspesno dodata osoba");
        navigate("/");
      })
      .catch((err) => console.log("Greska",err));
  };

  return (
    <div>
      <div className="addForm"> 
      <h1>Add new user</h1>
        <div>
          <label>First Name</label>
        <input
            className="inputs"
            type="text"
            name="firstName"
            value={state.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
        <input
            className="inputs"
            type="text"
            name="lastName"
            value={state.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Usertype</label>
        <select
           className="inputs"
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
        <div>
          <label>City</label>
        <input
            className="inputs"
            type="text"
            name="city"
            value={state.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Adress</label>
        <input
            className="inputs"
            type="text"
            name="adress"
            value={state.adress}
            onChange={handleChange}
            required
          />
        </div>
          <button className="btnAdd" onClick={handlerOnClick}>
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
            </div>
   
  );
}

export default AddPersonForm;
