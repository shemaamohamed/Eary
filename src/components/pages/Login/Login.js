import React from 'react'
import { Header } from '../../Shared/Header'
import {Footer} from '../../Shared/Footer'
import '../StylePages/Login.css'

const Login = () => {
    const handlesubmit =(e)=>{
           e.preventDefault();
    }
  return (
   <div className='page'>
     <div className='cover'>
        <form onSubmit={handlesubmit} className='cover'>
      <h1 className='Login'>Login{}</h1>
      <input required placeholder='Username' type="text"></input>
      <input required placeholder='Password' type="password"></input>
        <div className='login-submit'>
           <button className='login-btn' type='submit'>Login</button>
        </div>
      <div className='Target'>
          <button className='Admin-btn' type='submit'>Admin</button>
          <button className='User-btn' type='submit'>User</button>
        
      </div>         <p>Don't Have an account ? <a href='#' className='create-account'>create new account</a></p>
        </form>
    
    
     </div>
   </div>
  )
}

export default Login
