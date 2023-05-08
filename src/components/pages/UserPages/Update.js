import React from 'react'
import "../StylePages/Update.css"
import { getAuthUser, setAuthUser } from '../../../helper/Storage';
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import Alert from "react-bootstrap/Alert";
import axios from 'axios'



export const Update = (email,old_password) => {
  const login=()=>{
    axios.post("http://localhost:4000/api/login",{
      email:email,
      password:old_password,
     }
     ).then((resp) => {
      setAuthUser(resp.data);
      navigate("/");
     
     }
     )
  }
  const auth =getAuthUser();
  const navigate = useNavigate();

    const [user,setuser]=useState({
        loading:false,
        name:auth.name,
        email:auth.email,
        phone:auth.phone,
        newname: auth.name,
        old_password:'',
        new_password:'',
        err:'',


       

    }) 
const updateuser1 =(e)=>{
    e.preventDefault();
    setuser({...user,loading:true});
const qs = require('qs');
let data = qs.stringify({
  'name': user.name,
  'email': user.email,
  'newname': user.newname,
  'phone': user.phone,
  'old_password': user.old_password,
  'new_password': user.new_password
});

let config = {
  method: 'put',
  maxBodyLength: Infinity,
  url: 'http://localhost:4000/api/user_put',
  headers: { 
    'token': auth.token, 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios.request(config)
.then((res)=>{
  setuser({
      loading: false,
      err: null,
      name: "",
      email: "",
      phone: "",

      newname:"",
      new_password:"",
      old_password:"",
    
  }
  );
  const data=qs.parse(config.data);
  console.log(data);
 old_password=data.old_password;
 email=data.email;
 console.log(email,old_password);
 old_password=data.new_password;

  login(email,old_password) ;
// localStorage.setItem("user",data);  


  


 


})
.catch((err)=>{
  setuser({
      ...user,
      loading:false,
      err:"something went wrong"
      , sucsessmessage:null
  });
});
}
  return (
    <form className='update' onSubmit={updateuser1}>
       {  
        user.err &&<div  className="alert alert-danger " role="alert">
          {user.err}
        </div>
        }  
      

      <div className='box-update'>
        <h1>Update{}</h1>
        <input typeof='text' value={user.newname} required placeholder='username' onChange={(e)=>setuser({...user ,newname:e.target.value})}></input>
        <input typeof='email' value={user.email}  required placeholder='E-mail' onChange={(e)=>setuser({...user ,email:e.target.value})}></input>
        <input typeof='tel' value={user.phone}  placeholder='Phone Number' onChange={(e)=>setuser({...user ,phone:e.target.value})}></input>
        <input typeof='password' required placeholder='old password' onChange={(e)=>setuser({...user ,old_password:e.target.value})}></input>
        <input typeof='password'   placeholder='old password or new password'onChange={(e)=>setuser({...user ,new_password:e.target.value})}></input>
        <button type='sumbit' > <a>Update</a></button>

      </div>
        
    </form>
  )
}