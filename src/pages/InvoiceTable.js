import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Button, Typography, Link as Links } from '@mui/material';
import StyledDataGrid from '../components/table/dataGrid';
import { Link } from 'react-router-dom';

import axios from 'axios';
import AppBreadcrumbs from '../components/breadCrumbs/breadcrumbs';

export default function InvoiceTable() {

    const [rows, setRows] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:8080/invoice/list').then((res) => {
            setRows([...res.data.result]);
        });
    }, [])

    // const rows = [{id:1, InvoiceGenDate:"28-03-2023", StudentName:"Suresh Krishnan", CourseName:"Full Stack Developer", Term:"I", TermFee:"25000", Discount:"none", TotalAmount:"25000", PaymentMethod:"Online(Google Pay)", PendingAmount:"25000", PendingTerms:"1"}]

    const columns = [
        {
            field: "id",
            headerName: "",
            width: 60,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "InvoiceGenDate",
            headerName: "Date",
            width: 120,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "StudentName",
            headerName: "Student Name",
            width: 160,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "CourseName",
            headerName: "Course Name",
            width: 180,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "FeePayingTerm",
            headerName: "Term",
            width: 70,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "TermAmount",
            headerName: "Term Fee",
            width: 100,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "Discount",
            headerName: "Discount",
            width: 130,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "TotalAmount",
            headerName: "Amount Paid",
            width: 130,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "PaymentMethod",
            headerName: "Payment Method",
            width: 160,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "PendingAmount",
            headerName: "Pending Amount",
            width: 160,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
    ];

    return (
        <div>
            <AppBreadcrumbs crntPage='Invoice Table' path='/' />
            <div style={{ background: "#FFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", padding: "20px", borderRadius: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: "bold" }}>Invoice Table</Typography>
                    <Link to='/invoice/form' underline="none"> <Button style={{ backgroundColor: "#4daaff" }} disableRipple disableElevation variant='contained'>Add New</Button></Link>
                </Box>
                <StyledDataGrid columns={columns} rows={rows} id='InvoiceID' />
            </div>
        </div>
    )
};
