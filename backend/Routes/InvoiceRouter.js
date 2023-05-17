const express = require('express');
const InvoiceRouter = express.Router();

const InvoiceModule = require('../student-details-backend/Modules/InvoiceModule/InvoiceModule');
const Invoice = new InvoiceModule();

InvoiceRouter.post('/:action', (req, res) => {
    Invoice.InvoiceModule(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'result': err });
        } else {
            res.json({ 'status': true, 'result': result });
        }
    });
});

InvoiceRouter.put('/:action', (req, res) => {
    Invoice.InvoiceModule(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'result': err });
        } else {
            res.json({ 'status': true, 'result': result });
        }
    });
});

InvoiceRouter.get('/:action', (req, res) => {
    Invoice.InvoiceModule(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'result': err });
        } else {
            res.json({ 'status': true, 'result': result });
        }
    });
});

InvoiceRouter.delete('/:action', (req, res) => {
    Invoice.InvoiceModule(req, (err, result) => {
        if (err) {
            res.json({ 'status': false, 'result': err });
        } else {
            res.json({ 'status': true, 'result': result });
        }
    });
});

module.exports = InvoiceRouter;
