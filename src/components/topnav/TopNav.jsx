import React, { useContext } from 'react';

import './topnav.css';

import { Link } from 'react-router-dom';

import Dropdown from '../dropdown/Dropdown';

import notifications from '../../assets/JsonData/notification.json';

import user_image from '../../assets/images/logo1.png';

import user_menu from '../../assets/JsonData/user_menus.json';

import { context } from '../layout/Layout';



const curr_user = {
    display_name: 'SK',
    image: user_image
};


const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
);

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.image} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
    </div>
);

const Topnav = () => {
    const { setLogin } = useContext(context);

    const renderUserMenu = (item, index) => (
        <>
            {
                <Link to={item.content === "Logout" ? '/login' : "/dashboard"} key={index} onClick={() => item.content === "Logout" ? handleLogOut() : ""}>
                    <div className="notification-item" key={index}>
                        <i className={item.icon}></i>
                        <span>{item.content}</span>
                    </div>
                </Link>
            }
        </>

    );

    const handleLogOut = () => {
        setLogin("loggedOut");
        localStorage.removeItem('LoggedIN');
    };

    return (
        <div className='topnav'>
            {/* <div className="topnav__search">
                <input type="text" placeholder='Search here...' />
                <i className='bx bx-search'></i>
            </div> */}
            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle(curr_user)}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    />
                </div>
                <div className="topnav__right-item">
                    <Dropdown
                        icon='bx bx-bell'
                        badge='12'
                        contentData={notifications}
                        renderItems={(item, index) => renderNotificationItem(item, index)}
                        renderFooter={() => <Link to='/'>View All</Link>}
                    />
                    {/* dropdown here */}
                </div>
                <div className="topnav__right-item">
                    {/* <ThemeMenu /> */}
                </div>
            </div>
        </div>
    );
};

export default Topnav;
