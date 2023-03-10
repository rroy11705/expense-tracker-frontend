import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MainLayout } from '../../styles/Layouts'
import avatar from '../../img/avatar.png'
import { menuItems } from '../../utils/menuItems'
import Button from '../Button/Button'
import { Outlet, Link, useLocation  } from "react-router-dom";
import { bars } from '../../utils/Icons'
import { useWindowSize } from '../../utils/useWindowSize'

const Layout = () => {
    const  { width, height } = useWindowSize()
    const [isCollapsed, setCollapsed] = useState(false);
    const [isMobileDevice, setMobileDevice] = useState(false)
    const location = useLocation ();
    
    console.log(isMobileDevice)
    useEffect(() => {
        if (width < 576) {
            setCollapsed(true);
            setMobileDevice(true)
        }
    }, [width, height])

    const isActiveLink = (path) => {
        const { pathname } = location;
        if (pathname === path) {
          return true;
        }
        return false;
    };

    const collapseNav = () => {
        setCollapsed(prev => !prev)
    }

    return (
        <MainLayout isMobileDevice={isMobileDevice}>
            <NavStyled isMobileDevice={isMobileDevice} isCollapsed={isCollapsed}>
                <div className='hamburger'>
                    <Button 
                        icon={bars}
                        bPad={0}
                        bRad={0}
                        bg={'transparent'}
                        color={'#fff'}
                        iColor={'#fff'}
                        hColor={'var(--color-green)'}
                        onClick={() => collapseNav()}
                    />
                </div>
                <div className="user-icon">
                    <img src={avatar} alt="" />
                    <div className="text">
                        <h2>Roy</h2>
                        <p>Software Developer</p>
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
    width: ${props => props.isCollapsed ? props.isMobileDevice ? '40px' : '72px' : '300px'};
    height: 100%;
    background: #202020;
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    @media (max-width: 576px) {
        padding: ${props => props.isCollapsed ? '2rem 0.5rem' :'2rem 1.5rem'};
        width: ${props => props.isCollapsed ? '40px' :'calc(100vw - 2rem)'}
    }
    .hamburger {
        display: flex;
        width: 100%;
        justify-content: ${props => props.isCollapsed ? 'center' : 'start'};
    }
    .user-icon {
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: ${props => props.isCollapsed ? '24px' : '80px'};
            height: ${props => props.isCollapsed ? '24px' : '80px'};
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #FFFFFF;
            padding: .2rem;
        }
        h2{
            color: #ECECEC;
            display: ${props => props.isCollapsed ? 'none' : 'block'}
        }
        p{
            color: #ECECECA0;
            display: ${props => props.isCollapsed ? 'none' : 'block'}
        }
    }

    .menu-items {
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
            position: relative;
            span {
                display: ${props => props.isCollapsed ? 'none' : 'block'}
            }
            i {
                color: #ECECECA0;
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active > a {
        color: #FFFFFF !important;
        span {
            display: ${props => props.isCollapsed ? 'none' : 'block'}
        }
        i{
            color: #FFFFFF !important;
        }
    }
`;

export default Layout