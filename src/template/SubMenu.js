import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled.a`
    display: flex;
    color: #e1e9fc;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height: 30px;
    text-decoration: none;
    font-size: 12px;

    &:hover {
        background: #252831;
        border-left: 4px solid #632ce4;
        cursor: pointer;
    }
`;

const SidebarLabel = styled.span`
    margin-left: 16px;
`;

const DropdownLink = styled(Link)`
    background: #414757;
    height: 30px;
    padding-left: 2.25rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 12px;

    &:hover {
        background: #632ce4;
        cursor: pointer;
    }
`

const SubMenu = ({item, user}) => {
    const [subnav, setSubNav] = useState(false);

    const showSubNav = () => {setSubNav(!subnav)};

    return (
        <React.Fragment>
            <SidebarLink onClick={item.subNav && showSubNav}>
                <div>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </div>
                <div>
                    {item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed: null}
                </div>
            </SidebarLink>
            {subnav && item.subNav.map ((item, index) => {
                return (
                    <DropdownLink to={{pathname: item.path, state: user}} key={index}>
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </DropdownLink>
                )
            })}
        </React.Fragment>
    );
}

export default SubMenu;