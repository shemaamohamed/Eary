import React from 'react'
import '../StylePages/History.css'

const History = () => {
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
          <tr>
            <td>Exam 1</td>
            <td>0/5</td>
            <td>28/3/2023</td>
            <td><a href='#'>View</a></td>
          </tr>
          <tr class="active-row">
            <td>Exam 2</td>
            <td>1/5</td>
            <td>28/3/2023</td>
            <td><a href='#'>View</a></td>
          </tr>
          <tr>
            <td>Exam 3</td>
            <td>3/5</td>
            <td>28/3/2023</td>
            <td><a href='#'>View</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default History
        