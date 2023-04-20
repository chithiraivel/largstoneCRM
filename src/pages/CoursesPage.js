import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Stack, IconButton } from '@mui/material';
import StyledDataGrid from '../components/table/dataGrid';
import { Link } from 'react-router-dom';
import instance from '../axiosinstance';
import AppBreadcrumbs from '../components/breadCrumbs/breadcrumbs';
import {DeleteOutlineOutlined,VisibilityOutlined,EditOutlined} from '@mui/icons-material'


export default function CoursesPage() {


    const [rows, setRows] = useState([]);

    const ListCourses = ()=>{
        instance.post('courses/list').then((res) => {
            setRows([...res.data.result]);
        });
    }

    const handleRowDelete = (CourseID)=>{
        instance.post(`courses/delete`, {CourseID: CourseID}).then((res)=>{
            if (res.data.status == true){
                ListCourses()
            }
        })
    };

    const columns = [
        {
            field: "CourseName",
            headerName: "Course Name",
            width: 220,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "CourseFee",
            headerName: "Course Fee",
            width: 120,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "Subjects",
            headerName: "Portions Covered",
            width: 400,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false, 
            valueGetter : (params)=> params.value ? JSON.parse(params.value).map(val=> val.Subject).join(", ") :""
        },
        {
            field: "CourseDuration",
            headerName: "Course Duration",
            width: 150,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "AdmissionFee",
            headerName: "Admission Fee",
            width: 130,
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
                        <Link to={`/courses/forms/update/${params.row.CourseID}`}> <IconButton disableRipple sx={{p:0, color:"#2EFF2E"}}><EditOutlined/></IconButton></Link>
                        <Link to={`/courses/forms/read/${params.row.CourseID}`}><IconButton  disableRipple sx={{p:0, color:"#4daaff"}}><VisibilityOutlined/></IconButton></Link>
                        <IconButton disableRipple onClick={()=>{handleRowDelete(params.row.CourseID)}} sx={{p:0, color:"red"}}><DeleteOutlineOutlined/></IconButton>
                    </Stack>
                )
            },
        }
    ];

    useEffect(() => {
        ListCourses()
    },[])
    return (
        <div>
            <AppBreadcrumbs crntPage='Courses Table' path='/' />
            <div style={{ background: "#FFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", padding: "20px", borderRadius: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: "bold", color:"black !Important"}}>Courses Table</Typography>
                    <Link to='/courses/form' underline="none"> <Button style={{ backgroundColor: "#4daaff" }} disableRipple disableElevation variant='contained'>Add New</Button></Link>
                </Box>
                <StyledDataGrid columns={columns} rows={rows} id='CourseID' />
            </div>
        </div>
    )
};
