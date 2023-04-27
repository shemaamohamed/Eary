import React from 'react'
import { Header } from '../../Shared/Header'
import {Footer} from '../../Shared/Footer'
import '../StylePages/Login.css'
import { Button } from 'bootstrap'

const Login = () => {
    const handlesubmit =(e)=>{
           e.preventDefault();
    }
  return (
   <div className='page'>
    <div class="bg"></div>
    <div class="bg bg2"></div>
    <div class="bg bg3"></div>
    <div className='register'>
      <h3>Welcome!</h3>
      <p> Create Your Account.For Free!</p>
      <button type='sumbit'>Register</button>
      </div>
     <div className='cover'>
        <form onSubmit={handlesubmit} className='cover'>
        <div className="alert alert-danger " role="alert">
          A simple danger alert—check it out!
        </div>
      <h1 className='Login'>Login</h1>
      <input required placeholder='Username' type="text"></input>
      <input required placeholder='Password' type="password"></input>
        <div className='login-submit'>
           <button className='login-btn' type='submit'>Login</button>
        </div>
  
       
       {/* <p>Don't Have an account ? <a href='#' className='create-account'>create new account</a></p> */}
        </form>
    
    
     </div>
   </div>
  )
}

export default Login
