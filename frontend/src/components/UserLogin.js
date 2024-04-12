import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/UserLogin.css'
import '../media/UserLogin.css'
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { BASE_URI } from "../utils/Constants";

function UserLogin() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState()
  const [toggleEye, setToggleEye] = useState(false)
  const navigate = useNavigate();

  useEffect(()=>{
    document.title="User Login"
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URI}/api/v1/users/login`,
        {
          username: username,
          email: email,
          password: password,
        },{withCredentials:true}
      );
      console.log(response.data.user.username);
      handleMessage(response.status);
      setStatus(response.status)
      localStorage.setItem("accessToken", response.data.accessToken);

      navigate(-1)
      
    } catch (error) {
      handleMessage(error.response.status);
      setStatus(error.response.status)
    }
  };

  const handleMessage = (status) => {
    setMessage((prevMessage) => {
      switch (status) {
        case 400:
          return "Username or Password required";
          break;
        case 401:
          return "Invalid username or email";
          break;
        case 406:
          return "Incorrect password";
          break;
        case 200:
          return "Logged in successfully";
          break;
        default:
          return prevMessage;
      }
    });
  };

  const togglePasswordtype = ()=>{
    toggleEye === true ? setToggleEye(false) : setToggleEye(true)   
  }

  return (
    <>
      <section className="lg-form-section">
        <div className="lg-form-container">
          <div className="lg-error-message" style={status==201 ? {color:"green"} : {color: "red"}}>{message}</div>
          <div className="lg-title">
            <h1>Login Form</h1>
          </div>
          <div className="lg-form">
            <form className="lg-form-input" onSubmit={handleSubmit}>
              <div className="username-container">
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Username"
                  required
                  className="lg-input-text"
                />
              </div>
              
              <div className="email-container">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email Id"
                  required
                  className="lg-input-text"
                />
              </div>
              
              <div className="password-container">
                <div className="eye-container" onClick={togglePasswordtype}>
                  {toggleEye===true ? <Eye/> : <EyeOff/>}                 
                </div>
                <input
                  type={toggleEye===true?"text":"password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  required
                  className="lg-input-text lg-password"
                />              
              </div>
              <button type="submit" className="lg-btn">Login</button>
            </form>
          </div>
          <div>
            <Link to={"/ind/home/user/register"}>
                <a className="lg-link-login">New User? Register here..</a>
            </Link>
        </div>
        </div>
      </section>   
    </>
  );
}

export default UserLogin;