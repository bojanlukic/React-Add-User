import SearchBar from './components/SearchBar';
import './../src/App.css'
import { useEffect,useState } from 'react';

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/PERSON')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(err => console.log('Greska pri ucitavanju URL-a'))
    
  }, []);

 

  return (
    <div className='main'>
      <SearchBar />
      <table align='center' className='table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Surname</th>
            <th>UserType</th>
            <th>CreatedDate</th>
            <th>City</th>
            <th>Adress</th>  
          </tr>
        </thead>
        <tbody>
        {employees.map((employee)=> (
        
          <tr key={employee.id}>
            <td>{employee.id }</td>
            <td>{employee.Name } </td>
            <td>{ employee.Surname}</td>
            <td>{ employee.UserType}</td>
            <td>{employee.CreatedDate}</td>
            <td>{employee.City }</td>
            <td>{employee.Adress }</td>
            </tr>
             
             ))}
         
        </tbody>
      </table>
    </div>
  );
}

export default App;
