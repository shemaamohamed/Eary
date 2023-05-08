import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {   faSquarePen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import "../../StylePages/ManageUser.css"
import { Link} from 'react-router-dom'

import  {  useState,useEffect } from 'react'
import axios from 'axios'
import { getAuthUser } from '../../../../helper/Storage';


export const ManageUser = () => {
  const handlesubmit =(e)=>{
    e.preventDefault();
}
const [search, setSearch] = useState("");


  const auth =getAuthUser();
  const [users,setusers]=useState({
    loading:true,
    err:null,
    
    results:[],
    reload: 0,
}) ;


useEffect(() => {
  setusers({...users,loading:true})
  let data = JSON.stringify({
    "Name": search
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
  axios.request(config).then((resp)=>{
    setusers({...users,results: resp.data,loading:false,err:null});
    

  })
  .catch((err)=>{
    setusers({
      ...users,
      err:"empty"
      ,loading:false
    }
      );
  })
  
}, [users.reload]);

const searchExam = (e) => {

  e.preventDefault();

  setusers({ ...users, reload: users.reload + 1 });
};

const deleteExam = (Nam) => {

  console.log(Nam);
let data = JSON.stringify({
  "name": Nam
});

let config = {
  method: 'delete',
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
      
      setusers({ ...users, reload: users.reload + 1 });
    })
    .catch((err) => {});
};

  return (
    <div className='manage_user'>
    {/* Loader  */}
    {users.loading === true && (
   <div className="text-center">
     <Spinner animation="border" role="status">
       <span className="visually-hidden">Loading...</span>
     </Spinner>
   </div>
 )}
    
 
       

 <div className='users'>
 <Link to={"add_user"} className="btn">
     Add New User +
   </Link>
 {users.loading === false && users.err == null && (
   <>
  
    <Form onSubmit={searchExam}>
       <Form.Group className="mb-3 d-flex">
         <Form.Control
         aria-disabled
           type="text"
           placeholder="Search Name or email"
           className="rounded-0"
           value={search}
           onChange={(e) => setSearch(e.target.value)}
         />
       </Form.Group>
    
     </Form>
   <table> 
   <tbody>
  
  
    
     <tr>
     <th>NUMBER</th>

       <th>Name</th>
       <th>email</th>
       <th>phone</th>
       <th>is_accepted</th>
<th>created_at</th>    
      
       <th>updated_at</th>
       <th>last_score</th>
       <th>last_login</th>

     </tr>
  </tbody>
     {
       users.results.filter((q)=> q.name.includes(search)|| q.email.includes(search))
     .map((q ,i=1) =>
         <tr key={q.id}>
           <td>{++i}</td>
           <td>{q.name}</td>
           <td>{q.email}</td>
           <td>{q.phone}</td>
           <td>{q.is_accepted}</td>
           <td>{q.created_at}</td>
           <td>{q.updated_at}</td>

           <td>{q.last_score}</td>
           <td>{q.last_login}</td>
           
        
           <td>
           {q.Audio}

           </td>
           <td><Link className='btn-up' to={":"+ q.name} >update <FontAwesomeIcon icon={faSquarePen} /></Link></td>

           <td><Link className='btn-up' onClick={(e) => {
               deleteExam(q.name);
             }}>delete <FontAwesomeIcon icon={faTrash} /></Link></td>
         </tr>
       )
     }
    
    
   
 </table>
 </>
    

    )}
    {/* ERRORS HANDLING  */}
 {users.loading === false && users.err != null && (
   <Alert variant="danger" className="p-2">
     {users.err}
   </Alert>
 )}

 {users.loading === false &&
   users.err == null &&
   users.results.length === 0 && (
     <Alert variant="info" className="p-2">
       No Users, please try again later !
     </Alert>
   )}
   
 </div>
 
</div>
  )
}
