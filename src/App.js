
import {Header} from './components/Shared/Header';
import { Footer } from './components/Shared/Footer';
import {Update}from "./components/pages/UserPages/Update";
import {Register}from "./components/pages/Login/Register"
import { SideAdmin } from './components/Shared/SideAdmin';
import "./components/Shared/SharedStyle/App.css"
import Login from './components/pages/Login/Login';
import Home from './components/pages/UserPages/Home';



function App() {
  return (
    <div className='app' >
      <Header/>
      <Home></Home>
      {/* <Footer/> */}
      
    </div>
  );
}

export default App;
