/*
Component: DropDownMenu
*/

//CSS
//import styles from './DropDownMenu.module.css';

import './DropDownMenu.css';

//DropDown
import React, { useState, useEffect, useRef } from "react";
import SettingsIcon from "./icons/settings-24px.svg";
import ArrowRightIcon from "./icons/keyboard_arrow_right-24px.svg";
import PersonIcon from "./icons/person-24px.svg";
import ArrowBackIcon from "./icons/arrow_back-24px.svg";
import { CSSTransition } from "react-transition-group";

import LogoutIcon from '@mui/icons-material/Logout';
import AppsIcon from '@mui/icons-material/Apps';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LanguageIcon from '@mui/icons-material/Language';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LockPersonIcon from '@mui/icons-material/LockPerson';

import Avatar from "@mui/material/Avatar";
import profileImage from '@/photos/avt.jpg';

import { useNavigate } from 'react-router-dom';


function DropDownMenu(params) {

    //Nacti uzivatele z properties
    const oUser = params.user;

    const [activeMenu, setActiveMenu] = useState("main");
    const [menuHeight, setMenuHeight] = useState(null);
    const [open, setOpen] = useState();

    const menuRef = useRef(null);

    //Router (navigace)
    const navigate = useNavigate();
    const toggleMenu = () => {
        console.log('menu ', open);

        setOpen(prevOpen => !prevOpen);
        console.log('1');
    };

    useEffect(() => {
        console.log('menu ', open);
    }, [open]);
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        console.log('ouside', open);
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props) {

        return (
            <div>

                {props.onClick && (
                    <button
                        className="menu-item"
                        onClick={props.onClick}
                    >
                        <span className="icon-button">{props.leftIcon}</span>
                        {props.children}
                        <span className="icon-right">{props.rightIcon}</span>
                    </button>
                )}

                {!props.onClick && (
                    <button
                        className="menu-item"
                        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
                    >
                        <span className="icon-button">{props.leftIcon}</span>
                        {props.children}
                        <span className="icon-right">{props.rightIcon}</span>
                    </button>
                )}
            </div>
        );
    }

    function DropdownHeader(props) {
        return (
            <div>
                <button className="menu_header"
                    onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
                >
                    <span className="menu_header_icon">{props.leftIcon}</span>
                    {props.children}
                    <span className="icon-right">{props.rightIcon}</span>
                </button>

                <hr />
            </div>
        );
    }

    function DropdownProfile(props) {

        return (
            <div>

                {props.onClick && (
                    <button className="menu_profile"
                        onClick={props.onClick}
                    >
                        <span className="menu_profile_icon">{props.leftIcon}</span>
                        <div className='menu_profile_name' >{props.children}</div>

                        <div className='menu_profile_label'>Manage settings</div>
                        <span className="icon-right">{props.rightIcon}</span>
                    </button>
                )}

                {!props.onClick && (
                    <button className="menu_profile"
                        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
                    >
                        <span className="menu_profile_icon">{props.leftIcon}</span>
                        <div className='menu_profile_name' >{props.children}</div>

                        <div className='menu_profile_label'>Manage settings</div>
                        <span className="icon-right">{props.rightIcon}</span>
                    </button>
                )}

                <hr />
            </div>
        );
    }



    //onClick eventy - BEGIN

    function handleProfile(event) {

        console.log("Clicked: Profile");
    }

    function handleLogout(event) {

        navigate('/login'); // přesměrování na /login
    }

    function handlePhoneBook(event) {
        console.log("Clicked: Telefonni seznam");
    }

    function handleFoodMachine(event) {
        navigate('/foodmachine'); // přesměrování na /foodmachine
    }

    //onClick eventy - END


    const nodeRef1 = useRef();
    const nodeRef2 = useRef();
    const nodeRef3 = useRef();

    return (

        <div ref={menuRef} style={{ backgroundColor: '' }}>
            <div className='dropdown_button' onClick={toggleMenu}>

                <Avatar alt="profile Image" src={profileImage} />
            </div>

            {/* Dropdown Menu */}
            {open && (
                <div className="dropdown" style={{ height: menuHeight, zIndex: 9999999999999 }}>
                    <CSSTransition
                        in={activeMenu === "main"}
                        unmountOnExit
                        timeout={400}
                        classNames="menu-primary"
                        onEnter={calcHeight}
                        nodeRef={nodeRef1}
                    >
                        <div className="menu" ref={nodeRef1}>
                            {/* Profile */}
                            <DropdownProfile leftIcon={<img alt='' src={profileImage} style={{ marginLeft: 0 }}></img>} onClick={handleProfile} >{oUser.displayName}</DropdownProfile>

                            {/* Applications */}
                            <DropdownItem
                                leftIcon={<AppsIcon />}
                                rightIcon={<img src={ArrowRightIcon} alt="Arrow Right Icon" />}
                                goToMenu="apps"
                            >
                                Applications
                            </DropdownItem>

                            {/* Settings */}
                            <DropdownItem
                                leftIcon={<img src={SettingsIcon} alt="Settings Icon" />}
                                rightIcon={<img src={ArrowRightIcon} alt="Arrow Right Icon" />}
                                goToMenu="settings"
                            >
                                Settings
                            </DropdownItem>

                            {/* Logout */}
                            <DropdownItem leftIcon={<LogoutIcon />} onClick={handleLogout}>Logout</DropdownItem>
                        </div>
                    </CSSTransition>

                    {/* Submenu: Settings */}
                    <CSSTransition
                        in={activeMenu === "settings"}
                        unmountOnExit
                        timeout={400}
                        classNames="menu-secondary"
                        onEnter={calcHeight}
                        nodeRef={nodeRef2}
                    >
                        <div className="menu" ref={nodeRef2}>
                            <DropdownHeader leftIcon={<img src={ArrowBackIcon} alt="Arrow Back Icon" />} goToMenu="main">
                                Settings
                            </DropdownHeader>
                            <DropdownItem leftIcon={<AccountBoxIcon />}>Personal settings</DropdownItem>
                            <DropdownItem leftIcon={<LockPersonIcon />}>Security</DropdownItem>
                            <DropdownItem leftIcon={<LanguageIcon />}>Language</DropdownItem>
                            <DropdownItem leftIcon={<FormatListBulletedIcon />}>Activity log</DropdownItem>
                        </div>
                    </CSSTransition>

                    {/* Submenu: Applications */}
                    <CSSTransition
                        in={activeMenu === "apps"}
                        unmountOnExit
                        timeout={400}
                        classNames="menu-secondary"
                        onEnter={calcHeight}
                        nodeRef={nodeRef3}

                    >
                        <div className="menu" ref={nodeRef3}>
                            <DropdownHeader leftIcon={<img src={ArrowBackIcon} alt="Arrow Back Icon" />} goToMenu="main">
                                Applications
                            </DropdownHeader>
                            <DropdownItem leftIcon={<LocalPhoneIcon />} onClick={handlePhoneBook}>Phone book</DropdownItem>
                            <DropdownItem leftIcon={<RestaurantIcon />}>Lunch</DropdownItem>
                            <DropdownItem leftIcon={<MicrowaveIcon />} onClick={handleFoodMachine}>Food machine</DropdownItem>
                        </div>
                    </CSSTransition>
                </div>
            )}

        </div>
    );
}

export default DropDownMenu;