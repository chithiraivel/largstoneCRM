import React from 'react';

import { Route, Switch } from 'react-router-dom';

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
            <Route path='/' exact component={Dashboard} />
            <Route path='/customers' component={Customers} />
            <Route exact path='/students/table' component={Students} />
            <Route exact path='/students/forms' component={RegistrationForm} />
            <Route exact path='/students/forms/:action/:StudentID' component={RegistrationForm} />
            <Route exact path='/invoice/table' component={InvoiceTable} />
            <Route exact path='/invoice/form' component={InvoiceForm} />
            <Route exact path='/invoices/forms/:action/:InvoiceID' component={InvoiceForm} />
            <Route exact path='/invoices/generate/:InvoiceID' component={InvoicePrintForm} />
            <Route exact path='/courses/form' component={CoursesForm} />
            <Route exact path='/courses/forms/:action/:CourseID' component={CoursesForm} />
            <Route exact path='/courses/table' component={CoursesPage} />
            <Route exact path='/batches/form' component={BatchForm} />
            <Route exact path='/batches/forms/:action/:BatchID' component={BatchForm} />
            <Route exact path='/batches/table' component={BatchesPage} />
        </Switch>
    );
};

export default Routes;
