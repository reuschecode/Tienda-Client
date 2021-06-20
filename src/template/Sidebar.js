import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io'
import { SidebarData } from "./SidebarData";
import Logo from '../assets/img/logo.svg'
import SubMenu from "./SubMenu";

const Nav = styled.div`
    background: #15171c;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const NavIcon = styled.a`
    margin-left: 2rem;
    font-size: 1.5rem;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const SidebarNav = styled.div`
    background: #15171c;
    width: 180px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({sidebar}) => (sidebar ? '0' : '-100%')};
    transition: 350ms;
    z-index: 10;
`

const SidebarWrap = styled.div`
    width: 100%;
`

const NavBtn = styled.button `
    display: flex;
    align-items: center;
    margin-right: 24px;
`;

const NavBtnLink = styled(Link)`
    border-radius: 4px;
    height: 40px;
    background: #256ce1;
    padding: 10px 22px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    margin-left: 24px;
    white-space: nowrap;
    font-size: 12px;

    @media screen and (max-width: 768px){
        font-size: 8px;
        height: 32px;
        width: 70px;
        padding-left: 8px;
    }

    @media screen and (max-width: 320px){
        font-size: 8px;
        height: 32px;
    }

    &:hover{
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`;


const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    cursor: pointer;
    height:100%;

    &.active{
        color: #15cdfc;
    }
`;

const H2 = styled.h1`
    white-space: nowrap;
    font-size: 25px;
    @media screen and (max-width: 768px){
        font-size: 15px;
    }
`

const Image = styled.img`
    max-width:80%;
    max-height:80%;
    padding-right: 10px;
`

const Sidebar = ({user}) =>{

    const [sidebar, setSidebar] = useState(false);

    const showSideBar = () => setSidebar(!sidebar);
    const logout = () => localStorage.removeItem('token');

    return (
        <React.Fragment>
            <Nav>
                <NavIcon to="/dashboard">
                    <FaIcons.FaBars onClick={showSideBar}/>
                </NavIcon>
                <NavLink to="/dashboard">
                    <Image src={Logo} alt="Logo"></Image>
                    <H2> Mundo Móvil</H2>
                </NavLink>
                <NavBtn>
                    <NavBtnLink to='/' onClick={logout}>Cerrar sesión</NavBtnLink>
                </NavBtn>
            </Nav>
            <SidebarNav sidebar={sidebar}>
                <SidebarWrap>
                    <NavIcon to="/dashboard">
                        <IoIcons.IoMdArrowRoundBack onClick={showSideBar}/>
                    </NavIcon>
                    {SidebarData.map((item, index) => {
                        return <SubMenu item={item} user={user} key={index}/>;
                    })}
                </SidebarWrap>
            </SidebarNav>
        </React.Fragment>
    );
}

export default Sidebar;
