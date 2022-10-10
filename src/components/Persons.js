import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Persons.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import SearchIcon from '@mui/icons-material/Search';


function Persons() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    fetch("http://localhost:3000/PERSON")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEmployees(data);
        }
      })
      .catch((err) => console.log("Greska pri ucitavanju URL-a", err));
  };

  const handlerOnClick = () => {
    if (!name && !position) {
      alert("Both fields must be filled!")
    }
    const filteredPersons = employees.filter((item) => item.firstName.toLowerCase().startsWith(name.toLowerCase()) && item.userType.includes(position));
    setEmployees(filteredPersons);
    setName("");
    setPosition("");
  };

  const deletePerson = (id) => {
    console.log("brisemo osobu", id);
    fetch(`http://localhost:3000/PERSON/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Uspesno obrisana osoba", id);
        refresh();
      })
      .catch((err) => console.log("Nije ispravan URL!", err));
  };

  return (
    <div className="persons">
      <div>
        <label>Name</label>&nbsp;
        <input className="inputForName"
          type="text"
          name="name"
          placeholder="Type..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        &nbsp; &nbsp;
        <label>UserType</label>&nbsp;
        <select 
          className="inputForType"
          style={{fontSize: "14px", padding: "3px" }}
          name="usertype"
          value={position}
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        >
          <option value="">--Choose Usertype--</option>
          <option value="Internship">Internship</option>
          <option value="Employed">Employed</option>
          <option value="Unemployed">Unemployed</option>
        </select>
        &nbsp; &nbsp;
        <button type="submit" className="btnSearch" onClick={handlerOnClick}><span>Search <SearchIcon/></span></button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Usertype</th>
            <th>City</th>
            <th>Adress</th>
            <th>Created Date</th>
            <th className="alignAction" colSpan="2">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            return (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName} </td>
                <td>{employee.lastName}</td>
                <td>{employee.userType}</td>
                <td>{employee.city}</td>
                <td>{employee.adress}</td>
                <td>{employee.createdDate}</td>
                <td>
                  <button
                    className="btnEdit"
                    onClick={() => {
                      navigate(`/edit/${employee.id}`) }}> Edit <EditOutlinedIcon />
                  </button>
                </td>
                <td>
                  <button
                    className="btnDelete" onClick={(e) => { deletePerson(employee.id) }} > Delete <DeleteOutlineOutlinedIcon />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {employees.length > 0 ? null : (
        <div className="info">There are no results</div>
      )}

      <button
        className="btnCreate"
        onClick={(e) => {
          navigate("/add");
        }}
      >
        New User <PersonAddAltOutlinedIcon />
      </button>
    </div>
  );
}

export default Persons;
