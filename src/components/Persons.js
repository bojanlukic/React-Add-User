import { useEffect, useState } from 'react';
import './Persons.css'

function Persons() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/PERSON')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
            setEmployees(data);
            
        }
      })
      .catch(err => console.log('Greska pri ucitavanju URL-a'))

  }, []);


  const [name, setName] = useState('');
  const [userType, setUserType] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    
  }


  const filteredPersons = employees.filter((item) => {
    let test = true;

    if (name !== '') {
      if (item.Name.toLowerCase().includes(name.toLowerCase()) === false) {
        test = false;
      }
    }
    if (userType !== '') {
      if (item.UserType !== userType) {
        test = false;
      }
    }

    return test;
  });





    return (
      
    <div className='main'>
      <div>
        <div>
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
            <button type="submit" className='btn'>Search</button>
          </form>
        </div>
      </div>


      <table align='center' className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>UserType</th>
            <th>CreatedDate</th>
            <th>City</th>
            <th>Adress</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredPersons.map((employee) => {
              return (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.Name} </td>
                  <td>{employee.Surname}</td>
                  <td>{employee.UserType}</td>
                  <td>{employee.CreatedDate}</td>
                  <td>{employee.City}</td>
                  <td>{employee.Adress}</td>
                </tr>
              );
            })
          }

        </tbody>
      </table>

      {
        filteredPersons.length > 0 ? (null) : (
          <div>Ne postoje rezultati za zadate kriterijume pretrage</div>
        )
      }
    </div>
  );
}

export default Persons;