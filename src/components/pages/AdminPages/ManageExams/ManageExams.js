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
export const ManageExams = () => {
  const [search, setSearch] = useState("");


  const auth =getAuthUser();
  const navigate = useNavigate();
  const [exam,setexam]=useState({
    loading:true,
    err:null,
  
    
    results:[],
    reload: 0,
}) ;


useEffect(() => {
  setexam({...exam,loading:true})
 
  
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:4000/exams',
    headers: { 
      'token': auth.token, 
    },
  };
  axios.request(config).then((resp)=>{
    console.log(resp.data);
    setexam({...exam,results:resp.data,loading:false,err:null});


    if(resp.data){

    //   setexam({
    //     ...exam,
    //     err:"Empty"
    //     ,loading:false
    //   }
    //     );

    }else{
      setexam({...exam,results:resp.data,loading:false,err:null});

    }


  })
  .catch((err)=>{
    setexam({
      ...exam,
      err:"something wrong"
      ,loading:false
    }
      );
  })
  
}, [exam.reload]);

const searchExam = (e) => {

  e.preventDefault();

  setexam({ ...exam, reload: exam.reload + 1 });
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
  url: 'http://localhost:4000/exams',
  headers: { 
    'token': auth.token, 
    'Content-Type': 'application/json'
  },
  data : data
};

  axios.request(config)
   
    .then((resp) => {
      
      setexam({ ...exam, reload: exam.reload + 1 });
    })
    .catch((err) => {});
};

  
  return (
    <div className='manage_user'>
         {/* Loader  */}
         {exam.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
        
            

      <div className='users'>
      <Link to={"add_exams"} className="btn">
          Add New Exam +
        </Link>
     


      {exam.loading == false && exam.err == null && (
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
        
          </Form>
        <table> 
        <tbody>
       
       
         
          <tr>
          <th>ID</th>

            <th>Name</th>
            <th>questions</th>
            <th>questions</th>
            <th>questions</th>
            <th>questions</th>
            <th>questions</th>

            
            <th></th>
            <th></th>

          </tr>
       </tbody>
          {
           exam.results.filter((q)=> q.Name.includes(search)) 
          .map((q ,i=1) =>
              <tr key={q.id}>
                <td>{++i}</td>
                <td>{q.Name}</td>
                {
                    q.questions.length==4&&(
                        <>
                        <td>{q.questions[0].Name}</td>
                        <td>{q.questions[1].Name}</td>
                        <td>{q.questions[2].Name}</td>
                        <td>{q.questions[3].Name}</td>
                        <td></td>
                        <td><Link className='btn-up' to={":"+ q.Name} >update <FontAwesomeIcon icon={faSquarePen} /></Link></td>

                              <td><Link className='btn-up' onClick={(e) => {
                                  deleteExam(q.Name);
                              }}>delete <FontAwesomeIcon icon={faTrash} /></Link></td>
                        </>

                    )
                    
                }
                {
                     q.questions.length==3&&(
                        <>
                        <td>{q.questions[0].Name}</td>
                        <td>{q.questions[1].Name}</td>
                        <td>{q.questions[2].Name}</td>
                        <td></td>
                        <td></td>
                        
                        <td></td>
                        <td><Link className='btn-up' to={":"+ q.Name } >update <FontAwesomeIcon icon={faSquarePen} /></Link></td>

                              <td><Link className='btn-up' onClick={(e) => {
                                  deleteExam(q.Name);
                              }}>delete <FontAwesomeIcon icon={faTrash} /></Link></td>
                        </>

                    )
                }
                 {
                     q.questions.length==2&&(
                        <>
                        <td>{q.questions[0].Name}</td>
                        <td>{q.questions[1].Name}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><Link className='btn-up' to={":"+ q.Name } >update <FontAwesomeIcon icon={faSquarePen} /></Link></td>

                              <td><Link className='btn-up' onClick={(e) => {
                                  deleteExam(q.Name);
                              }}>delete <FontAwesomeIcon icon={faTrash} /></Link></td>
                        </>

                    )
                }
                   {
                     q.questions.length==1&&(
                        <>
                        <td>{q.questions[0].Name}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><Link className='btn-up' to={":"+ q.Name } >update <FontAwesomeIcon icon={faSquarePen} /></Link></td>

                              <td><Link className='btn-up' onClick={(e) => {
                                  deleteExam(q.Name);
                              }}>delete <FontAwesomeIcon icon={faTrash} /></Link></td>
                        </>

                    )
                }
                
                {
                     q.questions.length==5&&(
                        <>
                        <td>{q.questions[0].Name}</td>
                        <td>{q.questions[1].Name}</td>
                        <td>{q.questions[2].Name}</td>
                        <td>{q.questions[3].Name}</td>
                        <td>{q.questions[4].Name}</td>
                       
                        <td><Link className='btn-up' to={":"+ q.Name } >update <FontAwesomeIcon icon={faSquarePen} /></Link></td>

                              <td><Link className='btn-up' onClick={(e) => {
                                  deleteExam(q.Name);
                              }}>delete <FontAwesomeIcon icon={faTrash} /></Link></td>
                        </>

                    )
                }
                
             
              
             
              </tr>
            )
          }
         
         
        
      </table>
      </>
         

    )}
         {/* ERRORS HANDLING  */}
      {exam.loading === false && exam.err != null && (
        <Alert variant="danger" className="p-2">
          empty
        </Alert>
      )}

        
      </div>
      
    </div>
  )
}