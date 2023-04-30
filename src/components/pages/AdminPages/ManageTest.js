import React from 'react'
import "../StylePages/ManageUser.css"
import { Update } from '../UserPages/Update';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faSquarePen, faTrash } from '@fortawesome/free-solid-svg-icons';
import  { useRef, useState,useEffect } from 'react'
import{getAuthUser}  from "../../../helper/Storage"


import axios from 'axios'
export const ManageTest = () => {
  const auth =getAuthUser();

  const [question,setquestion]=useState({
    loading:true,
    err:null,
    reload:0,
    results:[]
}) ;
useEffect(() => {
  setquestion({...question,loading:true})
  axios
  .get("http://localhost:4000/questions")
  .
  then((resp)=>{
    setquestion({...question,results:resp.data,loading:false,err:null});

  })
  .catch((err)=>{
    setquestion({
      ...question,
      err:"something wrong"
      ,loading:false
    }
      );
  })
  
}, [question.reload]);

    

  
  return (
    <div className='manage_user'>
  
      <div className='users'>
        <table>
          
          <tbody>
           
            <tr>
              <th>Name</th>
              <th>Discription</th>
              <th></th>
              <th></th>
              <th></th>

            </tr>
          </tbody>
          <tbody>
          {
            question.results.map((q)=>{
              <tr key={question.id}>
              <td>{question.Name}</td>
              <td>{question.Discription}</td>
              <td><button>update <FontAwesomeIcon icon={faSquarePen} /></button></td>
              <td><button>view <FontAwesomeIcon icon={faSquarePen} /></button></td>

              <td><button>delete <FontAwesomeIcon icon={faTrash} /></button></td>
            </tr>
            })
          }
            
            
          
          
           
          </tbody>
            
        </table>
      </div>
      
    </div>
  )
}