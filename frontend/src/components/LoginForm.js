import React, {useState} from 'react';
import axios from '../config/axios';
import jwtDecode from 'jwt-decode';

function LoginForm(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { setIsLogin, isLogin, userInfo, setUserInfo } = props;

  const login = async () => {
    const body = {
      username: username,
      password: password
    };

    const result = await axios.post("/users/login", body);
    // console.log(result);

    localStorage.setItem("ACCESS_TOKEN", result.data.token);
    const user = jwtDecode(result.data.token);
    setUserInfo(user);
    setIsLogin(true);
    
  }

  const logout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    setUserInfo({});
    setIsLogin(false);
  }


  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {isLogin ? ( <> 
      <h3 style={{color: "violet"}}>  !! Welcomeback !! Super {userInfo.name} </h3>
      <button onClick={logout}>Logout</button> 
       </>) :
      ( <>
      <div>Username: <input value={username} onChange={(e) => setUserName(e.target.value)}/></div>
      <div>Password: <input value={password} onChange={(e) => setPassword(e.target.value)}/></div>
      <div><button onClick={login}>Login</button></div>
      </> )
      }
    </div>
  )
}

export default LoginForm
