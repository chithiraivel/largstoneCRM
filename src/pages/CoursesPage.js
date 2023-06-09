import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Stack, IconButton } from '@mui/material';
import StyledDataGrid from '../components/table/dataGrid';
import { Link } from 'react-router-dom';
import instance from '../axiosinstance';
import AppBreadcrumbs from '../components/breadCrumbs/breadcrumbs';
import {DeleteOutlineOutlined,VisibilityOutlined,EditOutlined} from '@mui/icons-material'
import Swal from 'sweetalert2';

export default function CoursesPage() {

    const [rows, setRows] = useState([]);

    const ListCourses = ()=>{
        instance.post('courses/list').then((res) => {
            if(res.data.result.length<1){
                Swal.fire({
                    title:"Oops!",
                    text:"There is no relevant Data",
                    timer:2000,
                    icon:"info",
                    showConfirmButton:false
                })
            }
            setRows([...res.data.result]);
        });
    }

    const handleRowDelete = (CourseID)=>{
        Swal.fire({
            title:"Are you Sure ?",
            text:"You want to delete it?",
            icon:"warning",
            confirmButtonText:"Yes Delete it",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if(result.isConfirmed){
                instance.post(`courses/delete`, {CourseID: CourseID}).then((res)=>{
                    if (res.data.status === true){
                        ListCourses()
                    }
                })
                Swal.fire({
                    title:"Deleted",
                    text :"The data deleted successfully",
                    icon:"success"
                })
            }
            else if(result.dismiss){
                Swal.fire({
                    title:"Cancelled",
                    text :"The data is safe",
                    icon:"error",
                    showConfirmButton:false,
                    timer: 1500
                })
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
                        <Link to={`/courses/forms/update/${params.row.CourseID}`}> <IconButton disableRipple sx={{p:0, color:"gray"}}><EditOutlined/></IconButton></Link>
                        <Link to={`/courses/forms/read/${params.row.CourseID}`}><IconButton  disableRipple sx={{p:0, color:"orange"}}><VisibilityOutlined/></IconButton></Link>
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
                    <Link to='/courses/form' underline="none"> <Button style={{ backgroundColor: "#4daaff" }} disableRipple disableElevation variant='contained'>Create Course</Button></Link>
                </Box>
                <StyledDataGrid columns={columns} rows={rows} id='CourseID' />
            </div>
        </div>
    )
};
