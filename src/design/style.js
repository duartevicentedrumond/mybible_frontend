import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdOutlineAttachMoney } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { FiBook, FiUser } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const backgroundColor = "#F5F5F5";

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

const highlightText = {
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

const titleText = {
    normal: {
        color: text.normal.color,
        size: text.normal.size + 20,
        weight: text.normal.weight + 300
    },
    hover: {
        color: text.hover.color,
        size: text.hover.size + 20,
        weight: text.hover.weight + 300
    }
};

const linkText = {
    normal: {
        color: text.normal.color,
        size: text.normal.size,
        weight: text.normal.weight,
        decoration: 'none',
        transition: '0.3s ease-in-out',
        border: 'none',
        backgroundColor: 'white'
    },
    hover: {
        color: text.hover.color,
        size: text.hover.size,
        weight: text.hover.weight,
        decoration: 'none',
        transform: 'scale(1.5)',
        border: 'none',
        backgroundColor: 'white'
    }
};

const titleLinkText = { 
    normal: {
        color: linkText.normal.color,
        size: linkText.normal.size + 5,
        weight: linkText.normal.weight + 300,
        decoration: linkText.normal.decoration,
        transition: linkText.normal.transition,
        border: linkText.normal.border,
        backgroundColor: linkText.normal.backgroundColor
    },
    hover: {
        color: linkText.hover.color,
        size: linkText.normal.size + 5,
        weight: linkText.hover.weight + 300,
        decoration: 'underline',
        transform: linkText.hover.transform,
        border: linkText.hover.border,
        backgroundColor: linkText.hover.backgroundColor
    }
};

/* table style */

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
        transform: ${linkText.hover.transform};
    }
`;

const TableTitleColumn = styled.th`
    color: ${highlightText.normal.color};
    font-size: ${highlightText.normal.size}px;
    font-weight: ${highlightText.normal.weight};
`;

const TablePaginate = styled(ReactPaginate).attrs(
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

const TableRow = styled.th`
    color: ${text.normal.color};
    font-size: ${text.normal.size}px;
    font-weight: ${text.normal.weight};
    text-decoration: ${text.normal.decoration};
    transition: ${text.normal.transition};
    background-color: red

    &:hover {
        color: ${text.normal.color};
        font-size: ${text.normal.size}px;
        font-weight: ${text.normal.weight};
        text-decoration: ${text.normal.decoration};
        transform: ${text.normal.transform};
    }
`;

const TableFormInput = styled.input`
    color: ${text.normal.color};
    font-size: ${text.normal.size}px;
    font-weight: ${text.normal.weight};
    border: none;
    outline: none;
    background-color: white;
`;

/* navbar style */

const NavBarLink = styled(Link)`
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
        transform: ${linkText.hover.transform}
    }
`;

const NavBarLinkTransactions = styled(MdOutlineAttachMoney)`
    color: ${linkText.normal.color};
    font-size: ${linkText.normal.size + 10}px;
    font-weight: ${linkText.normal.weight};
    text-decoration: ${linkText.normal.decoration};
    transition: ${linkText.normal.transition};
        
    &:hover {
        color: ${linkText.hover.color};
        font-size: ${linkText.normal.size + 10}px;
        font-weight: ${linkText.hover.weight};
        text-decoration: ${linkText.hover.decoration};
        transform: ${linkText.hover.transform}
    }
`;

const NavBarLinkItems = styled(BsBoxSeam)`
    color: ${linkText.normal.color};
    font-size: ${linkText.normal.size + 10}px;
    font-weight: ${linkText.normal.weight};
    text-decoration: ${linkText.normal.decoration};
    transition: ${linkText.normal.transition};
        
    &:hover {
        color: ${linkText.hover.color};
        font-size: ${linkText.normal.size + 10}px;
        font-weight: ${linkText.hover.weight};
        text-decoration: ${linkText.hover.decoration};
        transform: ${linkText.hover.transform}
    }
`;

const NavBarLinkPeople = styled(FiUser)`
    color: ${linkText.normal.color};
    font-size: ${linkText.normal.size + 10}px;
    font-weight: ${linkText.normal.weight};
    text-decoration: ${linkText.normal.decoration};
    transition: ${linkText.normal.transition};
        
    &:hover {
        color: ${linkText.hover.color};
        font-size: ${linkText.normal.size + 10}px;
        font-weight: ${linkText.hover.weight};
        text-decoration: ${linkText.hover.decoration};
        transform: ${linkText.hover.transform}
    }
`;

const NavBarLinkHome = styled(FiBook)`
    color: ${linkText.normal.color};
    font-size: ${linkText.normal.size + 10}px;
    font-weight: ${linkText.normal.weight};
    text-decoration: ${linkText.normal.decoration};
    transition: ${linkText.normal.transition};
        
    &:hover {
        color: ${linkText.hover.color};
        font-size: ${linkText.normal.size + 10}px;
        font-weight: ${linkText.hover.weight};
        text-decoration: ${linkText.hover.decoration};
        transform: ${linkText.hover.transform}
    }
`;

/* secondary navbar style */

const SecondaryNavBarLink = styled(Link)`
    color: ${titleLinkText.normal.color};
    font-size: ${titleLinkText.normal.size}px;
    font-weight: ${titleLinkText.normal.weight};
    text-decoration: ${titleLinkText.normal.decoration};
    transition: ${titleLinkText.normal.transition};

    &:hover {
        color: ${titleLinkText.hover.color};
        font-size: ${titleLinkText.hover.size}px;
        font-weight: ${titleLinkText.hover.weight};
        text-decoration: ${titleLinkText.hover.decoration};
    }
