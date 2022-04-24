import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Styled__NavBar } from "../design/style";

const NavBar = () => {

  return (
    <div>

        <nav bg="white" className="justify-content-center py-3 pt-sm-4 pb-sm-2">
            <Link to="/">
                <Styled__NavBar.LogoNavbar size={30} />
            </Link>
        </nav>
        <nav bg="white" className="justify-content-center pb-3 pt-sm-1 pb-sm-2">
            <Styled__NavBar.CustomedNavBarLink to="/transaction" className="px-1 px-sm-2" >
                <Styled__NavBar.TransactionNavbar size={20}/>
            </Styled__NavBar.CustomedNavBarLink>
            <Styled__NavBar.CustomedNavBarLink to="/stuff" className="px-1 px-sm-2">
                <Styled__NavBar.ItemNavbar size={20} />
            </Styled__NavBar.CustomedNavBarLink>
        </nav>

    </div>
  )
}

export default NavBar;