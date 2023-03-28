import React from 'react'
import "../StylePages/ManageUser.css"

export const ManageUser = () => {
  return (
    <div className='manage_user'>
        <input type='search' placeholder='Search UserName' id='search'></input>
        <i class="fa fa-search"></i>
    </div>
  )
}
