import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Button, Typography, Link as Links } from '@mui/material';
import StyledDataGrid from '../components/table/dataGrid';
import { Link } from 'react-router-dom';

import axios from 'axios';
import AppBreadcrumbs from '../components/breadCrumbs/breadcrumbs';

export default function BatchesPage() {

    const [rows, setRows] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:8080/Batches/list').then((res) => {
            setRows([...res.data.result]);
        });
    }, [])

    // const rows = [{BatchID:"1", BatchName:"FSD-APR-23", StartDate:"2023-03-30", EndDate:"2023-09-03", StartTime:"10.00 AM", EndTime:"01.30 PM", Count:"20", Available:"5"}]

    const columns = [

        {
            field: "BatchName",
            headerName: "Batch Name",
            width: 220,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "StartDate",
            headerName: "Batch Starting Date",
            width: 180,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "EndDate",
            headerName: "Batch Ending Date",
            width: 180,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "Session",
            headerName: "Session",
            width: 120,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "SessionStartTime",
            headerName: "Starting Time",
            width: 140,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "SessionEndTime",
            headerName: "End Time",
            width: 130,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "SeatsTaken",
            headerName: "Students Joined",
            width: 150,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "AvailableSeats",
            headerName: "Available Seats",
            width: 150,
            renderCell: (params) =>{
                let Total = (params.row.BatchCountLimit);
                let Taken = (params.row.SeatsTaken);
                let Available = Total - Taken;
                return <span>{Available}</span>
            },
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
    ];

    return (
        <div>
            <AppBreadcrumbs crntPage='Batches Table' path='/' />
            <div style={{ background: "#FFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", padding: "20px", borderRadius: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: "bold" }}>Batches Table</Typography>
                    <Link to='/batches/form' underline="none"> <Button style={{ backgroundColor: "#4daaff" }} disableRipple disableElevation variant='contained'>Add New</Button></Link>
                </Box>
                <StyledDataGrid columns={columns} rows={rows} id="BatchID" />
            </div>
        </div>
    )
};



        // {
        //     field: "no",
        //     headerName: "No.",
        //     width: 60,
        //     renderCell: (params) =>{
        //         const rowIndex = params.api.getRowIndexById(params.id);
        //         return <span>{params.rowIndex + 1}</span>
        //     },
        //     editable: false,
        //     headerAlign: "left", 
        //     align: "left",
        //     sortable:false
        // },
