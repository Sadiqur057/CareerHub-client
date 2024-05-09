import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from "react-helmet-async";
import './index.css'
import AuthProvider from './providers/AuthProvider'
import { RouterProvider } from 'react-router-dom';
import Routes from './routes/Routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <RouterProvider router={Routes}></RouterProvider>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
)
