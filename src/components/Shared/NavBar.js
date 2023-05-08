import { faBook, faCircleUser, faGears, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {React, useState ,useEffect} from 'react'
import '../Shared/SharedStyle/NavBar.css'
import { Link, useNavigate } from 'react-router-dom'
import { getAuthUser, removeAuthUser } from '../../helper/Storage'


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
    

    
const auth = getAuthUser();
const navigate = useNavigate();
    const Logout=()=>{
      removeAuthUser();
      navigate("/");
    }
  return (
    <div>
    <div className='container'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link  to={"/Home"}><img className="navbar-brand" alt='' src='logo1.png'></img></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {/* Authenticated routes  */}

      
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={"/"}>Home</Link>
        </li>
        {
            auth&& (
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={"/Exam"}> Hearing exam </Link>
        </li>
            )
          }
          {
            !auth &&(
            <li className="nav-item">
            <Link className="nav-link " aria-current="page" to={"/Login"}> Hearing exam </Link>
          </li>
            )
          }
       
        
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={"/Home"}>About</Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={"/Home"}>Contact</Link>
        </li>
          
        
        
       
        
      </ul>
      {
        
        !auth ?(

          <Link className="nav-link p-3  " aria-current="page"to="/login">Login</Link>

        ):(
          <Link className="nav-link p-3  " aria-current="page"to="/updateUser">{auth.name}</Link>
        )
      }
      
      <div className="d-flex" role="search">
      
      <FontAwesomeIcon className='fs-1 p-1 User_id' onClick={list} icon={faCircleUser} />
      
      </div>
      
    </div>
    
  </div>
</nav>
<div className={User} onClick={Close} >
      <ul >
        <li className='User_id'><FontAwesomeIcon className='mx-1' icon={faGears} /><Link to={"/Update"}>update profile</Link></li>
        <li  className='User_id'><FontAwesomeIcon className='mx-2' icon={faBook} /><Link to={"/History"}>History</Link></li>
        {
          auth&&(
            <li  className='User_out'><FontAwesomeIcon className='mx-2' icon={faRightFromBracket} /><Link to={"/"} onClick={Logout}>Logout</Link></li>

          )
        }
         </ul>
      </div>
    </div>
    </div>
  )
}

export default NavBar
