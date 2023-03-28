import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import Students from '../pages/Students';
import Form from './Forms/Form';

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard} />
            <Route path='/customers' component={Customers} />
            <Route exact path='/students' component={Students} />
            <Route exact path='/students/forms' component={Form} />
        </Switch>
    );
};

export default Routes;
