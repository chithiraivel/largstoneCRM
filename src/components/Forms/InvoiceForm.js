import { Autocomplete, Box, Button, createTheme, Grid, MenuItem, TextField, ThemeProvider, Typography } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBreadcrumbs from '../breadCrumbs/breadcrumbs';
import { useEffect } from 'react';

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

export default function InvoiceForm(props) {

    const [InvoiceGenDate, setInvoiceGenDate] = useState(" ");
    const [StudentName, setStudentName] = useState("");
    const [CourseName, setCourseName] = useState("");
    const [Session, setSession] = useState("");
    const [BatchName, setBatchName] = useState("");
    const [Term, setTerm] = useState("");
    const [TermFees, setTermFees] = useState("");
    const [PendingAmount, setPendingAmount] = useState("");
    const [Discount, setDiscount] = useState("");
    const [TotalAmount, setTotalAmount] = useState("");
    const [CreatedBy, setCreatedBy] = useState("Admin");
    const [UpdatedBy, setUpdatedBy] = useState("Admin");

    const [CreatedDate, setCreatedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [UpdatedDate, setUpdatedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

    const [PaymentMethod, setPaymentMethod] = useState("");
    const [Error, setError] = useState({
        invoiceGenDate: false,
        studentName: false,
        courseName: false,
        session: false,
        batchName: false,
        termFees: false,
        term: false,
        pendingAmount:false,
        termFees: false,
        discount: false,
        totalAmount: false,
        paymentMethod: false
    });
    const [Student, setStudent] = useState("");
    const [StudentID, setStudentID] = useState("");


    const getStudent = (e, val) =>{
        if(val != null && val.StudentID != null){
            setStudentID(val.StudentID);
            setStudentName(val.StudentName);
            setCourseName(val.CourseName);
            setBatchName(val.CourseName);
            setSession(val.CourseName);
        } else {
            setStudentID("");
            setStudentName("");
            setCourseName("");
            setBatchName("");
            setSession("");
        }
    };
    useEffect(() => {
        axios.post('http://localhost:8080/invoice/liststudent').then((res) => {
            setStudent([...res.data.result]);
        });

    }, []);

    const TermList = [
        {title:"Full Term", amnt:"70000"}, {title:"First Term", amnt:"35000"}, {title:"Second Term", amnt:"35000"}, ];

    const handleSubmit = () => {
        const GenInvoice = { 
            invoiceGenDate: InvoiceGenDate === " ",
            studentName: StudentName === "",
            courseName: CourseName ==="",
            session: Session ==="",
            batchName: BatchName ==="",
            termFees: TermFees ==="",
            term: Term === "",
            pendingAmount: PendingAmount ==="",
            totalAmount: TotalAmount ==="",
            paymentMethod: PaymentMethod ==="",
        };    
        console.log(GenInvoice);
        setError(GenInvoice)
        if (Object.values(GenInvoice).some(val => val == true )){}
        else {
            let data = {
                StudentName, CourseName, StudentID, Session, BatchName, TermFees, Term, PaymentMethod, InvoiceGenDate, Discount, PendingAmount, TotalAmount, CreatedBy, CreatedDate
            };

            axios.post("http://localhost:8080/invoice/create", data ).then((res) => {

                res.data.result ? props.history.push('/invoice/table') : alert(res.data.result);
            });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBreadcrumbs crntPage='Invoice Form' prevPage="Invoice Table" path='/invoice/table' />
            <Box sx={{ background: "#fff", pb: 3, boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", borderRadius:"25px" }}>
                <Grid container rowGap={5} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Invoice Details</Typography>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <Autocomplete error={Error.studentName} helperText={ Error.studentName ? "Student Name is required" :""} size='small' disablePortal options={Student} onChange={getStudent} getOptionLabel={(option) => option.StudentName} renderInput={(params) => <TextField {...params} label="Sudent Name" />} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.courseName} helperText={ Error.courseName ? "Course Name is required" :""}  type='text' label='Course Name' value={CourseName} size='small' fullWidth onChange={(e)=>setCourseName(e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.batchName} helperText={ Error.batchName ? "Batch Name is required" :""}  type='text' label='Batch Name' value={BatchName} size='small' fullWidth onChange={(e)=>setBatchName(e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.session} helperText={ Error.session ? "Session is required" :""}  type='text' label='Session' value={Session} size='small' fullWidth onChange={(e)=>setSession(e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <Autocomplete
                        error={Error.term} helperText={ Error.term ? "Term is required" :""} disablePortal options={TermList} getOptionLabel={(option) => option.title || ""} getOptionSelected={(option, value) => option.value === value.value}
                        size='small' 
                        onChange={(e, val) => {
                            if (val != null && val.title != null) {
                                setTerm(val.title)
                                setTermFees(val.amnt)
                                setPendingAmount(val.title == "Full Term" ? "0" : val.amnt)
                            } else {
                                setTermFees("");
                                setPendingAmount("")
                            }
                        }}     
                        renderInput={(params) => (
                            <TextField 
                            {...params} 
                            label="Term" 
                            value={Term} 
                            />
                        )} 
                        />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.termFees} helperText={ Error.termFees ? "Term Fee Amount required" :""} type='tel' label="Term Fees" value={TermFees} size='small' fullWidth 
                        onChange={(e)=>
                         {setTermFees(e.target.value)}} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField type='text' label="Discount" value={Discount} size='small' fullWidth 
                        onChange={(e)=>{
                            setDiscount(e.target.value)
                            setTotalAmount( Discount =="" ? TermFees :(TermFees - ((e.target.value/100) * TermFees)))}} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.totalAmount} helperText={ Error.totalAmount ? "Total Amount field is required" :""} type='tel' label="Payable Amount" value={TotalAmount} size='small' fullWidth onChange={(e)=>setTotalAmount(e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.paymentMethod} helperText={ Error.paymentMethod ? "Payment method field is required" :""} type='text' label="Payment Method" value={PaymentMethod} size='small' fullWidth onChange={(e)=>setPaymentMethod(e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.invoiceGenDate} helperText={ Error.invoiceGenDate ? "Invoice Generating Date reqiured" :""} type='date' label="Invoice Generating Date" value={InvoiceGenDate} size='small' fullWidth onChange={(e)=>setInvoiceGenDate(moment(e.target.value).format("YYYY-MM-DD"))} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.pendingAmount} helperText={ Error.pendingAmount ? "Pending Amount is required" :""} type='tel' label="Pending Amount" value={PendingAmount} size='small' fullWidth onChange={(e)=>setPendingAmount(e.target.value)} />
                    </Grid>
                </Grid> 
                <Box sx={{ mt: 3, mr:8, display: "flex", justifyContent: "end" }}>
                    <Button disableElevation disableRipple style={{marginRight:"10px", backgroundColor:"#4daaff"}} variant='contained' onClick={handleSubmit}>Create</Button>
                    <Link to='/invoice/table'><Button disableElevation disableRipple style={{backgroundColor:"#ff726f", color:"#fff"}} variant='contained' >Cancel</Button></Link>
                </Box>
            </Box>
        </ThemeProvider>
  )
};
