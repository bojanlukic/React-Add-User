import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Persons.css'

function Persons() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  const refresh = () => {
    fetch('http://localhost:3000/PERSON')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEmployees(data);
        }
      })
      .catch(err => console.log('Greska pri ucitavanju URL-a', err))
  };

  useEffect(() => {
    refresh();
  }, []);


  const [name, setName] = useState('');
  const [userType, setUserType] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

  }


  const filteredPersons = employees.filter((item) => {
    let test = true;

    if (name !== '') {
      if (item.firstName.toLowerCase().includes(name.toLowerCase()) === false) {
        test = false;
      }
    }
    if (userType !== '') {
      if (item.userType !== userType) {
        test = false;
      }
    }

    return test;
  });


  /*
const filteredPersons = employees.filter((item) => {
  return name.toLowerCase() === '' ? item : item.firstName.toLowerCase().includes(name) 
});
// kako ovde da ubacim filtriranje usertypa u ovu promenljivu? 

  */


 /* const deletePerson = (id) => {
    console.log('brisemo osobu', id);
    axios.delete('http://localhost:3000/PERSON/' + id)
      .then(response => {
        console.log('Uspesno obrisano');

        refresh();
      })
      .catch(err => console.log('Greska pri ucitavanju URL-a'))

  };*/

  const deletePerson = (id) => {
    console.log('brisemo osobu', id);
    fetch('http://localhost:3000/PERSON/' + id, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        console.log('Uspesno obrisana osoba', id)
        refresh();
      })
      .catch(err => console.log('Nije ispravan URL!'))
  }


  return (
    <div>
      <div className='input'>
        <form onSubmit={submitHandler}>
          <label>Name</label>&nbsp;
          <input
            type="text"
            name="name"
            onChange={(e) => (setName(e.target.value))}
          />
          &nbsp;
          &nbsp;
          <label>UserType</label>&nbsp;
          <select
            name="usertype"
            onChange={(e) => (setUserType(e.target.value))}
          >
            <option value="">--Choose Usertype--</option>
            <option value="Internship">Internship</option>
            <option value="Employed">Employed</option>
            <option value="Unemployed">Unemployed</option>
          </select>
          &nbsp;
          &nbsp;
          <button type="submit" className='btnSearch'>Search</button>
        </form>
      </div>

      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Usertype</th>
            <th>City</th>
            <th>Adress</th>
            <th>Created Date</th>
            <th colSpan='2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredPersons.map((employee) => {
              return (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName} </td>
                  <td>{employee.lastName}</td>
                  <td>{employee.userType}</td>
                  <td>{employee.city}</td>
                  <td>{employee.adress}</td>
                  <td>{employee.createdDate}</td>
                  <td ><button className='btnEdit' onClick={() => { navigate('/edit/' + employee.id) }}>Edit</button></td>
                  <td><button className='btnDelete' onClick={(e) => { deletePerson(employee.id) }}>Delete</button></td>
                </tr>
              );
            })
          }

        </tbody>
      </table>
      
            {filteredPersons.length > 0 ? (null) :
                <div className='info'>Ne postoje rezultati za zadate kriterijume pretrage</div>}

      <button className='btnCreate'
        onClick={(e) => { navigate('/add') }}>Create new user</button>
    </div>
  );
}

export default Persons;