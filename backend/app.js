const DB = require('./DB/index');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const BodyParser = require('body-parser');
const {CourseRouter, BatchRouter, StudentRegistrationRouter, InvoiceRouter} = require('../backend/Routes/CommonRouter');
const app = express();


app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(cors());
app.use(express.json());

// connecting MySQL DB using Express
DB.connect(function (err, result) {
    if (err) {
        console.log("not connected " +err);
    } else {
        console.log("DataBase Connected.");
    }
});

// Routes
app.use('/registration', StudentRegistrationRouter);
app.use('/courses', CourseRouter);
app.use('/batches', BatchRouter);
app.use('/invoice', InvoiceRouter);

const port=process.env.port || 50000
// server connection
app.listen( port, function (err, result){
    if (err){ 
        console.log(err);
    } else {
        console.log(`listening to the Port ${port}.`);
    }
});
