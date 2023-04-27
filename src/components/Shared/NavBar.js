import { faBook, faCircleUser, faGears, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {React, useState ,useEffect} from 'react'
import '../Shared/SharedStyle/NavBar.css'
import { Link } from 'react-router-dom'


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
    


    const Logout=()=>{

    }
  return (
    <div>
    <div className='container'>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <Link  to={"/Home"}><img class="navbar-brand" src='logo1.png'></img></Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link " aria-current="page" to={"/"}>Home</Link>
        </li>
        
        <li class="nav-item">
          <Link class="nav-link " aria-current="page" to={"/Exam"}> Hearing exam </Link>
        </li>
        
        <li class="nav-item">
          <Link class="nav-link " aria-current="page" to={"/Home"}>About</Link>
        </li>
        
        <li class="nav-item">
          <Link class="nav-link " aria-current="page" to={"/Home"}>Contact</Link>
        </li>
          
        
        
       
        
      </ul>
      
      <Link class="nav-link p-3  " aria-current="page"to="/login">Login</Link>
      
      <div class="d-flex" role="search">
 
      <FontAwesomeIcon className='fs-1 p-1 User_id' onClick={list} icon={faCircleUser} />
      
      </div>
      
    </div>
    
  </div>
</nav>
<div className={User} onClick={Close} >
      <ul >
        <li className='User_id'><FontAwesomeIcon className='mx-1' icon={faGears} /><Link to={"/Update"}>update profile</Link></li>
        <li  className='User_id'><FontAwesomeIcon className='mx-2' icon={faBook} /><Link to={"/History"}>History</Link></li>
        <li  className='User_out'><FontAwesomeIcon className='mx-2' icon={faRightFromBracket} /><a onClick={Logout()}>Logout</a></li>
         </ul>
      </div>
    </div>
    </div>
  )
}

export default NavBar
