import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MainTextColor = "#545454";
const MainTextSize = 15;
const HeaderTextSize = MainTextSize + 2;
const RowBorderColor = "#d9d3d5";

const CustomedLink = styled(Link)`
    text-decoration: none;
    color: ${MainTextColor};
    
    &:hover {
        transition: .3s ease-in-out;
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

export const Styled__Table = {
    RowLink,
    Header,
    HeaderColumn,
    Body
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

export const Styled__Title = {
    MainTitle
};

const MainInputTextSize = MainTextSize;

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

export const Styled__Input = {
    Main,
    Label,
    Input
};