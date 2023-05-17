const express = require('express');
const StudentRegistrationRouter = express.Router();

const RegistrationModule = require('../student-details-backend/Modules/StudentRegistration/StudentRegistrationModule');
const Course = new RegistrationModule();

StudentRegistrationRouter.post('/:action', (req, res) => {
    Course.RegistrationModule(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'result': err });
        } else {
            res.json({ 'status': true, 'result': result });
        }
    });
});

StudentRegistrationRouter.put('/:action', (req, res) => {
    Course.RegistrationModule(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'result': err });
        } else {
            res.json({ 'status': true, 'result': result });
        }
    });
});

StudentRegistrationRouter.get('/:action', (req, res) => {
    Course.RegistrationModule(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'result': err });
        } else {
            res.json({ 'status': true, 'result': result });
        }
    });
});

StudentRegistrationRouter.delete('/:action', (req, res) => {
    Course.RegistrationModule(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'result': err });
        } else {
            res.json({ 'status': true, 'result': result });
        }
    });
});

module.exports = StudentRegistrationRouter;
