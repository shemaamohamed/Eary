
import {Header} from './components/Shared/Header';
import { Footer } from './components/Shared/Footer';
import {Update}from "./components/pages/UserPages/Update";
import {Register}from "./components/pages/Login/Register"
import { SideAdmin } from './components/Shared/SideAdmin';
import  Home  from './components/pages/UserPages/Home';
import "./components/Shared/SharedStyle/App.css"
import NavBar from './components/Shared/NavBar';
import Login from './components/pages/Login/Login';
import { ManageUser } from './components/pages/AdminPages/ManageUser';
import { AddTest } from './components/pages/AdminPages/AddTest';
import History from './components/pages/UserPages/History';



function App() {
  return (
    <div className='app' >



      <NavBar></NavBar>
      {/* <SideAdmin></SideAdmin> */}
      <ManageUser></ManageUser>
      {/* <AddTest></AddTest> */}
      
    </div>
  );
}

export default App;
