import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdOutlineAttachMoney } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { FiBold } from "react-icons/fi";
import ReactPaginate from "react-paginate";

const MainTextColor = "#545454";
const MainTextSize = 15;
const HeaderTextSize = MainTextSize + 2;
const RowBorderColor = "#d9d3d5";

const CustomedLink = styled(Link)`
    text-decoration: none;
    color: ${MainTextColor};
    transition: .3s ease-in-out;
    
    &:hover {
        text-decoration: none;
        color: ${MainTextColor};
    }
    
`;

const RowLink = styled(CustomedLink)`
    font-size: ${MainTextSize}px;
    font-weight: 400;

    &:hover {
        font-size: ${MainTextSize + 1}px;
    }
`;

const HeaderColumn = styled.th`
    font-size: ${HeaderTextSize}px;
    font-weight: 500;
    color: ${MainTextColor};
`;

const Header = styled.tr`
    border-color: ${RowBorderColor};
    border-top: 10;
`;

const Body = styled.tbody`
    border-color: ${RowBorderColor};
`;

const ReactPaginateTable = styled(ReactPaginate).attrs(
    props => ({
        containerClassName: props.containerClassName
    })
)`
    
    font-size: ${MainTextSize}px;
    list-style: none;
    text-decoration: none;
    color: ${MainTextColor};

    a {
        text-decoration: none;
        color: ${MainTextColor};
        transition: .3s ease-in-out;
        padding-right: 10px;
        
        &:hover {
            text-decoration: none;
            color: ${MainTextColor};
            font-size: ${MainTextSize+2}px;
        }
    }

    .paginationActive a {
        text-decoration: none;
        color: ${MainTextColor};
        transition: .3s ease-in-out;
        padding-right: 10px;
        font-weight: 700;
    }
`;

export const Styled__Table = {
    RowLink,
    Header,
    HeaderColumn,
    Body,
    ReactPaginateTable
};

const CustomedNavBarLink = styled(Link)`
    text-decoration: none;
    color: ${MainTextColor};
    transition: .3s ease-in-out;
    
    &:hover {
        text-decoration: none;
        transform: scale(1.2);
        color: ${MainTextColor};
    }
    
`;

const TransactionNavbar = styled(MdOutlineAttachMoney)`
    text-decoration: none;
        color: ${MainTextColor};
        transition: .3s ease-in-out;
        
        &:hover {
            text-decoration: none;
            transform: scale(1.2);
            color: ${MainTextColor};
        }
`;

const ItemNavbar = styled(BsBoxSeam)`
    text-decoration: none;
        color: ${MainTextColor};
        transition: .3s ease-in-out;
        
        &:hover {
            text-decoration: none;
            transform: scale(1.2);
            color: ${MainTextColor};
        }
`;

const LogoNavbar = styled(FiBold)`
    text-decoration: none;
        color: ${MainTextColor};
        transition: .3s ease-in-out;
        
        &:hover {
            text-decoration: none;
            transform: scale(1.2);
            color: ${MainTextColor};
        }
`;

export const Styled__NavBar = {
    CustomedNavBarLink,
    TransactionNavbar,
    ItemNavbar,
    LogoNavbar
};

const NavTextSize = MainTextSize + 5;

const TabLink = styled(CustomedLink)`
    font-size: ${NavTextSize}px;
    font-weight: 700;

    &:hover {
        text-decoration: underline;
    }
`;

export const Styled__Nav = {
    TabLink
};

const MainTitleSize = MainTextSize + 20;

const MainTitle = styled.h2`
    font-size: ${MainTitleSize}px;
    font-weight: 700;
    color: ${MainTextColor};
`;

const InfoTitle = styled.h2`
    font-size: ${NavTextSize}px;
    font-weight: 700;
    color: ${MainTextColor};
`;

const InfoItem = styled.p`
    font-size: ${MainTextSize}px;
    font-weight: 400;
    color: ${MainTextColor};
    margin-bottom: 0px;
`;

const Button = styled.button`
    font-size: ${MainTitleSize-10}px;
    color: ${MainTextColor};
    border: none;
    background-color: white;
    transition: .3s ease-in-out;

    &:hover {
        text-decoration: none;
        font-size: ${MainTitleSize-5}px;
    }
`;

export const Styled__Title = {
    MainTitle,
    Button,
    InfoTitle,
    InfoItem
};

const MainInputTextSize = MainTextSize;
const SearchBarColor = "#F5F5F5";

const Main = styled.div`
    font-size: ${MainInputTextSize + 5}px;
    color: ${MainTextColor};
`;

const Label = styled.label`
    font-weight: 700;
    margin-right: 10px;
`;

const Input = styled.input`
    margin-right: 10px;
    border: none;
    outline: none;
    color: ${MainTextColor};
`;

const Select = styled.select`
    margin-right: 10px;
    border: none;
    outline: none;
    color: ${MainTextColor};
    appearance: none;
`;

const SearchBar = styled.input`
    border: none;
    border-radius: 25px;
    outline: none;
    color: ${MainTextColor};
    background-color: ${SearchBarColor};
`;

export const Styled__Input = {
    Main,
    Label,
    Input,
    Select,
    SearchBar
};

const ParentChild = styled(Link)`
    text-decoration: none;
    color: ${MainTextColor};
    transition: .3s ease-in-out;
    font-size: ${MainTextSize}px;
    border: none;
    border-radius: 25px;
    padding-left: 20px;
    padding-right: 20px;
    
    &:hover {
        text-decoration: none;
        color: ${MainTextColor};
        background-color: ${SearchBarColor};
    }
    
`;

export const Styled__SideBar = {
    ParentChild
};