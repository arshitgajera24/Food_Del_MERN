import React, { useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets';
import axios from "axios"
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import {toast} from "react-toastify"

const LoginPopup = ({setShowLogin}) => {

    const [currState, setCurrState] = useState("signup");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const {setToken} = useContext(StoreContext);

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData(data => ({
            ...data, [name]:value
        }))
    }

    const onLogin = async (e) => {
        e.preventDefault();

        let newUrl = "";
        if(currState === "login")
            newUrl = `${import.meta.env.VITE_BACKEND_URL}/api/user/login`;
        else
            newUrl = `${import.meta.env.VITE_BACKEND_URL}/api/user/register`;

        const response = await axios.post(newUrl, data);
        if(response.data.success)
        {
            toast.success("Successful")
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setShowLogin(false);
        }
        else
        {
            toast.error(response.data.message);
        }


    }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Login" />
        </div>
        <div className="login-popup-inputs">
            { 
                currState==="login" 
                ? <></> 
                : <input name="name" type="text" placeholder='Enter Your Name' onChange={onChangeHandler} value={data.name} required /> 
            }
            <input name="email" type="email" placeholder='Enter Your Email' onChange={onChangeHandler} value={data.email} required />
            <input name="password" type="password" placeholder='Enter Your Password' onChange={onChangeHandler} value={data.password} required />
        </div>
        <button type='submit'>
            {
                currState === "signup" ? "Create Account" : "Login"
            }
        </button>
        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By Continuing, I Agrre to the Terms of Use & Privacy Policy</p>
        </div>
        <div className="login-popup-bottom">
            {
                currState==="login" 
                ? <p>Create a New Account? <span onClick={() => setCurrState("signup")}>Register</span></p> 
                : <p>Already Have an Account? <span onClick={() => setCurrState("login")}>Login here</span></p>
            }
        </div>
      </form>
    </div>
  )
}

export default LoginPopup
