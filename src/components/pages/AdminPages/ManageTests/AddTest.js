import React from 'react'
import Alert from "react-bootstrap/Alert";

import "../../StylePages/AddTest.css"
import Ear from "../../../Assets/Images/EARR.png"
import  { useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'


import axios from 'axios'
import{getAuthUser}  from "../../../../helper/Storage"
export const AddTest = () => {
    const navigate = useNavigate();

    const auth =getAuthUser();
    const [questions,setquestions]=useState({
        loading:false,
        err:null,
        Name:"",
        Wrong1:"",
        Wrong2:"",
        Wrong3:"",
        RightAnswer:"",
        sucsessmessage:null
        
   
    }) 
    const audio =useRef(null);
    const createExam=(e)=>{
        e.preventDefault();
        setquestions({...questions,loading:true});
        const formData =new FormData();
        formData.append("Name",questions.Name)
        formData.append("Wrong1",questions.Wrong1)
        formData.append("Wrong2",questions.Wrong2)
        formData.append("Wrong3",questions.Wrong3)
        formData.append("RightAnswer",questions.RightAnswer)
        formData.append(" Description",questions. Description)
        if(audio.current.files&&audio.current.files[0]){
            formData.append("Audio",audio.current.files[0])

        }
        axios.post("http://localhost:4000/questions",formData,{
            headers:{
                token:auth.token,
                "Content-Type":"multipart/form-data"
            }
        })
        .then((res)=>{
            setquestions({
                loading: false,
                err:null,
                Name: "",
                Wrong1: "",
                Wrong2: "",
                Wrong3: "",
                RightAnswer: "",
                sucsessmessage:"done",
                Description:""
            });
            audio.current.files=null;
            navigate("/manage_test");

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
        <div className='add_audio'>
        
        <h4> Upload audio</h4>
        <input  required type="file" name="myfile" ref={audio} />     
       </div>
    <div className='add_A'>
    
    <div className='add_q'>
    <div id='question'>
    <input required type='text' placeholder='Question' className='Answer' onChange={(e)=>setquestions({...questions ,Name:e.target.value})}></input>        </div>
        <div id='answer1'>
        <input required type='text' placeholder='Rightanswer' className='Answer' onChange={(e)=>setquestions({...questions ,RightAnswer:e.target.value})}></input>           
        </div>
        <div id='answer2'>
        <input required type='text'placeholder='Answer1' className='Answer'onChange={(e)=>setquestions({...questions ,Wrong1:e.target.value})} ></input>

        </div>
        <div id='answer3'>
        <input required type='text'placeholder='Answer2' className='Answer'onChange={(e)=>setquestions({...questions ,Wrong2:e.target.value})} ></input>

        </div>
        <div id='answer4'>
        <input required type='text'placeholder='Answer3' className='Answer'onChange={(e)=>setquestions({...questions ,Wrong3:e.target.value})} ></input>

        </div>
        <div id='answer4'>
        <input required type='text'placeholder='Description' className='Answer'onChange={(e)=>setquestions({...questions ,Description:e.target.value})} ></input>

        </div>
        <button id='add-T'>AddTest</button>

    </div>
    
    </div>
    <img className='Ear' src={Ear} alt='#'></img>


    
    </div>
    </form>
  )
}