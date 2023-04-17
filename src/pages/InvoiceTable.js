import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Stack, IconButton } from '@mui/material';
import StyledDataGrid from '../components/table/dataGrid';
import { Link } from 'react-router-dom';
import {DeleteOutlineOutlined, VisibilityOutlined, EditOutlined, PrintOutlined} from '@mui/icons-material'
import instance from '../axiosinstance';
import AppBreadcrumbs from '../components/breadCrumbs/breadcrumbs';
import moment from 'moment';

export default function InvoiceTable() {

    const [rows, setRows] = useState([]);

    const ListInvoice = ()=>{
        instance.post('invoice/list').then((res) => {
            setRows([...res.data.result]);
        });
    };
    
    const handleRowDelete = (InvoiceID)=>{
        instance.post(`invoice/delete`, {InvoiceID: InvoiceID}).then((res)=>{
            if (res.data.status == true){
                ListInvoice()
            }
        })
    };

    const columns = [
        {
            field: "id",
            headerName: "",
            width: 60,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
            
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
            width: 200,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "Term",
            headerName: "PayingTerm",
            width: 130,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "TermFees",
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
            sortable:false,
            valueFormatter: (params) =>{
                if (params.value == "") {
                    return 'N/A'
                } 
                return `${params.value} %`
            }
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
        {
            field: "InvoiceGenDate",
            headerName: "Date",
            width: 120,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
            valueGetter: (params) => moment(params.value).format("YYYY-MM-DD")
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
                        <Link to={`/invoices/generate/${params.row.InvoiceID}`}> <IconButton disableRipple sx={{p:0, color:"#FDB750"}}><PrintOutlined/></IconButton></Link>
                        <Link to={`/invoices/forms/update/${params.row.InvoiceID}`}> <IconButton disableRipple sx={{p:0, color:"#2EFF2E"}}><EditOutlined/></IconButton></Link>
                        <Link to={`/invoices/forms/read/${params.row.InvoiceID}`}><IconButton  disableRipple sx={{p:0, color:"#4daaff"}}><VisibilityOutlined/></IconButton></Link>
                        <IconButton disableRipple onClick={()=>{handleRowDelete(params.row.InvoiceID)}} sx={{p:0, color:"red"}}><DeleteOutlineOutlined/></IconButton>
                    </Stack>
                )
            },
        }
    ];


    useEffect(() => {
        ListInvoice()
    }, []);


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
