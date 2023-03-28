
import {Header} from './components/Shared/Header';
import { Footer } from './components/Shared/Footer';
import {Update}from "./components/pages/UserPages/Update";
import {Register}from "./components/pages/Login/Register"
import { SideAdmin } from './components/Shared/SideAdmin';
import  Home  from './components/pages/UserPages/Home';
import "./components/Shared/SharedStyle/App.css"
import NavBar from './components/Shared/NavBar';



function App() {
  return (
    <div className='app' >


      {/* <Header/> */}
      <NavBar></NavBar>
      <Home></Home>
      {/* <Footer/> */}

      
    </div>
  );
}

export default App;
