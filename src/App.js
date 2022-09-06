import SearchBar from './components/SearchBar';
import './../src/App.css'
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    fetch('http://localhost:3000/PERSON')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log('Greska pri ucitavanju URL-a'))
  }, []);

 

  return (
    <div className='main'>
      <SearchBar />
      <table align='center' className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>UserType</th>
            <th>CreatedDate</th>
            <th>City</th>
            <th>Adress</th>
          </tr>
        </thead>
        <tbody>
        
            <tr>
              <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tr>
            
        
         
        </tbody>
      </table>
    </div>
  );
}

export default App;
