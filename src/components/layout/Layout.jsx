import React, { useEffect, } from 'react';
import './layout.css';
import Sidebar from '../sidebar/Sidebar';
import TopNav from '../topnav/TopNav';
import Routes from '../Routes';
import { BrowserRouter, Redirect, Route, } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ThemeAction from '../../redux/actions/ThemeAction';
import LoginForm from '../Forms/LoginForm';

export const context = React.createContext();

const Layout = (props) => {

    const [login, setLogin] = React.useState(false);

    // const themeReducer = useSelector(state => state.ThemeReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light');
        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light');
        dispatch(ThemeAction.setMode(themeClass));
        dispatch(ThemeAction.setColor(colorClass));
    }, [dispatch, login]);

    return (
        <BrowserRouter>
            <context.Provider value={{ login, setLogin }}>
                {
                    (localStorage.getItem('LoggedIN')) ? (
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
                        )} />) : (<div>
                            <Redirect to='/login' />
                            <Route exact path="/login" component={LoginForm} />
                        </div>)
                }
            </context.Provider>
        </BrowserRouter>
    );
};

export default Layout;
