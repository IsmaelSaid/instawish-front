import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './components/navbar/Navbar';
import ErrorPage from './components/error/Error';
import Register from './components/register/Register';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
    ]
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
