import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudent] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const [ageValue, setAgeValue] = useState("");
  const [numberValue, setPhoneNumber] = useState("");

  const fetchData = async () => {
    const result = await axios.get("http://localhost:8000/students");
    console.log(result.data);
    setStudent(result.data);
  }

  const addStudent = async ()=> {
    const body = {
      name: nameValue,
      age: ageValue,
      number: numberValue
    }
    await axios.post("http://localhost:8000/students", body);
    alert("Send Data to Backend succeed");
    fetchData();
    setNameValue("");
    setAgeValue("");
    setPhoneNumber("");
  }

  const deleteStudent = async (id)=> {
    await axios.delete(`http://localhost:8000/students/${id}`);
    alert("Student has been delete");
    fetchData();
  }

  const editStudent = async (id)=> {
    const editName = prompt("Insert name to edit");
    const editAge = prompt("Insert age to edit");
    const editPhone = prompt("Insert phone to edit");
    const body = {
      name: editName,
      age: editAge,
      number: editPhone
    }
    await axios.put(`http://localhost:8000/students/${id}`, body);
    alert("Send data to edit succeed");
    fetchData();
  }
  

  return (

    <div className="App">
      <button onClick={fetchData}>Fetch Data</button>
      {students.map((student) => 
      <div style={{border: "1px solid black"}}> 
      <div>{`name ${student.name}`}</div>
      <div>{`age ${student.age}`}</div>
      <div>{`Tel ${student.number_phone}`}</div>
      <div>
      <button onClick={ () => deleteStudent(student.id)}>Delete</button><span />
      <button onClick={ () => editStudent(student.id)}>Edit</button>
      </div>
      </div>
      )}
      <h1>Add a student</h1>

      <div>Name: 
        <input
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
      /> </div>

      <div>Age:
         <input
         value={ageValue}
         onChange={(e) => setAgeValue(e.target.value)}
         /> </div>
      <div>Tel:
         <input
         value={numberValue} 
         onChange={(e) => setPhoneNumber(e.target.value)}
         /> </div>

      <div><button onClick={addStudent}>Add new student</button> </div>

    </div>
  );
}

export default App;
