import React from 'react'
import "../StylePages/Update.css"

export const Update = () => {
  return (
    <div className='update'>
      <div className='box-update'>
      <h1>Update</h1>
        <input typeof='text' placeholder='username'></input>
        <input typeof='text' placeholder='E-mail'></input>
        <input typeof='text' placeholder='Phone Number'></input>
        <input typeof='text' placeholder='password'></input>
        <input typeof='text' placeholder='confirm password'></input>
        <button > <a>Update</a></button>

      </div>
        
    </div>
  )
}
