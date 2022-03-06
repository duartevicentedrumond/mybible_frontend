import React from "react";
import { Link } from "react-router-dom";
import { FiBold } from "react-icons/fi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";

const NavBar = () => {
  return (
    <div>

        <nav bg="white" class="justify-content-center py-3 pt-sm-4 pb-sm-2">
            <Link to="/">
                <FiBold size={30} />
            </Link>
        </nav>
        <nav bg="white" class="justify-content-center pb-3 pt-sm-1 pb-sm-2">
            <Link to="/transaction" class="px-1 px-sm-2">
                <MdOutlineAttachMoney size={20} />
            </Link>
            <Link to="/stuff" class="px-1 px-sm-2">
                <BsBoxSeam size={20} />
            </Link>
        </nav>

    </div>
  )
}

export default NavBar;