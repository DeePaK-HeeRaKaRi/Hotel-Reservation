import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import api from '../../Hooks/api';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [credentials,setCredentials] = useState({
    email : undefined,
    password : undefined
  });
  const { loading,error,dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log('error',error);
  const handleChange =  (e) => {
    setCredentials(prev => ({ ...prev,[e.target.id] : e.target.value }));
  };
  const handleClick = async e => {
    console.log(e);
    if(credentials.email === undefined || credentials.password === undefined) {
      if(credentials.email !== undefined && credentials.password === undefined) {
        alert('Password is required');
      }else if(credentials.email === undefined && credentials.password !== undefined) {
        alert('Email is required');
      }else{
        alert('All fields are required');
      }
        
    }else{
      dispatch({ type : 'LOGIN_START' });
      try {
        const res = await api.post('/auth/login',credentials);
        console.log(res);
        dispatch({ type : 'LOGIN_SUCCESS',payload : res.data.details });
        navigate(-1);
        // console.log(window.history)
      }catch(err) {
        console.log('err',err.response.data.message);
        dispatch({ type : 'LOGIN_FAILURE',payload : err.response.data });
      }
    }
  };
  return (
    <div className='login'>
      <div className='lContainer'>
        <input type='email' placeholder='Email' id='email' className='lInput' onChange={handleChange}></input>
        <input type='password' placeholder='Password' id='password' className='lInput' onChange={handleChange}></input>
        <button type='button' disabled={loading} className='lButton' onClick={handleClick}>Login</button>
        {error != null && <span>{error.message}</span> }
      </div>
       
    </div>
  );
}

export default Login;
