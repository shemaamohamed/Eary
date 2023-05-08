import Alert from "react-bootstrap/Alert";
import React from 'react'
import "../../StylePages/AddTest.css"
import Ear from "../../../Assets/Images/EARR.png"
import  { useRef, useState } from 'react'

import axios from 'axios'
import{getAuthUser}  from "../../../../helper/Storage"
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import {   useNavigate } from 'react-router-dom'



export const UpdateTest = () => {
    const { Namef }=useParams();
    const navigate = useNavigate();


    
    const value=Namef.replace(/\D/g, "")
     const source = Namef.replace(/[0-9]/g, '');
     const soc=source.slice(1,source.length)
     console.log(soc);
    const auth =getAuthUser();
    const [questions,setquestions]=useState({
        loading:false,
        err:null,
        Name:"",
        Wrong1:"",
        Wrong2:"",
        Wrong3:"",
        RightAnswer:"",
        Description:"",
        sucsessmessage:null,
        NewName:""

    }) 
    const audio =useRef(questions.Audio);
    const updateExam=(e)=>{
        e.preventDefault();
        setquestions({...questions,loading:true});
        const formData =new FormData();
        formData.append("Name",soc)
        formData.append("Wrong1",questions.Wrong1)
        formData.append("Wrong2",questions.Wrong2)
        formData.append("Wrong3",questions.Wrong3)
        formData.append("RightAnswer",questions.RightAnswer)
        formData.append("Description",questions.Description)
        formData.append("NewName",questions.NewName)

        if(audio.current.files&&audio.current.files[0]){
            formData.append("Audio",audio.current.files[0])

        }
        axios.put("http://localhost:4000/questions",formData,{
            headers:{
                token:auth.token,
                "Content-Type":"multipart/form-data"
            }
        })
        .then((res)=>{
            setquestions({
                loading: false,
                err: null,
                Name: "",
                Wrong1: "",
                Wrong2: "",
                Wrong3: "",
                RightAnswer: "",
                Description:"",
                sucsessmessage:"done",
                NewName:""
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
    useEffect(() => {
        
        axios
          .get("http://localhost:4000/questions",{
            headers:{
                token:auth.token,
            }

            
          })
          .then((resp) => {
            resp.data.filter((q)=> q.Name==soc).
            map(q=>{
                setquestions({
                    ...questions,
                    NewName: q.Name,
                    Description: q.Description,
                    Wrong1: q.Wrong1,
                    Wrong2: q.Wrong2,
                    Wrong3: q.Wrong3,
                    RightAnswer: q.RightAnswer,
                     Audio:q.Audio,
                  });

            })

        
            
            
            
            
          })
          .catch((err) => {
            setquestions({
              ...questions,
              loading: false,
              success: null,
              err: "Something went wrong, please try again later !",
            });
          });
      }, [questions.reload]);

  return (
    <form onSubmit={updateExam}>
        {questions.err &&(
            
            <Alert variant="danger" class="fade p-2 alert alert-err show">
                {questions.err}
            </Alert>
            
            

        )}
         {questions.sucsessmessage &&(
            
            <Alert variant="success" class="fade p-2 alert alert-success show">
                {questions.sucsessmessage}
               
            </Alert>
            


        )}

       
    <div className='add_test'>
        <div className='add_audio'>
        
        <h4> Update audio</h4>
        <input type="file" name="myfile" ref={audio}   onChange={(e)=>setquestions({...questions ,Audio:e.target.value})} />   
        <p> current Audio: {questions.Audio}</p>  
       </div>
    <div className='add_A'>
    
    <div className='add_q'>
    <div id='question'>
    <input required type='text' placeholder='Question' className='Answer' value={questions.NewName} onChange={(e)=>setquestions({...questions ,NewName:e.target.value})}></input>        </div>
        <div id='answer1'>
        <input required type='text' placeholder='Rightanswer' value={questions.RightAnswer} className='Answer' onChange={(e)=>setquestions({...questions ,RightAnswer:e.target.value})}></input>           
        </div>
        <div id='answer2'>
        <input required type='text'placeholder='Answer1' className='Answer' value={questions.Wrong1} onChange={(e)=>setquestions({...questions ,Wrong1:e.target.value})} ></input>

        </div>
        <div id='answer3'>
        <input required type='text'placeholder='Answer2' value={questions.Wrong2} className='Answer'onChange={(e)=>setquestions({...questions ,Wrong2:e.target.value})} ></input>

        </div>
        <div id='answer4'>
        <input required type='text'placeholder='Answer3' value={questions.Wrong3} className='Answer'onChange={(e)=>setquestions({...questions ,Wrong3:e.target.value})} ></input>

        </div>
        <div id='answer4'>
        <input required type='text'placeholder='Descriptin' value={questions.Description} className='Answer'onChange={(e)=>setquestions({...questions ,Description:e.target.value})} ></input>

        </div>
        <button id='add-T'>UpdateTest</button>

    </div>
    
    </div>
    <img className='Ear' src={Ear} alt='#'></img>


    
    </div>
    </form>
  )
}