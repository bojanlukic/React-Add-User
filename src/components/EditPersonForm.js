import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/EditPersonForm.css";

function EditPersonForm() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    userType: "",
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
    <div className="container-editForm">
      <h1>Edit user (ID {id})</h1>
      <div>
        <label>First Name</label>
        <input
          className="inputs"
          type="text"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
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
        />
      </div>
      <div>
        <label>Usertype</label>
        <select
          className="inputs"
          name="userType"
          value={state.userType}
          onChange={handleChange}
        >
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
        />
      </div>

      <button className="btnEditForm" onClick={handlerOnClick} >
        Save changes
      </button>
      <button
        className="btnEditForm"
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
