const express = require('express');
const CourseRouter = express.Router();

const CourseModule = require('../student-details-backend/Modules/CourseModule/CourseModule');
const Course = new CourseModule();

CourseRouter.post('/:action', (req, res) => {
    Course.CoursesModule(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'result': err });
        } else {
            res.json({ 'status': true, 'result': result });
        }
    });
});


CourseRouter.get('/:action', (req, res) => {
    Course.CoursesModule(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'result': err });
        } else {
            res.json({ 'status': true, 'result': result });
        }
    });
});

CourseRouter.put('/:action', (req, res) => {
    Course.CoursesModule(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'result': err });
        } else {
            res.json({ 'status': true, 'result': result });
        }
    });
});

CourseRouter.delete('/:action', (req, res) => {
    Course.CoursesModule(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'result': err });
        } else {
            res.json({ 'status': true, 'result': result });
        }
    });
});
module.exports = CourseRouter;
