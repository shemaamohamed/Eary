
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
<<<<<<< Updated upstream
      <Header/>

      <Footer/>
=======
      {/* <Header/> */}
      <NavBar></NavBar>
      <Home></Home>
      {/* <Footer/> */}
>>>>>>> Stashed changes
      
    </div>
  );
}

export default App;
