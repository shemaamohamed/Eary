import { Header } from "./components/Shared/Header";
import { Footer } from "./components/Shared/Footer";
import { Update } from "./components/pages/UserPages/Update";
import { Register } from "./components/pages/Login/Register";
import { SideAdmin } from "./components/Shared/SideAdmin";

import "./components/Shared/SharedStyle/App.css";
import NavBar from "./components/Shared/NavBar";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
