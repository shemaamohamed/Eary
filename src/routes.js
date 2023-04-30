import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/UserPages/Home";
import Register from "./components/pages/Login/Register";
import Login from "./components/pages/Login/Login";
import App from "./App";
import Exam from "./components/pages/UserPages/Exam";
import { ManageTest } from "./components/pages/AdminPages/ManageTest";

export const routes = createBrowserRouter([
  {
    path:'',
    element:<App></App>,
    children:[
        {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path:"/Exam",
        element:<Exam></Exam>
      },
      {
        path:"/manage_test",
        element:<ManageTest></ManageTest>
      }

    ],
},
{
path:'*',
element:<Navigate to={'/'}></Navigate>,
}
]);
