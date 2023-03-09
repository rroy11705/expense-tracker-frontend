import React from 'react'
import styled from 'styled-components'
import {MainLayout} from '../../styles/Layouts'
import avatar from '../../img/avatar.png'
import { menuItems } from '../../utils/menuItems'
import { Outlet, Link, useLocation  } from "react-router-dom";

const Layout = () => {
  const location = useLocation ();

    const isActiveLink = (path) => {
        const { pathname } = location;
        if (pathname === path) {
          return true;
        }
        return false;
    };

    return (
        <MainLayout>
            <NavStyled>
                <div className="user-icon">
                    <img src={avatar} alt="" />
                    <div className="text">
                        <h2>Roy</h2>
                        <p>Sodtware Developer</p>
                    </div>
                </div>
                <ul className="menu-items">
                    {menuItems.map((item) => {
                        return (
                            <li
                                key={item.id}
                                className={isActiveLink(item.link) ? 'active': ''}
                            >
                                <Link to={item.link}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </NavStyled>
            <main>
                <Outlet />
            </main>
        </MainLayout>
)}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 300px;
    height: 100%;
    background: #202020;
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    @media (max-width: 576px) {
        display: none;
    }
    .user-icon{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #FFFFFF;
            padding: .2rem;
        }
        h2{
            color: #ECECEC;
        }
        p{
            color: #ECECECA0;
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li > a {
            text-decoration: none;
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: #ECECECA0;
            padding-left: 1rem;
            position: relative;
            i{
                color: #ECECECA0;
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active > a{
        color: #FFFFFF !important;
        i{
            color: #FFFFFF !important;
        }
    }
`;

export default Layout