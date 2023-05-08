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
import History from './components/pages/UserPages/History';
import { ManageExams } from "./components/pages/AdminPages/ManageExams/ManageExams";
import { AddExams } from "./components/pages/AdminPages/ManageExams/AddExams";
import { UpdateExam } from "./components/pages/AdminPages/ManageExams/UpdateExam";
import { UpdateA } from "./components/pages/AdminPages/Update";

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
        path:"/Update",
        element:<UpdateA></UpdateA>
      },
      {
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
          },
          { 
            path:"/history",
            element:<History></History>
    
          },

        ]

      },
      
      
      {
        path:"/manage-test",
        element:<Admin></Admin>,
        children:[{
          path:"",
          element:<ManageTest></ManageTest>
        },
        {
          path:"add_test",
          element:<AddTest></AddTest>
        }, {
          path: ":Namef",
          element: <UpdateTest />,
          
        }
       
        

        ]
      }
     , 
      {
        path:"/manage-users",
        element:<Admin></Admin>,
        children:[{
          path:"",
          element:<ManageUser></ManageUser>
        },
        {
          path:"add_user",
          element:<AddUser></AddUser>
        }, {
          path: ":Name",
          element: <UpdateUser/>,
          
        }
       
        

        ]
      },
      {
        path:"/manage-exams",
        element:<Admin></Admin>,
        children:[{
          path:"",
          element:<ManageExams></ManageExams>
          
        }
        ,
        
          {
            path:"add_exams",
            element:<AddExams></AddExams>
          }
          ,
          {
            path:":Name",
            element:<UpdateExam></UpdateExam>
          }
        
       
       
        

        ]
      }
    
      
        
    ]},

{
path:'*',
element:<Navigate to={'/'}></Navigate>,
}
]);
