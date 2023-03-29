import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import Students from '../pages/Students';
import RegistrationForm from '../pages/RegistrationForm';
import InvoiceTable from '../pages/InvoiceTable';
import InvoiceForm from '../pages/InvoiceForm';

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard} />
            <Route path='/customers' component={Customers} />
            <Route exact path='/students' component={Students} />
            <Route exact path='/students/forms' component={RegistrationForm} />
            <Route exact path='/invoice/table' component={InvoiceTable} />
            <Route exact path='/invoice/form' component={InvoiceForm} />
        </Switch>
    );
};

export default Routes;
