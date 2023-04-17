import React, { useEffect, useState } from 'react';
import './layout.css';
import Sidebar from '../sidebar/Sidebar';
import TopNav from '../topnav/TopNav';
import Routes from '../Routes';
import { BrowserRouter, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThemeAction from '../../redux/actions/ThemeAction';
import LoginForm from '../Forms/LoginForm';

const Layout = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const themeReducer = useSelector(state => state.ThemeReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light');

        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light');

        dispatch(ThemeAction.setMode(themeClass));

        dispatch(ThemeAction.setColor(colorClass));
    }, [dispatch, localStorage.getItem('LoggedIN')]);

    return (
        <BrowserRouter>
            {localStorage.getItem('LoggedIN') ? (
                <Route render={(props) => (
                    <div>
                        <Sidebar {...props} />
                        <div className="layout__content">
                            <TopNav />
                            <div className="layout__content-main">
                                <Routes />
                            </div>
                        </div>
                    </div>
                )} />) : (
                <Route exact path="/login" component={LoginForm} />
            )
            }
        </BrowserRouter>
    );
};

export default Layout;
