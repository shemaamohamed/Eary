import React from 'react'
import "../../StylePages/ManageUser.css"
import { Link, useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSquarePen, faTrash } from '@fortawesome/free-solid-svg-icons';
import  {  useState,useEffect } from 'react'
import{getAuthUser}  from "../../../../helper/Storage"
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";





import axios from 'axios'
import { SideAdmin } from '../../../Shared/SideAdmin';
export const ManageTest = (props) => {
  const [search, setSearch] = useState("");


  const auth =getAuthUser();
  const navigate = useNavigate();
  const [question,setquestion]=useState({
    loading:true,
    err:null,
    
    results:[],
    reload: 0,
}) ;


useEffect(() => {
  setquestion({...question,loading:true})
  let data = JSON.stringify({
    "Name": search
  });
  
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:4000/questions',
    headers: { 
      'token': auth.token, 
      'Content-Type': 'application/json'
    },
    data : data
  };
  axios.request(config).then((resp)=>{
    setquestion({...question,results: resp.data,loading:false,err:null});
    

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

const searchExam = (e) => {

  e.preventDefault();

  setquestion({ ...question, reload: question.reload + 1 });
};

const deleteExam = (Nam) => {
  var body = {
    "Name" : Nam,
    
  };
  console.log(Nam);
let data = JSON.stringify({
  "Name": Nam
});

let config = {
  method: 'delete',
  maxBodyLength: Infinity,
  url: 'http://localhost:4000/questions',
  headers: { 
    'token': auth.token, 
    'Content-Type': 'application/json'
  },
  data : data
};

  axios.request(config)
   
    .then((resp) => {
      
      setquestion({ ...question, reload: question.reload + 1 });
    })
    .catch((err) => {});
};

  
  return (
    <div className='manage_user'>
         {/* Loader  */}
         {question.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      
            

      <div className='users'>

      {question.loading === false && question.err == null && (
        <>
       
         <Form onSubmit={searchExam}>
            <Form.Group className="mb-3 d-flex">
              <Form.Control
              aria-disabled
                type="text"
                placeholder="Search Exam Name"
                className="rounded-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Group>
            <Link to={"add_test"} className="btn">
          Add New Exam +
        </Link>
          </Form>
        <table> 
        <tbody>
       
       
         
          <tr>
          <th>ID</th>

            <th>Name</th>
            <th>Answer</th>
            <th>Wrong1</th>
            <th>Wrong2</th>
            <th>Wrong3</th>
            <th>Discription</th>
            <th>Audio</th>
            <th></th>
            <th></th>

          </tr>
       </tbody>
          {
           question.results.filter((q)=> q.Name.includes(search)) 
          .map((q ,i=1) =>
              <tr key={q.id}>
                <td>{++i}</td>
                <td>{q.Name}</td>
                <td>{q.RightAnswer}</td>
                <td>{q.Wrong1}</td>
                <td>{q.Wrong2}</td>
                <td>{q.Wrong3}</td>
                <td>{q.Description}</td>
                <td>
                {q.Audio}

                </td>
                <td><Link className='btn-up' to={":"+ q.Name +i} >update <FontAwesomeIcon icon={faSquarePen} /></Link></td>

                <td><Link className='btn-up'  onClick={(e) => {
                    deleteExam(q.Name);
                  }}>delete <FontAwesomeIcon icon={faTrash} /></Link></td>
              </tr>
            )
          }
         
         
        
      </table>
      </>
         

         )}
         {/* ERRORS HANDLING  */}
      {question.loading === false && question.err != null && (
        <Alert variant="danger" className="p-2">
          {question.err}
        </Alert>
      )}

      {question.loading === false &&
        question.err == null &&
        question.results.length === 0 && (
          <Alert variant="info" className="p-2">
            No Exam, please try again later !
          </Alert>
        )}
        
      </div>
      
    </div>
  )
}