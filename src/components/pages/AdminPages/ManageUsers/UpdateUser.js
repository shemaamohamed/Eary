import Alert from "react-bootstrap/Alert";
import React from 'react'
import "../../StylePages/AddTest.css"
import  { useRef, useState } from 'react'

import axios from 'axios'
import{getAuthUser}  from "../../../../helper/Storage"
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import {   useNavigate } from 'react-router-dom'



export const UpdateUser = () => {
    const { Namef }=useParams();
    const navigate = useNavigate();


    
    const value=Namef.replace(/\D/g, "")
     const source = Namef.replace(/[0-9]/g, '');
     const soc=source.slice(1,source.length)
     console.log(soc);
    const auth =getAuthUser();
    const [userr,setuser]=useState({
        loading:false,
        err:null,
        newname:"",
        email: "",
        phone: "",
        is_accepted: "",
        name:""
        


    }) 
    const updateExam=(e)=>{
        e.preventDefault();
        setuser({...userr,loading:true});
        const qs = require('qs');
        let data = qs.stringify({
            'name': userr.name,
            'email': userr.email,
            'is_accepted': userr.is_accepted,
            'phone':userr.phone,
            'newname': userr.newname,
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://localhost:4000/useradmin',
            headers: {
                'token': auth.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

axios.request(config)
        
        .then((res)=>{
            setuser({
                loading: false,
                err: null,
                name: "",
                email: "",
                phone: "",
                is_accepted: "",
                newname:""
              
            });
            navigate("/manage-users");


        })
        .catch((err)=>{
            setuser({
                ...userr,
                loading:false,
                err:"something went wrong"
                , sucsessmessage:null
            });
        });

    };
    useEffect(() => {
        
        let data = JSON.stringify({
            "name": soc
          });
          
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:4000/useradmin',
            headers: { 
              'token': auth.token, 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
          .then((resp) => {
            resp.data.filter((q)=> q.name==soc).
            map(q=>{
                setuser({
                    ...userr,
                    phone: q.phone,
                    email: q.email,
                    is_accepted: q.is_accepted,
                    newname:q.name,
                    name:q.name,
                    last_login:q.last_login,
                    created_at:q.created_at,
                    updated_at:q.updated_at,
                    last_score:q.last_score,

                
                  });  

            })
            
          })
          .catch((err) => {
            setuser({
              ...userr,
              loading: false,
              success: null,
              err: "Something went wrong, please try again later !",
            });
          });
      }, [userr.reload]);

  return (
    <form onSubmit={updateExam}>
        {userr.err &&(
            
            <Alert variant="danger" class="fade p-2 alert alert-err show">
                {userr.err}
            </Alert>
            
            

        )}
         {userr.sucsessmessage &&(
            
            <Alert variant="success" class="fade p-2 alert alert-success show">
                {userr.sucsessmessage}
               
            </Alert>
            


        )}

       
    <div className='add_test'>
        
    <div className='add_A'>
    
    <div className='add_q'>
    <div id='question'>
    <input required type='text' placeholder='name' className='Answer' value={userr.newname} onChange={(e)=>setuser({...userr ,newname:e.target.value})}></input>        </div>
        <div id='answer1'>
        <input  type='tel' placeholder='Phone' value={userr.phone} className='Answer' onChange={(e)=>setuser({...userr ,phone:e.target.value})}></input>           
        </div>
        <div id='answer2'>
        <input required type="email" placeholder='email' className='Answer' value={userr.email} onChange={(e)=>setuser({...userr ,email:e.target.value})} ></input>

        </div>
        <div id='answer3'>
        <input required type="" placeholder='is_accepted' value={userr.is_accepted} className='Answer'onChange={(e)=>setuser({...userr ,is_accepted:e.target.value})} ></input>

        </div>
      
        <button id='add-T'>UpdateUser</button>

    </div>
    
    </div>


    
    </div>
    </form>
  )
}