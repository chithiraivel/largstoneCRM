import React from 'react';

import { Link } from 'react-router-dom';

import './sidebar.css';

import logo from '../../assets/images/favicon.png';

import sidebar_items from '../../assets/JsonData/sidebar_routes.json';

const SidebarItem = props => {

    const active = props.active ? 'active' : '';

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    );
};

const Sidebar = props => {

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <Link to='/dashboard'>
                    <img src={logo} alt="company logo" height='40' width="40"/>
                </Link>
            </div>
            {
                sidebar_items.map((item, index) => (
                    <Link to={item.route} key={index}>
                        <SidebarItem
                            title={item.display_name}
                            icon={item.icon}
                            active={props.location.pathname.includes(item.route)}
                        />
                    </Link>
                ))
            }
        </div>
    );
};

export default Sidebar;
