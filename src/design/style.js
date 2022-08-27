import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdOutlineAttachMoney } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { FiBold } from "react-icons/fi";
import ReactPaginate from "react-paginate";

const text = {
    normal: {
        color: "#545454",
        size: 15,
        weight: 400
    },
    hover: {
        color: "#545454",
        size: 16,
        weight: 400
    }
};

const titleText = {
    normal: {
        color: text.normal.color,
        size: text.normal.size + 2,
        weight: text.normal.weight + 100
    },
    hover: {
        color: text.hover.color,
        size: text.hover.size + 2,
        weight: text.hover.weight + 100
    }
};

const linkText = {
    normal: {
        color: text.normal.color,
        size: text.normal.size,
        weight: text.normal.weight,
        decoration: 'none',
        transition: '0.3s ease-in-out'
    },
    hover: {
        color: text.hover.color,
        size: text.hover.size,
        weight: text.hover.weight,
        decoration: 'none',
    }
};

const CustomedLink = styled(Link)`
    text-decoration: ${linkText.normal.decoration};
    color: ${linkText.normal.color};
    transition: ${linkText.normal.transition};
    
    &:hover {
        text-decoration: none;
        color: ${linkText.hover.color};
    }
`;

{/* table style */}

const TableRowLink = styled(Link)`
    color: ${linkText.normal.color};
    font-size: ${linkText.normal.size}px;
    font-weight: ${linkText.normal.weight};
    text-decoration: ${linkText.normal.decoration};
    transition: ${linkText.normal.transition};

    &:hover {
        color: ${linkText.hover.color};
        font-size: ${linkText.hover.size}px;
        font-weight: ${linkText.hover.weight};
        text-decoration: ${linkText.hover.decoration};
    }
`;

const TableTitleColumn = styled.th`
    color: ${titleText.normal.color};
    font-size: ${titleText.normal.size}px;
    font-weight: ${titleText.normal.weight};
`;

const ReactPaginateTable = styled(ReactPaginate).attrs(
    props => ({
        containerClassName: props.containerClassName
    })
)`
    
    font-size: ${text.normal.size}px;
    list-style: none;
    text-decoration: none;
    color: ${text.normal.color};

    a {
        text-decoration: none;
        color: ${text.normal.color};
        transition: .3s ease-in-out;
        padding-right: 10px;
        
        &:hover {
            text-decoration: none;
            color: ${text.normal.color};
            font-size: ${text.normal.size+2}px;
        }
    }

    .paginationActive a {
        text-decoration: none;
        color: ${text.normal.color};
        transition: .3s ease-in-out;
        padding-right: 10px;
        font-weight: 700;
    }
`;

export const Styled = {
    TableRowLink,
    TableTitleColumn,
    ReactPaginateTable
};

const CustomedNavBarLink = styled(Link)`
    text-decoration: none;
    color: ${text.normal.color};
    transition: .3s ease-in-out;
    
    &:hover {
        text-decoration: none;
        transform: scale(1.2);
        color: ${text.normal.color};
    }
    
`;

const TransactionNavbar = styled(MdOutlineAttachMoney)`
    text-decoration: none;
        color: ${text.normal.color};
        transition: .3s ease-in-out;
        
        &:hover {
            text-decoration: none;
            transform: scale(1.2);
            color: ${text.normal.color};
        }
`;

const ItemNavbar = styled(BsBoxSeam)`
    text-decoration: none;
        color: ${text.normal.color};
        transition: .3s ease-in-out;
        
        &:hover {
            text-decoration: none;
            transform: scale(1.2);
            color: ${text.normal.color};
        }
`;

const LogoNavbar = styled(FiBold)`
    text-decoration: none;
        color: ${text.normal.color};
        transition: .3s ease-in-out;
        
        &:hover {
            text-decoration: none;
            transform: scale(1.2);
            color: ${text.normal.color};
        }
`;

export const Styled__NavBar = {
    CustomedNavBarLink,
    TransactionNavbar,
    ItemNavbar,
    LogoNavbar
};

const NavTextSize = text.normal.size + 5;

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

const MainTitleSize = text.normal.size + 20;

const MainTitle = styled.h2`
    font-size: ${MainTitleSize}px;
    font-weight: 700;
    color: ${text.normal.color};
`;

const InfoTitle = styled.h2`
    font-size: ${NavTextSize}px;
    font-weight: 700;
    color: ${text.normal.color};
`;

const InfoItem = styled.p`
    font-size: ${text.normal.size}px;
    font-weight: 400;
    color: ${text.normal.color};
    margin-bottom: 0px;
`;

const Button = styled.button`
    font-size: ${MainTitleSize-10}px;
    color: ${text.normal.color};
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

const MainInputTextSize = text.normal.size;
const SearchBarColor = "#F5F5F5";

const Main = styled.div`
    font-size: ${MainInputTextSize + 5}px;
    color: ${text.normal.color};
`;

const Label = styled.label`
    font-weight: 700;
    margin-right: 10px;
`;

const Input = styled.input`
    margin-right: 10px;
    border: none;
    outline: none;
    color: ${text.normal.color};
`;

const Select = styled.select`
    margin-right: 10px;
    border: none;
    outline: none;
    color: ${text.normal.color};
    appearance: none;
`;

const SearchBar = styled.input`
    border: none;
    border-radius: 25px;
    outline: none;
    color: ${text.normal.color};
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
    color: ${text.normal.color};
    transition: .3s ease-in-out;
    font-size: ${text.normal.size}px;
    border: none;
    border-radius: 25px;
    padding-left: 20px;
    padding-right: 20px;
    
    &:hover {
        text-decoration: none;
        color: ${text.normal.color};
        background-color: ${SearchBarColor};
    }
    
`;

export const Styled__SideBar = {
    ParentChild
};