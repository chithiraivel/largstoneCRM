import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, } from '@mui/material';
import StyledDataGrid from '../components/table/dataGrid';
import { Link } from 'react-router-dom';

import axios from 'axios';
import AppBreadcrumbs from '../components/breadCrumbs/breadcrumbs';

export default function Students() {

    // const classes = useStyles();
    const [rows, setRows] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:8080/registration/list').then((res) => {
            setRows([...res.data.result]);
        });
    }, []);

    const columns = [
        
        { 
            field: "StudentName", 
            headerName: "Student Name", 
            width: 170, 
            editable: false, 
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "Email",
            headerName: "Email",
            width: 200,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "BatchID",
            headerName: "Batch Number",
            width: 160,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "CourseID",
            headerName: "Course",
            width: 170,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "MobileNumber",
            headerName: "Contact Number",
            width: 160,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "ParentContactNumber",
            headerName: "Parent Number",
            width: 160,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
    ];

    return (
        <div>
            <AppBreadcrumbs crntPage='Students' path='/' />
            <div style={{ background: "#FFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", padding: "20px", borderRadius: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: "bold" }}>Student Table</Typography>
                    <Link to='/students/forms' underline="none"> <Button style={{ backgroundColor: "#4daaff" }} disableRipple disableElevation variant='contained'>Add New</Button></Link>
                </Box>
                <StyledDataGrid columns={columns} rows={rows} id='StudentID' />
            </div>
        </div>
    )
};