`;

/* title style */

const Title = styled.h2`
    color: ${titleText.normal.color};
    font-size: ${titleText.normal.size}px;
    font-weight: ${titleText.normal.weight};
`;

const TitleButton = styled.button`
    color: ${titleLinkText.normal.color};
    font-size: ${titleLinkText.normal.size + 10}px;
    font-weight: ${titleLinkText.normal.weight};
    text-decoration: ${titleLinkText.normal.decoration};
    transition: ${titleLinkText.normal.transition};
    border: ${titleLinkText.normal.border};
    background-color: ${titleLinkText.normal.backgroundColor};
    margin-right: 5px;
        
    &:hover {
        color: ${titleLinkText.hover.color};
        font-size: ${titleLinkText.hover.size + 10}px;
        font-weight: ${titleLinkText.hover.weight};
        text-decoration: ${titleLinkText.hover.decoration};
        transform: ${titleLinkText.hover.transform};
        border: ${titleLinkText.hover.border};
        background-color: ${titleLinkText.hover.backgroundColor};
        margin-right: 5px;
    }
`;

/* form style */

const FormLabel = styled.label`
    color: ${text.normal.color};
    font-size: ${text.normal.size + 5}px;
    font-weight: ${text.normal.weight + 300};
    padding-right: 10px;
`;

const FormInput = styled.input`
    color: ${text.normal.color};
    font-size: ${text.normal.size + 5}px;
    font-weight: ${text.normal.weight};
    border: none;
    outline: none;
`;

const FormSwitch = styled.input`

    &:checked {
        border-color: ${text.normal.color};
        background-color: ${text.normal.color};
    }

    &:focus {
        border-color: ${text.normal.color};
    }
`;

const FormButton = styled.a`
    color: ${linkText.normal.color};
    font-size: ${linkText.normal.size + 10}px;
    font-weight: ${linkText.normal.weight};
    text-decoration: ${linkText.normal.decoration};
    transition: ${linkText.normal.transition};
    border: ${linkText.normal.border};
    background-color: ${linkText.normal.backgroundColor};
    margin-right: 10px;
    margin-top: 2px;
        
    &:hover {
        color: ${linkText.hover.color};
        font-size: ${linkText.normal.size + 10}px;
        font-weight: ${linkText.hover.weight};
        text-decoration: ${linkText.hover.decoration};
        transform: ${linkText.hover.transform};
        border: ${linkText.hover.border};
        background-color: ${linkText.hover.backgroundColor};
        margin-right: 10px;
        margin-top: 2px;
    }
`;

const FormDate = styled(DatePicker)`
    color: ${text.normal.color};
    font-size: ${text.normal.size + 5}px;
    font-weight: ${text.normal.weight};
    border: none;
    outline: none;
`;

const FormSelect = styled.select`
    color: ${text.normal.color};
    font-size: ${text.normal.size + 5}px;
    font-weight: ${text.normal.weight};
    border: none;
    outline: none;
    appearance: none;
`;

const FormSearchBar = styled.input`
    color: ${text.normal.color};
    font-size: ${text.normal.size}px;
    font-weight: ${text.normal.weight};
    border: none;
    outline: none;
    appearance: none;
    border-radius: 25px;
    background-color: ${backgroundColor};
`;

/* info text style */

const InfoHashTagText = styled.div`
    color: ${text.normal.color};
    font-size: ${text.normal.size}px;
    font-weight: ${text.normal.weight};
    border: none;
    outline: none;
    appearance: none;
    border-radius: 5px;
    background-color: ${backgroundColor};
`;

const InfoText = styled.div`
    color: ${text.normal.color};
    font-size: ${text.normal.size}px;
    font-weight: ${text.normal.weight};
    border: none;
    outline: none;
`;

/* settings style */

const SettingsLink = styled(Link)`
    color: ${titleLinkText.normal.color};
    font-size: ${titleLinkText.normal.size}px;
    font-weight: ${titleLinkText.normal.weight};
    text-decoration: ${titleLinkText.normal.decoration};
    transition: ${titleLinkText.normal.transition};

    &:hover {
        color: ${titleLinkText.hover.color};
        font-size: ${titleLinkText.hover.size}px;
        font-weight: ${titleLinkText.hover.weight};
        text-decoration: ${titleLinkText.hover.decoration};
    }
`;

export const Styled = {
    TableRowLink,
    TableRow,
    TableTitleColumn,
    TablePaginate,
    TableFormInput,
    NavBarLink,
    NavBarLinkTransactions,
    NavBarLinkItems,
    NavBarLinkPeople,
    NavBarLinkHome,
    SecondaryNavBarLink,
    Title,
    TitleButton,
    FormLabel,
    FormButton,
    FormInput,
    FormSwitch,
    FormDate,
    FormSelect,
    FormSearchBar,
    InfoText,
    InfoHashTagText,
    SettingsLink
};

const InfoTitle = styled.h2`
    font-size: ${titleLinkText.normal.size}px;
    font-weight: 700;
    color: ${text.normal.color};
`;

const InfoItem = styled.p`
    font-size: ${text.normal.size}px;
    font-weight: 400;
    color: ${text.normal.color};
    margin-bottom: 0px;
`;

export const Styled__Title = {
    InfoTitle,
    InfoItem
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
        background-color: ${backgroundColor};;
    }
    
`;

export const Styled__SideBar = {
    ParentChild
};