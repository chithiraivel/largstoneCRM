import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Button, Typography, Link as Links } from '@mui/material';
import StyledDataGrid from '../components/table/dataGrid';
import { Link } from 'react-router-dom';

// import axios from 'axios';
import AppBreadcrumbs from '../components/breadCrumbs/breadcrumbs';

export default function CoursesPage() {


    // const [rows, setRows] = useState([]);
    // useEffect(() => {
    //     axios.post('http://localhost:8080/invoice/listall').then((res) => {
    //         setRows([...res.data.result]);
    //     });
    // }, [])

  const rows = [
    {
      id:1, 
      CourseName:"Full Stack Developement", 
      CourseFee:"75000", 
      Subjects:"MERN stack", 
      CourseDuration:"Six Months", 
      Terms:"2", 
      AdmissionFee:"30000",
    },
    {
      id:1, 
      CourseName:"Full Stack Developement", 
      CourseFee:"75000", 
      Subjects:"MERN stack", 
      CourseDuration:"Six Months", 
      Terms:"2", 
      AdmissionFee:"30000",
    },
    {
      id:1, 
      CourseName:"Full Stack Developement", 
      CourseFee:"75000", 
      Subjects:"MERN stack", 
      CourseDuration:"Six Months", 
      Terms:"2", 
      AdmissionFee:"30000",
    },
    {
      id:1, 
      CourseName:"Full Stack Developement", 
      CourseFee:"75000", 
      Subjects:"MERN stack", 
      CourseDuration:"Six Months", 
      Terms:"2", 
      AdmissionFee:"30000",
    },
    {
      id:1, 
      CourseName:"Full Stack Developement", 
      CourseFee:"75000", 
      Subjects:"MERN stack", 
      CourseDuration:"Six Months", 
      Terms:"2", 
      AdmissionFee:"30000",
    },
    {
      id:1, 
      CourseName:"Full Stack Developement", 
      CourseFee:"75000", 
      Subjects:"MERN stack", 
      CourseDuration:"Six Months", 
      Terms:"2", 
      AdmissionFee:"30000",
    },
    {
      id:1, 
      CourseName:"Full Stack Developement", 
      CourseFee:"75000", 
      Subjects:"MERN stack", 
      CourseDuration:"Six Months", 
      Terms:"2", 
      AdmissionFee:"30000",
    },
  ];

  const columns = [
      {
          field: "CourseName",
          headerName: "Course Name",
          width: 250,
          editable: false,
          headerAlign: "left", 
          align: "left",
          sortable:false
      },
      {
          field: "CourseFee",
          headerName: "Course Fee",
          width: 160,
          editable: false,
          headerAlign: "left", 
          align: "left",
          sortable:false
      },
      {
          field: "Subjects",
          headerName: "Portions Covered",
          width: 200,
          editable: false,
          headerAlign: "left", 
          align: "left",
          sortable:false
      },
      {
          field: "Terms",
          headerName: "Terms",
          width: 150,
          editable: false,
          headerAlign: "left", 
          align: "left",
          sortable:false
      },
      {
          field: "CourseDuration",
          headerName: "Course Duration",
          width: 180,
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
  ];

    return (
        <div>
            <AppBreadcrumbs crntPage='Courses Table' path='/' />
            <div style={{ background: "#FFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", padding: "20px", borderRadius: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: "bold" }}>Courses Table</Typography>
                    <Link to='/courses/form' underline="none"> <Button style={{ backgroundColor: "#4daaff" }} disableRipple disableElevation variant='contained'>Add New</Button></Link>
                </Box>
                <StyledDataGrid columns={columns} rows={rows} id='id' />
            </div>
        </div>
    )
};
