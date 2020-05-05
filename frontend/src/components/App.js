import React, {useState, useEffect} from 'react';
import axios from '../config/axios';
import './App.css';
import LoginForm from './LoginForm';
import jwtDecode from "jwt-decode";

function App() {
  const [students, setStudent] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const [ageValue, setAgeValue] = useState("");
  const [numberValue, setPhoneNumber] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    fetchData();
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      const user = jwtDecode(token);
      setUserInfo(user)
      setIsLogin(true);
    };
  }, [])

  const fetchData = async () => {
    const result = await axios.get("/students");
    console.log(result.data);
    setStudent(result.data);
  }

  const addStudent = async ()=> {
    const body = {
      name: nameValue,
      age: ageValue,
      number: numberValue
    }
    await axios.post("/students", body);
    alert("Send Data to Backend succeed");
    fetchData();
    setNameValue("");
    setAgeValue("");
    setPhoneNumber("");
  }

  const deleteStudent = async (id)=> {
    const headers = {Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`};
    await axios.delete(`/students/${id}`, {headers: headers});
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
    await axios.put(`/students/${id}`, body);
    alert("Send data to edit succeed");
    fetchData();
  }
  

  return (

    <div className="App">
      <LoginForm 
      userInfo={userInfo}
      setUserInfo={setUserInfo}
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      />
      <h1>Student Name</h1>
      {students.map((student) => 
      <div style={{border: "1px solid black"}}> 
      <div>{`name ${student.name}`}</div>
      <div>{`age ${student.age}`}</div>
      <div>{`Tel ${student.number_phone}`}</div>
      <div>
      {isLogin ? ( <div> <button onClick={ () => deleteStudent(student.id)}>Delete</button> 

      <button onClick={ () => editStudent(student.id)}>Edit</button> </div> ) : null}
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
