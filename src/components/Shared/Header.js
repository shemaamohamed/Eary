import React from 'react'
import image1 from '../Assets/Images/logo1.png'
import User1 from '../Assets/Images/User.png'
import './SharedStyle/Header.css'

 export  const Header = () => {
  return (
    <  div className='NavBar'>
         <div className='content'>
         <img className='img_logo' src={image1} alt='#'></img> 
        <ul>
           <li> <a href='#'> home</a></li>
            <li> <a href='#'> take test </a></li>
            <li> <a href='#'> about us</a></li>
            <li> <a href='#'> contact us</a></li>
            <li>  <img className='img_user' src={User1} alt='#'></img> </li>
            
            
        </ul>  
        
        
         </div>
      

            
        
    </div>
  )
}

