import React from "react";
import { Link } from "react-router-dom";
import { FiBold } from "react-icons/fi";

const NavBar = () => {
  return (
    <div>
        <nav bg="white" className="justify-content-center">
            <Link to="/">
                <FiBold />
            </Link>
        </nav>
    </div>
  )
}

export default NavBar;