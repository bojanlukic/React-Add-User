import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/EditPersonForm.css";

function EditPersonForm() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    userType: "Unemployed",
    city: "",
    adress: "",
  });
  
  useEffect(() => {
    if (parseInt(id) >= 0) {
      fetchUserData(id);
    }
  }, [id]);

  
  const fetchUserData = (id) => {
    fetch(`http://localhost:3000/PERSON/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && parseInt(data.id) >= 0 && data.firstName) {
          setState({
            ...state,
            ...data,
          });
        }
      })
      .catch((err) => console.log("Greska pri ucitavanju URL-a", err));
  };


  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handlerOnClick = (e) => {
    e.preventDefault();
    console.log("Submitujemo podatke za izmenu korisnika:", state);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date();
    const dateFormated = date.toLocaleString("en-GB", options);

    fetch(`http://localhost:3000/PERSON/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...state,
        ModifiedDate: dateFormated,
      }),
    })
      .then((res) => {
        console.log(`Uspesno izmenjena osoba ${id}`);
        navigate("/");
      })
      .catch((err) => console.log("Greska,pogresna URL adresa!", err.message));
  };

  return (
    <div>
      <h1>Edit user (ID {id})</h1>
        <div className="field">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={state.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={state.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Usertype</label>
          <select
            name="userType"
            value={state.userType}
            onChange={handleChange}
          >
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
          />
        </div>
        <div className="field">
          <label>Adress</label>
          <input
            type="text"
            name="adress"
            value={state.adress}
            onChange={handleChange}
          />
        </div>

        <button className="btnSave" onClick={handlerOnClick}>
          Save changes
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
  );
}

export default EditPersonForm;
