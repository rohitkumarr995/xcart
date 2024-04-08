import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../styles/UserRegister.css'
import '../media/UserRegister.css'
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { BASE_URI } from "../utils/Constants";

function UserRegister() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState()
  const [message, setMessage] = useState("");
  const [toggleEyeforPassword, setToggleEyeforPassword] = useState(false)
  const [toggleEyeforConfirmPassword, setToggleEyeforConfirmPassword] = useState(false)
  

  useEffect(()=>{
    document.title="User Registration"
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password!==confirmPassword){
        setMessage("Password should be matched")
    }else{
        try {
            const response = await axios.post(
              `${BASE_URI}/api/v1/users/register`,
              {
                username: username,
                fullname: fullname,
                email: email,
                contact:contact,
                password: password,
              }
            );
            handleStatus(response.status);
            setStatus(response.status)
            setUsername("");
            setFullname("");
            setEmail("");
            setPassword("");
            setContact("")
            setConfirmPassword("")
          } catch (error) {
            console.error("Error", error.response.status);
            handleStatus(error.response.status);
            setStatus(error.response.status)
          }
    }
  };

  const handleStatus = (status) => {
    switch (status) {
      case 201:
        setMessage("User registered successfully");
        break;
      case 400:
        setMessage("Invalid details");
        break;
      case 403:
        setMessage("User already exists");
        break;
      case 204:
        setMessage("User not created. something went wrong!!");
        break;
      default:
        setMessage("");
        break;
    }
  };

  const togglePasswordtype = ()=>{
    toggleEyeforPassword === true ? setToggleEyeforPassword(false) : setToggleEyeforPassword(true)   
  }

  const toggleConfirmPasswordtype = ()=>{
    toggleEyeforConfirmPassword === true ? setToggleEyeforConfirmPassword(false) : setToggleEyeforConfirmPassword(true)   
  }

  return (                  
    <>
      <section className="rg-form-section">
        <div className="rg-form-container">
          <div className="rg-error-message" style={status===201 ? {color:"green"} : {color: "red"}}>{message}</div>

          <div className="rg-title">
            <h1>Registration Form</h1>
          </div>

          <div className="rg-form">
            <form className="rg-form-input" onSubmit={handleSubmit}>
              <div className="username-container">
                <input
                  type="text"
                  className="rg-input-text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
              
              <div className="fullname-container">
                <input
                  type="text"
                  className="rg-input-text"
                  value={fullname}
                  onChange={(event) => setFullname(event.target.value)}
                  placeholder="Full Name"
                  required
                />
              </div>
              
              <div className="email-container">
                <input
                  type="email"
                  className="rg-input-text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email Id"
                  required
                />
              </div>
              
              <div className="contact-container">
                <input
                  type="text"
                  className="rg-input-text"
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  placeholder="Contact"
                  required
                />
              </div>
              
              <div className="password-container">
                <div className="eye-container-password" onClick={togglePasswordtype}>
                  {toggleEyeforPassword===true ? <Eye/> : <EyeOff/>}                 
                </div>
                <input
                  type={toggleEyeforPassword===true?"text":"password"}
                  className="rg-input-text"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              
              <div className="confirmpassword-container">
                <div className="eye-container-confirm-password" onClick={toggleConfirmPasswordtype}>
                  {toggleEyeforConfirmPassword===true ? <Eye/> : <EyeOff/>}                 
                </div>
                <input
                  type={toggleEyeforConfirmPassword===true?"text":"password"}
                  className="rg-input-text"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm Password"
                  required
                />  
              </div>
                
              <button className="rg-btn" type="submit">
                Register
              </button>
            </form>
          </div>

          <div>
            <p className="rg-account-check">Already have an account?</p>
            <Link to={"/ind/home/user/login"}>
              <a href="" className="rg-link-login">
                <span className="rg-login">Login here.</span>
              </a>
            </Link>
          </div>
        </div>
      </section>   
    </>
  );
}

export default UserRegister;
