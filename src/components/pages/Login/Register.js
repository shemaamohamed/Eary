import React from 'react'
import "../StylePages/Update.css"

export const Register = () => {
  const handlesubmit =(e)=>{
    e.preventDefault();
}
  return (
    <form className='update' onSubmit={handlesubmit}>
      <div className='box-update'>
        <h1>Register{}</h1>
        <input typeof='text' required placeholder='username'></input>
        <input typeof='text'  required placeholder='E-mail'></input>
        <input typeof='text'  required placeholder='Phone Number'></input>
        <input typeof='text' required placeholder='password'></input>
        <input typeof='text'  required placeholder='confirm password'></input>
        <button type='sumbit' > <a>Create</a></button>

      </div>
        
    </form>
  )
}