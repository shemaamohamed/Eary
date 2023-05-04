import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
     <RouterProvider router={routes} />
  </>
);



