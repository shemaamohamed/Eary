import React from 'react'
import image1 from '../Assets/Images/logo1.png'
import User1 from '../Assets/Images/User.png'
import './SharedStyle/Header.css'


 export  const Header = () => {
  const on=()=>{
    let navside=document.getElementById('navside');
    navside.style.display='block';
    
    


  };
  const off=()=>{
    let navside=document.getElementById('navside');
    navside.style.display='none';
    
    


  };
  return (
    <  div className='NavBar' onMouseLeave={off}>
         <div className='content'>
         <img className='img_logo' src={image1} alt='#'></img> 
        <ul>
        <li> <a href='#'> home</a></li>
            <li> <a href='#'> take test </a></li>
            <li> <a href='#'> about us</a></li>
            <li> <a href='#' > contact us</a></li>
 
            <li>  <img className='img_user' src={User1} alt='#'   onClick={on}  ></img>
             

             </li>
            
            
        </ul>  
        
         </div>
         <ul id='navside'>
           
            <li> <a href='#'> UpdateProfile</a></li>
            <li> <a href='#'> History </a></li>
            <li> <a href='#'> Logout</a></li>
          
        </ul> 
      

            
        
    </div>
  )
}

