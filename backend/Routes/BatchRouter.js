const express = require('express');
const BatchRouter = express.Router();

const BatchModule = require('../student-details-backend/Modules/BatchModule/BatchModule');
const Batch = new BatchModule();

BatchRouter.post('/:action', (req, res) => {
    Batch.BatchesModule(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'result': err });
        } else {
            res.json({ 'status': true, 'result': result });
        }
    });
});

BatchRouter.put('/:action', (req, res) => {
    Batch.BatchesModule(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'result': err });
        } else {
            res.json({ 'status': true, 'result': result });
        }
    });
});

BatchRouter.get('/:action', (req, res) => {
    Batch.BatchesModule(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'result': err });
        } else {
            res.json({ 'status': true, 'result': result });
        }
    });
});

BatchRouter.delete('/:action', (req, res) => {
    Batch.BatchesModule(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'result': err });
        } else {
            res.json({ 'status': true, 'result': result });
        }
    });
});

module.exports = BatchRouter;