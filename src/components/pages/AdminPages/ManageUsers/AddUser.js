import React from 'react'
import Alert from "react-bootstrap/Alert";

import "../../StylePages/AddTest.css"
import Ear from "../../../Assets/Images/EARR.png"
import  { useRef, useState } from 'react'
import {  useNavigate } from 'react-router-dom'


import axios from 'axios'
import{getAuthUser}  from "../../../../helper/Storage"
export const AddUser = () => {
    const navigate = useNavigate();

    const auth =getAuthUser();
    const [user,setuser]=useState({
        loading:false,
        err:null,
        name:"",
        email:"",
        password:"",
        is_verified:"",
    
        sucsessmessage:null
        
   
    }) 
    const image =useRef(null);
    const createUser=(e)=>{
        e.preventDefault();
        setuser({...user,loading:true});
        const formData =new FormData();
        formData.append("name",user.name)
        formData.append("email",user.email)
        formData.append("password",user.pasword)
        formData.append("phone",user.phone)
        if(image.current.files&&image.current.files[0]){
            formData.append("image",image.current.files[0])

        }

        
        axios.post("http://localhost:4000/api/register",formData,{
            headers:{
                token:auth.token,
                "Content-Type":"multipart/form-data"
            }
        })
        .then((res)=>{
            setuser({
                loading: false,
                err:null,
                name: "",
                email: "",
                password: "",
                phone:"",
              
                sucsessmessage:"done",
                
            });
            image.current.files=null;

            navigate("/manage-users");

        })
        .catch((err)=>{
            setuser({
                ...user,
                loading:false,
                err:"something went wrong"
                , sucsessmessage:null
            });
        });
    };

  return (
    <form onSubmit={createUser}>
        {user.err &&(
            <Alert variant="danger" className="p-2">
                {user.err}
            </Alert>
        )}
         {user.sucsessmessage &&(
            <Alert  variant="success" className="p-2">
                {user.sucsessmessage}
            </Alert>
        )}
    <div className='add_test'>
        
    <div className='add_A'>
    
    <div className='add_q'>
        <h1>AddUser</h1>
        <div >
  <label for="formFile" class="form-label">select photo</label>
  <input  type="file" ref={image} />
        </div> 
    <div id='question'>
    <input required type='text' placeholder='name' className='Answer' onChange={(e)=>setuser({...user ,name:e.target.value})}></input>        </div>
        <div id='answer1'>
        <input required type='email' placeholder='email' className='Answer' onChange={(e)=>setuser({...user ,email:e.target.value})}></input>           
        </div>
        <div id='answer2'>
        <input required type='text'placeholder='password' className='Answer'onChange={(e)=>setuser({...user ,password:e.target.value})} ></input>

        </div>
        <div id='answer3'>
        <input required type='tel'placeholder='phone' className='Answer'onChange={(e)=>setuser({...user ,phone:e.target.value})} ></input>

        </div>
        
        <button id='add-T'>AddUser</button>

        
     

    </div>
    
    </div>


    
    </div>
    </form>
  )
}