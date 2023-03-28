import React,{useEffect, useState} from 'react';
import { Box, Breadcrumbs, Button, Typography,Link as Links } from '@mui/material';
import StyledDataGrid from '../components/table/dataGrid';
import { Link } from 'react-router-dom';

import axios from 'axios';
import AppBreadcrumbs from '../components/breadCrumbs/breadcrumbs';

export default function Students() {

    // const classes = useStyles();
    const [rows, setRows] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:8080/register/listall').then((res) => {
            setRows([...res.data.result]);
        });
    },[])

    // const renderStudentHead = (item, index) => (<th key={index}>{item}</th>)

    // const renderStudentBody = (item, index) => (
    //     <tr key={index}>
    //         <td>{item.RegID}</td>
    //         <td>{item.StudentName}</td>
    //         <td>{item.StudentContactNum}</td>
    //         <td>{item.StudentEmail}</td>
    //         <td>{item.ParentContactNum}</td>
    //         <td>{ item.CourseEnrolledFor}</td>
    //         <td>{ item.Batch}</td>
    //     </tr>
    // )

    const handleCrumbClick = (evnt) => {
        evnt.preventDefault();
    }

    const breadCrumbs = [<Links underline="none"  key="1" color="black" >Students Table</Links>,];

    
    const columns = [
        {
            field: "id",
            headerName: "Sl.No",
            width: 75,
            editable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: "center",
            align:"center"
        },
        { field: "StudentName", headerName: "Student Name", width: 200, editable: false, headerClassName: 'super-app-theme--header', headerAlign: "center", align:"center" },
        {
            field: "StudentContactNum",
            headerName: "Contact Number",
            width: 200,
            editable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: "center",
            align:"center"
        },
        {
            field: "StudentEmail",
            headerName: "Email",
            width: 200,
            editable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: "center",
            align:"center"
        },
        {
            field: "ParentContactNum",
            headerName: "Parent Number",
            width: 150,
            editable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: "center",
            align:"center"
        },
        {
            field: "CourseEnrolledFor",
            headerName: "Course.",
            width: 150,
            editable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: "center",
            align:"center"
        },
        {
            field: "Batch",
            headerName: "Batch",
            width: 160,
            editable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: "center",
            align:"center"
        }
    ];
    
    return (
        <div>
            <AppBreadcrumbs subpage='Home' crntPage = 'Students' path='/'/>
            <div style={{ background: "#FFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", padding: "20px", borderRadius:"20px" }}>
                <Box sx={{display:"flex", justifyContent:"space-between"}}>
                    <Typography sx={{fontWeight:"bold"}}>Student Table</Typography>
                    <Link to='/students/forms' underline="none"> <Button  style={{backgroundColor:"#4daaff"}} disableRipple disableElevation variant='contained'>Add New</Button></Link>
                </Box>
                <StyledDataGrid columns={columns} rows={rows} />
            </div>
            </div>
  )
};
