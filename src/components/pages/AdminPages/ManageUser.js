import React from 'react'
import "../StylePages/ManageUser.css"
import { Update } from './../UserPages/Update';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faSquarePen, faTrash } from '@fortawesome/free-solid-svg-icons';

export const ManageUser = () => {
  const handlesubmit =(e)=>{
    e.preventDefault();
}
  return (
    <div className='manage_user'>
      <form  className='manage' onSubmit={handlesubmit}>
      <FontAwesomeIcon className='glass' icon={faMagnifyingGlass} style={{color: "#000000",}} />
         <input type='search' placeholder='Search UserName' id='search'></input>
         
        <input  requird placeholder='UserName'  type='text' id='username'></input>
        <input requird placeholder='E-mail'type='email' id='email'></input>
        <input requird placeholder='PhoneNumber'type='tel' id='phone'></input>
        <div className='active'>
          <h5>Active:</h5>
          <input placeholder='status'type='checkbox' id='status'></input>

          </div>
        
        <input requird placeholder='password'type='password' id='password'></input>
        <button className='btn-up' type='sumbit' > Update <FontAwesomeIcon icon={faSquarePen} />
        </button>

        
      </form>
      <div className='users'>
        <table>
          
          <tbody>
            <tr>
              <th>UserName</th>
              <th></th>
              <th></th>
            </tr>
          </tbody>
          <tbody>
            
            <tr>
              <td>ayan</td>
              <td><button>update <FontAwesomeIcon icon={faSquarePen} /></button></td>
              <td><button>delete <FontAwesomeIcon icon={faTrash} /></button></td>
            </tr>
            <tr>
              <td>mayan</td>
              <td><button>update <FontAwesomeIcon icon={faSquarePen} /></button></td>
              <td><button>delete <FontAwesomeIcon icon={faTrash} /></button></td>
            </tr>
            <tr>
              <td>shmashemo</td>
              <td><button>update <FontAwesomeIcon icon={faSquarePen} /></button></td>
              <td><button>delete <FontAwesomeIcon icon={faTrash} /></button></td>
            </tr>
           
          </tbody>
            
        </table>
      </div>
      
    </div>
  )
}
