import Alert from "react-bootstrap/Alert";
import React from 'react'
import "../../StylePages/AddTest.css"
import  { useRef, useState } from 'react'

import axios from 'axios'
import{getAuthUser}  from "../../../../helper/Storage"
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import {   useNavigate } from 'react-router-dom'



export const UpdateExam = () => {
    const {Name}=useParams();
    console.log(Name);
    const navigate = useNavigate();

    //  const source = Namef.replace(/[0-9]/g, '');
      const soc=Name.slice(1,Name.length)
      console.log(soc);
    const auth =getAuthUser();
    const [userr,setuser]=useState({
        loading:false,
       Name:"",
       question0:"",
       question1:"",
       question2:"",
       question3:"",
       q1:"",
       q2:"",
       q3:"",
       q4:"",


    }) 
    const update_Exam=(e)=>{
        e.preventDefault();
        setuser({...userr,loading:true});
        const qs = require('qs');
        let data = qs.stringify({
          
            'Name': userr.Name,
            'questions': [userr.q1,userr.q2,userr.q3,userr.q4],

        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://localhost:4000/exams',
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
                Name:"",
                question0: "",
                question1: "",
                question2: "",
                question3: "",
                q1:"",
                q2:"",
                q3:"",
                q4:"",
              
            });
            navigate("/manage-exams")


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
        
    
          
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:4000/exams',
            headers: { 
              'token': auth.token, 
            },
          };
          
          axios.request(config)
          .then((resp) => {
            resp.data.filter((q)=> q.Name== soc).
            map(q=>{
                setuser({
                    ...userr,
                    Name:q.Name,
                    question0: q.questions[0].Name,
                    question1:  q.questions[1].Name,
                    question2:  q.questions[2].Name,
                    question3:  q.questions[3].Name,
                   
                

                
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
    <form onSubmit={update_Exam}>
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
    <input required type='text' placeholder='name' className='Answer' value={userr.Name} onChange={(e)=>setuser({...userr ,newname:e.target.value})}></input>        </div>
        <div id='answer1'>
        <input  type='text' placeholder='question1' value={userr.question0} className='Answer' onChange={(e)=>setuser({...userr ,question0:e.target.value,q1:e.target.value})}></input>           
        </div>
        <div id='answer2'>
        <input required type="text" placeholder='question2' className='Answer' value={userr.question1} onChange={(e)=>setuser({...userr ,question1:e.target.value,q2:e.target.value})} ></input>

        </div>
        <div id='answer3'>
        <input required type="text" placeholder='question3' value={userr.question2} className='Answer'onChange={(e)=>setuser({...userr ,question2:e.target.value,q3:e.target.value})} ></input>

        </div>
        <div id='answer4'>
        <input required type="text" placeholder='question4' value={userr.question3} className='Answer'onChange={(e)=>setuser({...userr ,question3:e.target.value,q4:e.target.value})} ></input>

        </div>
      
        <button id='add-T'>UpdateUser</button>

    </div>
    
    </div>


    
    </div>
    </form>
  )
}