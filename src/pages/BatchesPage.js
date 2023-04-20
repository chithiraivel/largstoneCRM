import React, { useEffect, useState } from 'react';
import { Box,  Button, IconButton, Stack, Typography } from '@mui/material';
import StyledDataGrid from '../components/table/dataGrid';
import { Link } from 'react-router-dom';
import {DeleteOutlineOutlined,VisibilityOutlined,EditOutlined} from '@mui/icons-material';

import instance from '../axiosinstance';
import AppBreadcrumbs from '../components/breadCrumbs/breadcrumbs';

export default function BatchesPage() {

    const [rows, setRows] = useState([]);
    const Listbatch = ()=>{
        instance.post('batches/list').then((res) => {
            setRows([...res.data.result]);
        });
    }

    const handleRowDelete = (BatchID)=>{
        instance.post(`batches/delete`, {BatchID: BatchID}).then((res)=>{
            if (res.data.status == true){
                Listbatch()
            }
        })
    };

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
        {
            field: "none",
            headerName: "Action",
            width: 150,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
            renderCell: (params) => {
                return (
                    <Stack direction="row" spacing={2}>
                        <Link to={`/batches/forms/update/${params.row.BatchID}`}> <IconButton disableRipple sx={{p:0, color:"#2EFF2E"}}><EditOutlined/></IconButton></Link>
                        <Link to={`/batches/forms/read/${params.row.BatchID}`}><IconButton  disableRipple sx={{p:0, color:"#4daaff"}}><VisibilityOutlined/></IconButton></Link>
                        <IconButton disableRipple onClick={()=>{handleRowDelete(params.row.BatchID)}} sx={{p:0, color:"red"}}><DeleteOutlineOutlined/></IconButton>
                    </Stack>
                )
            },
        }
    ];

    useEffect(() => {
        Listbatch()
    },[])

    return (
        <div>
            <AppBreadcrumbs crntPage='Batches Table' path='/' />
            <div style={{ background: "#FFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", padding: "20px", borderRadius: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: "bold", color:"black !Important"  }}>Batches Table</Typography>
                    <Link to='/batches/form' underline="none"> <Button style={{ backgroundColor: "#4daaff" }} disableRipple disableElevation variant='contained'>Add New</Button></Link>
                </Box>
                <StyledDataGrid columns={columns} rows={rows} id="BatchID" />
            </div>
        </div>
    )
};

