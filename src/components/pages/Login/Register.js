import React from 'react'
import "../StylePages/Update.css"

export const Register = () => {
  return (
    <div className='update'>
      <div className='box-update'>
      <h1>Register</h1>
        <input typeof='text' placeholder='username'></input>
        <input typeof='text' placeholder='E-mail'></input>
        <input typeof='text' placeholder='Phone Number'></input>
        <input typeof='text' placeholder='password'></input>
        <input typeof='text' placeholder='confirm password'></input>
        <button > <a>Create</a></button>

      </div>
        
    </div>
  )
}