import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/UserPages/Home";
import Register from "./components/pages/Login/Register";
import Login from "./components/pages/Login/Login";
import App from "./App";
import Exam from "./components/pages/UserPages/Exam";
import { ManageTest } from "./components/pages/AdminPages/ManageTests/ManageTest";
import { AddTest } from "./components/pages/AdminPages/ManageTests/AddTest";
import { UpdateTest } from "./components/pages/AdminPages/ManageTests/UpdateTest";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
import { ManageUser } from "./components/pages/AdminPages/ManageUsers/ManageUser";
import { UpdateUser } from "./components/pages/AdminPages/ManageUsers/UpdateUser";
import { AddUser } from "./components/pages/AdminPages/ManageUsers/AddUser";
import { Update } from "./components/pages/UserPages/Update";

export const routes = createBrowserRouter([
  {
    path:'',
    element:<App></App>,
    children:[
      {
        path: "/",
        element: <Home></Home>,
      },{
        element:<Guest></Guest>,
        children:[
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
          }
          ,{
            path:"/Update",
            element:<Update></Update>
          }

        ]

      },
      
      
    //   {
    //     path:"/manage_test",
    //     element:<Admin></Admin>,
    //     children:[{
    //       path:"",
    //       element:<ManageTest></ManageTest>
    //     },
    //     {
    //       path:"add_test",
    //       element:<AddTest></AddTest>
    //     }, {
    //       path: ":Namef",
    //       element: <UpdateTest />,
          
    //     }
       
        

    //     ]
    //   }
    //  , 
    //   {
    //     path:"/manage-users",
    //     element:<Admin></Admin>,
    //     children:[{
    //       path:"",
    //       element:<ManageUser></ManageUser>
    //     },
    //     {
    //       path:"add_user",
    //       element:<AddUser></AddUser>
    //     }, {
    //       path: ":Namef",
    //       element: <UpdateUser/>,
          
    //     }
       
        

    //     ]
    //   }
      
        
    ]},

{
path:'*',
element:<Navigate to={'/'}></Navigate>,
}
]);
