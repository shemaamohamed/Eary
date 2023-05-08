import React from 'react'
import Alert from "react-bootstrap/Alert";

import "../../StylePages/AddTest.css"
import Ear from "../../../Assets/Images/EARR.png"
import  { useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'


import axios from 'axios'
import{getAuthUser}  from "../../../../helper/Storage"
export const AddExams = () => {
    const navigate = useNavigate();

    const auth =getAuthUser();
    const [questions,setquestions]=useState({
        loading:false,
        err:null,
        Name:"",
        questions0: "",
        questions1: "",
        questions2: "",
        questions3:"",
        sucsessmessage:null
        
   
    }) 
    const createExam=(e)=>{
        e.preventDefault();
        setquestions({ ...questions, loading: true });
        const qs = require('qs');
        let data = qs.stringify({
            'Name': questions.Name,
            'questions': [questions.questions0,questions.questions1,questions.questions2,questions.questions3],
           
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:4000/exams',
            headers: {
                'token':auth.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

axios.request(config)
        .then((res)=>{
            setquestions({
                loading: false,
                err:null,
                Name: "",
                questions0: "",
                questions1: "",
                questions2: "",
                questions3:"",
                
                sucsessmessage:"done",
            });
            navigate("/manage-exams")

        })
        .catch((err)=>{
            setquestions({
                ...questions,
                loading:false,
                err:"something went wrong"
                , sucsessmessage:null
            });
        });
    };

  return (
    <form onSubmit={createExam}>
        {questions.err &&(
            <Alert variant="danger" className="p-2">
                {questions.err}
            </Alert>
        )}
         {questions.sucsessmessage &&(
            <Alert  variant="success" className="p-2">
                {questions.sucsessmessage}
            </Alert>
        )}
    <div className='add_test'>
        
    <div className='add_A'>
    
    <div className='add_q'>
    <div id='question'>
    <input required type='text' placeholder='Name' className='Answer' onChange={(e)=>setquestions({...questions ,Name:e.target.value})}></input>        </div>
        <div id='answer1'>
        <input required type='text' placeholder='questions1' className='Answer' onChange={(e)=>setquestions({...questions ,questions0:e.target.value})}></input>           
        </div>
        <div id='answer2'>
        <input required type='text'placeholder='questions2' className='Answer'onChange={(e)=>setquestions({...questions ,questions1:e.target.value})} ></input>

        </div>
        <div id='answer3'>
        <input required type='text'placeholder='questions3' className='Answer'onChange={(e)=>setquestions({...questions ,questions2:e.target.value})} ></input>

        </div>
        <div id='answer4'>
        <input required type='text'placeholder='questions4' className='Answer'onChange={(e)=>setquestions({...questions ,questions3:e.target.value})} ></input>

        </div>
        
        <button id='add-T'>AddExam</button>

    </div>
    
    </div>
    <img className='Ear' src={Ear} alt='#'></img>


    
    </div>
    </form>
  )
}