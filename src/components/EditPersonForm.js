import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../components/EditPersonForm.css'

function EditPersonForm() {
  const navigate = useNavigate();
  let { id } = useParams();

  // const [employee, setEmployee] = useState({});

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    userType: "Unemployed",
    city: "",
    adress: ""
  });

  const fetchUserData = (id) => {
    fetch('http://localhost:3000/PERSON/' + id) 
      .then(response => response.json())
      .then(data => {
        if (data && parseInt(data.id) >= 0 && data.firstName) {
          // setEmployee(data);
          setState({
            ...state,
            ...data
          });
        }
      })
      .catch(err => console.log('Greska pri ucitavanju URL-a'))
  };

  useEffect(() => {
    if (parseInt(id) >= 0) {
      fetchUserData(id);
    }
  }, [id]);


  const handleChange = (e) => {
    // univerzalni handler za onChange event koji funkcionise za sva input polja, textarea i checkbox polja.
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value
    });
  };


  const submit = (e) => {
    e.preventDefault();
    console.log('Submitujemo podatke za izmenu korisnika:', state);

    const timestamp = Date.now();
    const d = new Date(timestamp);
    const dateFormated = d.toLocaleString('en-GB');

    axios.put('http://localhost:3000/PERSON/' + id, {
      ...state,
      // CreatedDate: dateFormated
      ModifiedDate: dateFormated
    })
      .then(response => {
        console.log('Uspesno izmenjen korisnik');
        // refresh();
        navigate('/');
      })
      .catch(err => console.log('Greska pri ucitavanju URL-a'))

  };


  return (
    <div>
      <h1>Edit user (ID {id})</h1>
      <form onSubmit={submit}>

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

        <button className='btnSave' type="submit">Save changes</button>
      </form>
    </div>
  )
}

export default EditPersonForm;