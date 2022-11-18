import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Persons.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

function Persons() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

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
    const filteredPersons = employees.filter(
      (item) =>
        item.firstName.toLowerCase().startsWith(name.toLowerCase()) &&
        item.userType.includes(position)
    );
    setEmployees(filteredPersons);
    if (!name && !position) {
      refresh();
    }
  };

  const clearOnClick = () => {
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

  const indexOfLastPost = currentPage * postsPerPage; //10 = 1 * 10
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 0 = 10 - 10
  const currentPost = employees.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(employees.length / postsPerPage); i++)
    pageNumbers.push(i);
  
  const firstButton = () => {
    setCurrentPage(pageNumbers[0]);
  };
  const backButton = () => {
    currentPage > 0
      ? setCurrentPage((currentPage) => currentPage - 1)
      : alert("This is first page. Go forward!");
  };
  const nextButton = () => {
    pageNumbers.length > currentPage
      ? setCurrentPage((currentPage) => currentPage + 1)
      : alert("This is last page. Go back!");
  };
  const lastButton = () => {
    setCurrentPage(pageNumbers.length);
  };

  return (
    <div className="persons">
      <div className="alignSearchBar">
        <div className="inputBox">
          <label>Name</label>&nbsp;
          <input
            className="inputForName"
            type="text"
            name="name"
            placeholder="Search..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          &nbsp; &nbsp;
          <label>UserType</label>&nbsp;
          <select
            className="inputForType"
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
        </div>
        <div className="buttonBox">
          <button  className="buttonsForSearch" onClick={handlerOnClick}>
            <span>
              Search <SearchIcon />
            </span>
          </button>
          <button className="buttonsForSearch" onClick={clearOnClick}>
            <span>
              Clear <ClearIcon />
            </span>{" "}
          </button>
        </div>
        <div className="newUserBox">
          <button
            className="buttonsForSearch"
            onClick={(e) => {
              navigate("/add");
            }}
          >
            New User <PersonAddAltOutlinedIcon />
          </button>
          </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style={{borderBottom: "1px solid lightgray", borderRight: "1px solid lightgray"}}>ID</th>
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
          {currentPost.map((employee) => {
            return (
              <tr key={employee.id}>
                <td style={{borderBottom: "1px solid lightgray", borderRight: "1px solid lightgray"}}>{employee.id}</td>
                <td>{employee.firstName} </td>
                <td>{employee.lastName}</td>
                <td>{employee.userType}</td>
                <td>{employee.city}</td>
                <td>{employee.adress}</td>
                <td>{employee.createdDate}</td>
                <td>
                  <button
                    className="btnAction" id="btnEdit"
                    onClick={() => {
                      navigate(`/edit/${employee.id}`);
                    }}
                  >
                    {" "}
                    Edit <EditOutlinedIcon />
                  </button>
                </td>
                <td>
                  <button
                    className="btnAction" id="btnDelete"
                    onClick={(e) => {
                      deletePerson(employee.id);
                    }}
                  >
                    {" "}
                    Delete <DeleteOutlineOutlinedIcon />
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
      <div className="navPage">
        <button
          className="buttonsForNav"
          onClick={firstButton}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          className="buttonsForNav"
          onClick={backButton}
          disabled={currentPage === 1}
        >
          Back
        </button>

        {pageNumbers.map((page) => {
          return (
            <div>
              <button
                key={page}
                id="btnPage"
                className={page === currentPage ? "active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </div>
          );
        })}
        <button
          className="buttonsForNav"
          onClick={nextButton}
          disabled={currentPage === pageNumbers.length}
        >
          Next
        </button>
        <button
          className="buttonsForNav"
          onClick={lastButton}
          disabled={currentPage === pageNumbers.length}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default Persons;
