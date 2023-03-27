
import {Header} from './components/Shared/Header';
import { Footer } from './components/Shared/Footer';
import {Update}from "./components/pages/UserPages/Update";
import {Register}from "./components/pages/Login/Register"
import { SideAdmin } from './components/Shared/SideAdmin';
import "./components/Shared/SharedStyle/App.css"
import Login from './components/pages/Login/Login';
import { AddTest } from './components/pages/AdminPages/AddTest';
import { ManageUser } from './components/pages/AdminPages/ManageUser';



function App() {
  return (
    <div className='app' >
      <Header/>
      <ManageUser/>
      <SideAdmin/>
    
      <Footer/>
      
    </div>
  );
}

export default App;
