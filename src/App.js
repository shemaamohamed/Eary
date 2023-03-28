
import {Header} from './components/Shared/Header';
import { Footer } from './components/Shared/Footer';
import {Update}from "./components/pages/UserPages/Update";
import {Register}from "./components/pages/Login/Register"
import { SideAdmin } from './components/Shared/SideAdmin';
import "./components/Shared/SharedStyle/App.css"



function App() {
  return (
    <div className='app' >
      <Header/>
      <SideAdmin/>
      <Footer/>
      
    </div>
  );
}

export default App;
