import React from "react";
import { Link } from "react-router-dom";

import { Styled } from "../design/style";

const NavBar = () => {

  return (
    <div>

        <nav bg="white" className="justify-content-center py-3 pt-sm-4 pb-sm-2">
            <Link to="/">
                <Styled.NavBarLinkHome/>
            </Link>
        </nav>
        <nav bg="white" className="justify-content-center pb-3 pt-sm-1 pb-sm-2">
            <Styled.NavBarLink to="/transaction" className="px-1 px-sm-2" >
                <Styled.NavBarLinkTransactions/>
            </Styled.NavBarLink>
            <Styled.NavBarLink to="/stuff" className="px-1 px-sm-2">
                <Styled.NavBarLinkItems/>
            </Styled.NavBarLink>
        </nav>

    </div>
  )
}

export default NavBar;