import React from 'react'
import "../StylePages/Update.css"


export const Update = () => {
  const handlesubmit =(e)=>{
    e.preventDefault();
}
  return (
    <form className='update' onSubmit={handlesubmit}>
      <div className='box-update'>
        <h1>Update{}</h1>
        <input typeof='text' required placeholder='username'></input>
        <input typeof='text'  required placeholder='E-mail'></input>
        <input typeof='text'  required placeholder='Phone Number'></input>
        <input typeof='text' required placeholder='password'></input>
        <input typeof='text'  required placeholder='confirm password'></input>
        <button type='sumbit' > <a>Update</a></button>

      </div>
        
    </form>
  )
}