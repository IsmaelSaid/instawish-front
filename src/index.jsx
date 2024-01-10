import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyNavbar from './components/navbar/Navbar';
import ErrorPage from './components/error/Error';
import Register from './components/register/Register';
import Login from './components/login/Login';
import AddPost from './components/post/AddPost';
import 'bootstrap/dist/css/bootstrap.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListUsers from './components/user/ListUsers';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyNavbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path : "addPost",
        element : <AddPost/>
      },
      {
        path : "ListUsers",
        element : <ListUsers/>
      }
    ]
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);
