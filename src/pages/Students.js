import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Stack, Typography, } from '@mui/material';
import StyledDataGrid from '../components/table/dataGrid';
import { Link } from 'react-router-dom';
import {DeleteOutlineOutlined,VisibilityOutlined,EditOutlined} from '@mui/icons-material';
import instance from '../axiosinstance';
import AppBreadcrumbs from '../components/breadCrumbs/breadcrumbs';

export default function Students() {

    // const classes = useStyles();
    const [rows, setRows] = useState([]);

    const ListStudents = ()=>{
        instance.post('registration/list').then((res) => {
            setRows([...res.data.result]);
        });
    }

    const handleRowDelete = (StudentID)=>{
        instance.post(`registration/delete`, {StudentID: StudentID}).then((res)=>{
            if (res.data.status === true){
                ListStudents()
            }
        })
    };

    const columns = [
        
        { 
            field: "StudentName", 
            headerName: "Student Name", 
            width: 200, 
            editable: false, 
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "Email",
            headerName: "Email",
            width: 250,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "BatchName",
            headerName: "Batch Name",
            width: 200,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "CourseName",
            headerName: "Course Name",
            width: 200,
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
            field: "GuardianNumber",
            headerName: "Parent Number",
            width: 160,
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
                        <Link to={`/students/forms/update/${params.row.StudentID}`}> <IconButton disableRipple sx={{p:0, color:"#2EFF2E"}}><EditOutlined/></IconButton></Link>
                        <Link to={`/students/forms/read/${params.row.StudentID}`}><IconButton  disableRipple sx={{p:0, color:"#4daaff"}}><VisibilityOutlined/></IconButton></Link>
                        <IconButton disableRipple onClick={()=>{handleRowDelete(params.row.StudentID)}} sx={{p:0, color:"red"}}><DeleteOutlineOutlined/></IconButton>
                    </Stack>
                )
            },
        }
    ];

    useEffect(() => {
        ListStudents()
    }, []);
    
    return (
        <div>
            <AppBreadcrumbs crntPage='Students' path='/' />
            <div style={{ background: "#FFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", padding: "20px", borderRadius: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: "bold", color:"black !Important" }}>Student Table</Typography>
                    <Link to='/students/forms' underline="none"> <Button style={{ backgroundColor: "#4daaff" }} disableRipple disableElevation variant='contained'>Add New</Button></Link>
                </Box>
                <StyledDataGrid columns={columns} rows={rows} id='StudentID' />
            </div>
        </div>
    )
};
