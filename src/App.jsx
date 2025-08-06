import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AuthLayout, Footer, Header, Login } from "./components/index";
import { useDispatch } from "react-redux";
import authservice from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { retry } from "@reduxjs/toolkit/query";
import { Outlet, RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Editpost from "./pages/Editpost";
import AllPost from "./pages/AllPost";

function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL);

  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authservice
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(setloading(false));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/login",
          element: (
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          ),
        },
        {
          path: "/signup",
          element: (
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          ),
        },
        {
          path: "all-posts",
          element: (
            <AuthLayout authentication>
              <AllPost />
            </AuthLayout>
          ),
        },
        {
          path: "/add-post",
          element: (
            <AuthLayout>
              <Post />
            </AuthLayout>
          ),
        },
        {
          path: "/edit-post/:slug", // Note colon and slash to capture param
          element: (
            <AuthLayout>
              <Editpost />
            </AuthLayout>
          ),
        },
        {
          path: "/post/:slug", // Same here for slug param
          element: <Post />,
        },
      ],
    },
  ]);

  return !loading ? (
    <div className="min-h-screen justify-center align-middle flex flex-wrap bg-gradient-to-b from-gray-600 to-gray-900 ">
      <div className="w-full block">
        <Header />
        <main>
          <RouterProvider router={router} />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
