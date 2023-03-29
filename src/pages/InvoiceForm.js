import { Box, Button, createTheme, Grid, MenuItem, TextField, ThemeProvider, Typography } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBreadcrumbs from '../components/breadCrumbs/breadcrumbs';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {
            border: 'none',
          },
        },
      },
    },
  },
});

export default function InvoiceForm() {

    const [InvoiceGenDate, setInvoiceGenDate] = useState("");
    const [StudentName, setStudentName] = useState("");
    const [CourseName, setCourseName] = useState("");
    const [Term, setTerm] = useState("");
    const [TermFees, setTermFees] = useState("");
    const [Discount, setDiscount] = useState("");
    const [TotalAmount, setTotalAmount] = useState("");
    const [PaymentMethod, setPaymentMethod] = useState("");
        const [Error, setError] = useState({
        invoiceGenDate: false,
        studentName: false,
        courseName: false,
        term: false,
        termFees: false,
        discount: false,
        totalAmount: false,
        paymentMethod: false
    });


    const handleSubmit = () => {
            
    const GenInvoice = {
        invoiceGenDate: InvoiceGenDate === "",
        studentName: StudentName === "",
        courseName: CourseName ==="",
        term: Term ==="",
        termFees: TermFees ==="",
        discount: Discount ==="",
        totalAmount: TotalAmount ==="",
        paymentMethod: PaymentMethod ==="",
    };    
    setError(GenInvoice)    
        // let data = {
        //     StudentName,
        // }
        // axios.post("http://localhost:8080/invoice/create", ).then((res) => {
        //     res.data.result ? <Link to='/invoice/table' /> : alert(res.data.result);
        // });
    };


    return (
        //   const rows = [{id:1, InvoiceGenDate:"28-03-2023", StudentName:"Suresh", CourseName:"Full Stack Developer", Term:"I", TermFee:"25000", Discount:"none", TotalAmount:"25000", PaymentMethod:"Online(Google Pay)"}];
        <div>
            <ThemeProvider theme={theme}>
                <AppBreadcrumbs crntPage='Invoice Form' prevPage="Invoice Table" path='/invoice/table' />
                <Box sx={{ background: "#fff", pb: 3, boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", borderRadius:"25px" }}>
                    <Grid container rowGap={5} columnGap={5} paddingLeft={4} paddingTop={3}>
                        <Grid item xs={12}>
                            <Typography variant='h6'>Invoice Details</Typography>
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.invoiceGenDate} helperText={ Error.invoiceGenDate ? "Date Field cannot be Empty" :""} type='date' label="Invoice Generating Date" value={InvoiceGenDate} size='small' fullWidth onChange={(e)=>setInvoiceGenDate(e.target.value)} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.studentName} helperText={ Error.studentName ? "Student Name is needed" :""} select label="Student Name" value={StudentName} size='small' fullWidth onChange={(e) => setStudentName(e.target.value)}>
                                <MenuItem value='Suresh'>Suresh</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.courseName} helperText={ Error.courseName? "Course Name is needed" :""}  type='text' label='Course Name' value={CourseName} size='small' fullWidth onChange={(e)=>setCourseName(e.target.value)} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField select error={Error.term} helperText={ Error.term ? "Select the Term" :""} label="Term" value={Term} size='small' fullWidth onChange={(e) => setTerm(e.target.value)}>
                                <MenuItem value=" ">-</MenuItem>
                                <MenuItem value='I'>I</MenuItem>
                                <MenuItem value='II'>II</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.termFees} helperText={ Error.termFees ? "Term Fee Amount needed" :""} type='number' label="Term Fees" value={TermFees} size='small' fullWidth onChange={(e)=>setTermFees(e.target.value)} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.discount} helperText={ Error.discount ? "If not have any discount enter NONE" :""} type='text' label="Discount" value={Discount} size='small' fullWidth onChange={(e)=>setDiscount(e.target.value)} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.totalAmount} helperText={ Error.totalAmount ? "Total Amount not tallied. Please check" :""} type='number' label="Amount" value={TotalAmount} size='small' fullWidth onChange={(e)=>setTotalAmount(e.target.value)} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.paymentMethod} helperText={ Error.paymentMethod ? "Payment method is needed" :""} type='text' label="Payment Method" value={PaymentMethod} size='small' fullWidth onChange={(e)=>setPaymentMethod(e.target.value)} />
                        </Grid>
                    </Grid> 
                    <Box sx={{ mt: 3, mr:8, display: "flex", justifyContent: "end" }}>
                        <Button disableElevation disableRipple style={{marginRight:"10px", backgroundColor:"#4daaff"}} variant='contained' onClick={handleSubmit}>Generate</Button>
                        <Link to='/invoice/table'><Button disableElevation disableRipple style={{backgroundColor:"#ff726f", color:"#fff"}} variant='contained' >Cancel</Button></Link>
                    </Box>
                </Box>
            </ThemeProvider>
      </div>
  )
};