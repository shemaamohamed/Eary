import React from 'react'
import { getAuthUser } from '../helper/Storage'
import { Navigate, Outlet } from 'react-router-dom';

const Guest = () => {
  
   const auth = getAuthUser();
   return<>
   { !auth||auth.is_admin==0 ? <Outlet/> : <Navigate to= {"/"}/>
   
   
   }
   </>
    
}

export default Guest
