import React from "react";
import { Container, LogOutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigator = useNavigate();

  const navItems = [
    {
      name: "home",
      slug: "./",
      active: true,
    },
    {
      name: "login",
      slug: "./login",
      active: !authStatus,
    },
    {
      name: "signup",
      slug: "./singup",
      active: !authStatus,
    },
    {
      name: "all posts",
      slug: "./all-posts",
      active: authStatus,
    },
    {
      name: "add posts",
      slug: "./add-posts",
      active: authStatus,
    },
  ];

  return (
    <>
      <header className="py-3 shadow bg-gray-500">
        <Container>
          <nav className="flex">
            <div className="mr-4">
              <Link to={"./"}> LOGO </Link>
            </div>
            <ul className="flex ml-auto" > 
                {navItems.map((item)=> item.active ? ( <li key={item.name} >
                    <button className="inline-block px-6 py-2 durtion-200 hover:bg-blue-200 rounded-full " onClick={()=> navigator(navItems.slug)} > {navItems.name  } </button>
                </li> ) : (null) )}
                { authStatus && ( <li> <LogOutBtn/> </li> ) }
            </ul>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Header;
