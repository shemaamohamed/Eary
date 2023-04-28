import React, { useState } from 'react'
import { Header } from '../../Shared/Header'
import {Footer} from '../../Shared/Footer'
import '../StylePages/Login.css'
import { Button } from 'bootstrap'
import axios from 'axios'

const Login = () => {

  const [login, setlogin] = useState({
    email:"",
    password:"",
    loading:false,
    err:'',
  });
    const handlesubmit =(e)=>{
           e.preventDefault();
           setlogin({...login,loading:true , err:''})
           axios.post("http://localhost:4000/api/login",{
            email:login.email,
            password:login.password,
           }
           ).then((resp) => {
            setlogin({...login , loading:false,err:''})
             
           }
           ).catch((errors) => {
             setlogin({
               ...login,
               loading:false,
               err: errors.response.data.msg
              })
              console.log(login);
             
           }
           )
    }
  return (
   <div className='page'>
    <div className="bg"></div>
    <div className="bg bg2"></div>
    <div className="bg bg3"></div>
           
                   
       
    <div className='register'>
      <h3>Welcome!</h3>
      <p> Create Your Account.For Free!</p>
      <button type='sumbit'>Register</button>
      </div>
     <div className='cover'>
        <form onSubmit={handlesubmit} className='cover'>
       
       {  
        login.err &&<div  className="alert alert-danger " role="alert">
          {login.err}
        </div>
        }     
       
      <h1 className='Login'>Login</h1>
      <input required placeholder='E-mail' type="email" value={login.email} onChange={(e) => {
        setlogin({...login,email:e.target.value})
      }
      } ></input>
      <input required placeholder='Password' type="password" onChange={ (e)=>{
        setlogin({...login,password:e.target.value})
      }
      } ></input>
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
