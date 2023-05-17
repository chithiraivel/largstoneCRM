import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Stack, IconButton } from '@mui/material';
import StyledDataGrid from '../components/table/dataGrid';
import { Link } from 'react-router-dom';
import {DeleteOutlineOutlined, VisibilityOutlined, EditOutlined, PrintOutlined} from '@mui/icons-material'
import instance from '../axiosinstance';
import AppBreadcrumbs from '../components/breadCrumbs/breadcrumbs';
import moment from 'moment';
import Swal from 'sweetalert2';

export default function InvoiceTable() {

    const [rows, setRows] = useState([]);

    const ListInvoice = ()=>{
        instance.get('invoice/list').then((res) => {
            console.log(res.data);
            if(res.data.result.length<1){
                // Swal.fire({
                //     title:"Oops!",
                //     text:"There is no relevant Data",
                //     timer:2000,
                //     icon:"info",
                //     showConfirmButton:false
                // })
            }
            setRows([...res.data.result]);
            console.log(rows);
        });
    };
    
    const handleRowDelete = (InvoiceID)=>{
        Swal.fire({
            title:"Are you Sure ?",
            text:"You want to delete it?",
            icon:"warning",
            confirmButtonText:"Yes Delete it",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            console.log(result);
            if(result.isConfirmed){
                instance.post(`invoice/delete`, {InvoiceID: InvoiceID}).then((res)=>{
                    if (res.data.status === true){
                        ListInvoice()
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
                if (params.value === "") {
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
                        <Link to={`/invoices/forms/update/${params.row.InvoiceID}`}> <IconButton disableRipple sx={{p:0, color:"gray"}}><EditOutlined/></IconButton></Link>
                        <Link to={`/invoices/forms/read/${params.row.InvoiceID}`}><IconButton  disableRipple sx={{p:0, color:"orange"}}><VisibilityOutlined/></IconButton></Link>
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
                    <Typography sx={{ fontWeight: "bold", color:"black !Important"  }}>Invoice Table</Typography>
                    <Link to='/invoices/form' underline="none"> <Button style={{ backgroundColor: "#4daaff" }} disableRipple disableElevation variant='contained'>Create Invoice</Button></Link>
                </Box>
                <StyledDataGrid columns={columns} rows={rows} id='InvoiceID' />
            </div>
        </div>
    )
};
