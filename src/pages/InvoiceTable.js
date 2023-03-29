import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Button, Typography, Link as Links } from '@mui/material';
import StyledDataGrid from '../components/table/dataGrid';
import { Link } from 'react-router-dom';

import axios from 'axios';
import AppBreadcrumbs from '../components/breadCrumbs/breadcrumbs';

export default function InvoiceTable() {

    // const [rows, setRows] = useState([]);
    // useEffect(() => {
    //     axios.post('http://localhost:8080/register/listall').then((res) => {
    //         setRows([...res.data.result]);
    //     });
    // }, [])

    const rows = [{id:1, InvoiceGenDate:"28-03-2023", StudentName:"Suresh Krishnan", CourseName:"Full Stack Developer", Term:"I", TermFee:"25000", Discount:"none", TotalAmount:"25000", PaymentMethod:"Online(Google Pay)"}]

    const columns = [
        {
            field: "id",
            headerName: "Sl.No",
            width: 60,
            editable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: "center",
            align: "center"
        },
        {
            field: "InvoiceGenDate",
            headerName: "Date",
            width: 120,
            editable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: "center", align: "center"
        },
        {
            field: "StudentName",
            headerName: "Student Name",
            width: 160,
            editable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: "center",
            align: "center"
        },
        {
            field: "CourseName",
            headerName: "Course Name",
            width: 160,
            editable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: "center",
            align: "center"
        },
        {
            field: "Term",
            headerName: "Term",
            width: 100,
            editable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: "center",
            align: "center"
        },
        {
            field: "TermFee",
            headerName: "Term Fee.",
            width: 160,
            editable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: "center",
            align: "center"
        },
        {
            field: "Discount",
            headerName: "Discount",
            width: 100,
            editable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: "center",
            align: "center"
        },
        {
            field: "TotalAmount",
            headerName: "Total Amount",
            width: 160,
            editable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: "center",
            align: "center"
        },
        {
            field: "PaymentMethod",
            headerName: "Payment Method",
            width: 160,
            editable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: "center",
            align: "center"
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
                <StyledDataGrid columns={columns} rows={rows} />
            </div>
        </div>
    )
};
