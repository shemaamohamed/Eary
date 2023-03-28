import { faBook, faCircleUser, faGears, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {React, useState ,useEffect} from 'react'
import '../Shared/SharedStyle/NavBar.css'


const NavBar = () => {
    const UserOn='sideNav'
    const [User, setUser] = useState(UserOn)
    const Close=()=>{

        setUser('sideNavNone')

    }
    
    const list= () =>{
        if(User===UserOn)
        setUser('sideNavNone')
        else
        setUser(UserOn)
    }
    useEffect(() => {
      setUser('sideNavNone')
    }, [])
    
  return (
    <div>
    <div className='container'>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a  href="#"><img class="navbar-brand" src='logo1.png'></img></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link " aria-current="page" href="#">Home</a>
        </li>
        
        <li class="nav-item">
          <a class="nav-link " aria-current="page" href="#"> Hearing exam </a>
        </li>
        
        <li class="nav-item">
          <a class="nav-link " aria-current="page" href="#">About</a>
        </li>
        
        <li class="nav-item">
          <a class="nav-link " aria-current="page" href="#">Contact</a>
        </li>
        
       
        
      </ul>
      <div class="d-flex" role="search">
 
      <FontAwesomeIcon className='fs-1 p-1 User_id' onClick={list} icon={faCircleUser} />
      
      </div>
      
    </div>
    
  </div>
</nav>
<div className={User} onClick={Close} >
      <ul >
        <li className='User_id'><FontAwesomeIcon className='mx-1' icon={faGears} /><a>update profile</a></li>
        <li  className='User_id'><FontAwesomeIcon className='mx-2' icon={faBook} /><a>History</a></li>
        <li  className='User_out'><FontAwesomeIcon className='mx-2' icon={faRightFromBracket} /><a>Logout</a></li>
         </ul>
      </div>
    </div>
    </div>
  )
}

export default NavBar
