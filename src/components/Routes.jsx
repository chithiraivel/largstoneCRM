import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import Students from '../pages/Students';
import RegistrationForm from './Forms/RegistrationForm';
import InvoiceTable from '../pages/InvoiceTable';
import InvoiceForm from './Forms/InvoiceForm';
import CoursesPage from '../pages/CoursesPage';
import BatchForm from './Forms/BatchForm';
import BatchesPage from '../pages/BatchesPage';
import CoursesForm from './Forms/CoursesForm';
import InvoicePrintForm from './Forms/InvoicePrintForm';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/dashboard" />
            </Route>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path='/students' component={Students} />
            <Route exact path='/students/forms' component={RegistrationForm} />
            <Route exact path='/students/forms/:action/:StudentID' component={RegistrationForm} />
            <Route exact path='/invoice' component={InvoiceTable} />
            <Route exact path='/invoice/form' component={InvoiceForm} />
            <Route exact path='/invoices/forms/:action/:InvoiceID' component={InvoiceForm} />
            <Route exact path='/invoices/generate/:InvoiceID' component={InvoicePrintForm} />
            <Route exact path='/courses/form' component={CoursesForm} />
            <Route exact path='/courses/forms/:action/:CourseID' component={CoursesForm} />
            <Route exact path='/courses' component={CoursesPage} />
            <Route exact path='/batches/form' component={BatchForm} />
            <Route exact path='/batches/forms/:action/:BatchID' component={BatchForm} />
            <Route exact path='/batches' component={BatchesPage} />
        </Switch>
    );
};

export default Routes;
