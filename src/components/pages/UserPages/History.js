import React, { useEffect, useState } from 'react'
import '../StylePages/History.css'
import axios from 'axios'
import { getAuthUser } from '../../../helper/Storage'
import { Link } from 'react-router-dom'

const History = () => {

  const [History, setHistory] = useState({
    loading:true,
    err:null,
    data:[],

  })



  const auth=getAuthUser();
  useEffect(() => {
    
    axios.get("http://localhost:4000/history",{
      headers:{
        token:auth.token
      }
    }).then((resp) => {
      console.log(resp.data);
      setHistory({...History, data:resp.data, loading: false, err: null });
      
    }
    ).catch((err) => {
      console.log(err);
      setHistory({...History, loading: false, err: err })
    }
    )
  
   
  }, [])
  
  return (
    <div>
         <table class="history-table">
        <thead>
          <tr>
            <th>Exam No.</th>
            <th>Grade</th>
            <th>Time</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {
          !History.loading ? (
            History.data.map((item) => {
              return(
              <tr>
            <td>{item.exam_Name}</td>
            <td>{item.score}</td>
            <td>{item.created_at}</td>
            <td><Link to={"/Exam"}>View</Link></td>
          </tr>
              )
            }
            )

          ):(
            <p>
              loading ...!
            </p>
          )
          
          




          }
        </tbody>
      </table>
    </div>
  )
}

export default History
        