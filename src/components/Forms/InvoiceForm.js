import { Autocomplete, Box, Button, createTheme, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppBreadcrumbs from '../breadCrumbs/breadcrumbs';
import { useEffect } from 'react';
import AxiosInstance from '../../axiosinstance';
import Swal from 'sweetalert2';

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

    const [InvoiceGenDate, setInvoiceGenDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [StudentName, setStudentName] = useState("");
    const [Courses, setCourses] = useState("");
    const [CourseName, setCourseName] = useState("");
    const [CourseFee, setCourseFee] = useState("");
    const [Session, setSession] = useState("");
    const [BatchName, setBatchName] = useState("");
    const [GuardianNumber, setGuardianNumber] = useState("");
    const [Term, setTerm] = useState("");
    const [TermFees, setTermFees] = useState("");
    const [PendingAmount, setPendingAmount] = useState("");
    const [Discount, setDiscount] = useState("");
    const [AdditionalDiscountName, setAdditionalDiscountName] = useState("");
    const [AdditionalDiscountAmount, setAdditionalDiscountAmount] = useState("");
    const [Address, setAddress] = useState([{"doornum": "", "street": "", "place":""}]);
    const [TotalAmount, setTotalAmount] = useState("");
    const [CreatedBy, setCreatedBy] = useState("Admin");
    const [UpdatedBy, setUpdatedBy] = useState("Admin");

    const [CreatedDate, setCreatedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [UpdatedDate, setUpdatedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

    const [PaymentMethod, setPaymentMethod] = useState("");
    const [Disabled, setDisabled] = useState(false);
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
    const params = useParams()

    const getStudent = (e, val) =>{
        console.log(val);
        if(val != null && val.StudentID != null){
            setStudentID(val.StudentID);
            setStudentName(val.StudentName);
            setCourseName(val.CourseName);
            setCourseFee(val.CourseFee);
            setBatchName(val.BatchName);
            setPendingAmount(val.CourseFee)
            setSession(val.Session);
            setGuardianNumber(val.GuardianNumber);
            setAddress(val.Address)
        } else {
            setStudentID(null);
            setStudentName("");
            setCourseName("");
            setBatchName("");
            setSession("");
            setPendingAmount("")
            setCourseFee("");
            setAddress("")
        }
    };

    const getCourseDetails = (e, val) => {
        if (val != null && val.CourseName != null){
            setCourseName(val.CourseName)
            setCourseFee(val.CourseFee)
            setPendingAmount(val.CourseFee)
        } else {
            setCourseName("")
            setCourseFee("")
            setPendingAmount("")
        }
    };

    const PostInvoice = ()=>{         
        let data = {
            StudentName, CourseName, StudentID, Session, BatchName, TermFees, Term, PaymentMethod, InvoiceGenDate, Discount, PendingAmount, TotalAmount, GuardianNumber, AdditionalDiscountAmount, AdditionalDiscountName, CreatedBy, CreatedDate
        };
        console.log(data);
        AxiosInstance.post("invoice/create", data ).then((res) => {
            console.log(res.data);
            res.data.result ? 
            <>{
            Swal.fire({
                title:"Created",
                text:"Invoice Created Successfully",
                icon:"success",
            }).then((result) =>{
                if(result.isConfirmed){
                    {props.history.push('/invoices')}
                }
            })
            }
            </>
            // .then((result) => {
            //     if (result.value == true){
            //         Read()
            //        props.history.push(`/invoices/generate/${params.InvoiceID}`)
            //     }
            //     else{
            //         props.history.push('/invoices')
            //     }
            // }) 

            : 
            Swal.fire({title: "Some Error!!",
            text: res.data.result,
            icon: "error",
            confirmButtonText:"ok"
        });
        });
    };

    const Read = ()=>{
        AxiosInstance.put('invoice/read', {InvoiceID : params.InvoiceID}).then((res)=>{
            if(res.data.result.length > 0) {
            setBatchName(res.data.result[0].BatchName ? res.data.result[0].BatchName : "");
            setCourseName(res.data.result[0].CourseName ? res.data.result[0].CourseName : "");
            // setCourseFee(res.data.result[0].CourseFee ? res.data.result[0].CourseFee : "");
            setStudentName(res.data.result[0].StudentName ? res.data.result[0].StudentName : "");
            setSession(res.data.result[0].Session ? res.data.result[0].Session : "");
            setTerm(res.data.result[0].Term ? res.data.result[0].Term : "");
            setTermFees(res.data.result[0].TermFees ? res.data.result[0].TermFees : "");
            setDiscount(res.data.result[0].Discount ? res.data.result[0].Discount : "");
            setTotalAmount(res.data.result[0].TotalAmount ? res.data.result[0].TotalAmount : "");
            setPaymentMethod(res.data.result[0].PaymentMethod ? res.data.result[0].PaymentMethod : "");
            setInvoiceGenDate(res.data.result[0].InvoiceGenDate ? moment(res.data.result[0].InvoiceGenDate).format("YYYY-MM-DD") : "");
            setPendingAmount(res.data.result[0].PendingAmount ? res.data.result[0].PendingAmount : "");
            setAdditionalDiscountAmount(res.data.result[0].AdditionalDiscountAmount ? res.data.result[0].AdditionalDiscountAmount : "");
            setAdditionalDiscountName(res.data.result[0].AdditionalDiscountName ? res.data.result[0].AdditionalDiscountName : "");
            }
            else {
                Swal.fire({
                    title:"OOPS!",
                    text:"data not found",
                    icon:"error"
                }).then((res)=>{
                    if(res.isConfirmed){
                        props.history.push('/invoices')
                    }
                })
                
            }
        })
    };

    const Update = ()=>{
        let data = {
            StudentName, CourseName, Session, BatchName, TermFees, Term, PaymentMethod, InvoiceGenDate, Discount, PendingAmount, TotalAmount, GuardianNumber, AdditionalDiscountAmount, AdditionalDiscountName, UpdatedBy, UpdatedDate, InvoiceID: params.InvoiceID,
        };
        console.log(data);
        AxiosInstance.post('invoice/update', data).then((res)=>{
            res.data.result ?
            Swal.fire({
                            title:"Updated",
                            text:"Invoice updated successfully",
                            icon: "success",
                            
                        }).then((res)=>{
                            if(res.isConfirmed){
                                props.history.push('/invoices')
                            }
                        })
            // Swal.fire({
            //     title:"Print Form?",
            //     text:"Are you sure you want to print this form?",
            //     icon:"question",
            //     showCancelButton: true,
            //     confirmButtonText: 'Print',
            //     cancelButtonText: 'No',
            // }).then((result) => {
            //     if (result.isConfirmed){
            //          console.log("confirem");
            //        props.history.push(`/invoices/generate/${params.InvoiceID}`)
            //     }
            //     else if (result.dismiss){
            //         Swal.fire({
            //             title:"Updated",
            //             text:"Invoice updated successfully",
            //             icon: "success",
                        
            //         }).then((res)=>{
            //             if(res.isConfirmed){
            //                 props.history.push('/invoices')
            //             }
            //         })
                    
            //     }
            // })
            : 
            Swal.fire({title: "Some Error!!",
            text: res.data.result,
            icon: "error",
            confirmButtonText:"ok"
        });
        })
    }
 
    const ListStudent = ()=>{
        AxiosInstance.get('invoice/liststudent').then((res) => {
            setStudent([...res.data.result]);
        });
    };

    const ListCourses = ()=>{
        AxiosInstance.get('courses/list').then((res)=>{
            setCourses([...res.data.result]);
        });
    };

    const TermList = [
        {title:"Full Term", amnt:"70000"}, {title:"First Term", amnt:"35000"}, {title:"Second Term", amnt:"35000"}, ];
        let NameReg = /^[-a-zA-Z-()]+(\s+[-a-zA-Z-()]+)*$/

    const handleSubmit = () => {
        const GenInvoice = { 
            session: Session.trim() === "" ? true : !(NameReg.test(Session)) ? "wrongpattern" : false,
            invoiceGenDate: InvoiceGenDate === " ",
            studentName: StudentName === "",
            courseName: CourseName ==="",
            batchName: BatchName.trim() ==="",
            termFees: TermFees =="" || TermFees <=0? true :!(/^[1-9]\d*\.?[0-9]*$/.test(TermFees)) ? "wrongpattern" : false,
            term: Term === "",
            pendingAmount: PendingAmount =="" ? true :!(/^[1-9]\d*\.?[0-9]*$/.test(PendingAmount)) ? "wrongpattern" : false,
            totalAmount: TotalAmount ==""  || TotalAmount <= 0? true :!(/^[1-9]\d*\.?[0-9]*$/.test(TotalAmount)) ? "wrongpattern" : false,
            paymentMethod: PaymentMethod.trim() ==="",
        };    
        setError(GenInvoice)
        if (Object.values(GenInvoice).some(val => val == true )){}
        else {
            if(params.action == "update"){
                Update()
            } else {
                PostInvoice()
            }
        }
    };

   useEffect(() => {    
    ListStudent()
    ListCourses()
    if (params.action == "read" || params.action == "update"){
        Read()
    }
    if(params.action == "read"){
        setDisabled(true)   
    }

    }, []);
    return (
        <ThemeProvider theme={theme}>
            <AppBreadcrumbs crntPage='Invoice Form' prevPage="Invoice Table" path='/invoices' />
            <Box sx={{ background: "#fff", pb: 3, boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", borderRadius:"25px" }}>
                <Grid container rowGap={5} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Invoice Details</Typography>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <Autocomplete disabled={Disabled} size='small' disablePortal value={{StudentName}}  options={Student} onChange={getStudent} getOptionLabel={(option) => option.StudentName} renderInput={(params) => <TextField {...params}  error={Error.studentName} helperText={ Error.studentName ? "Student Name is required" :""}  label="Sudent Name" />} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <Autocomplete disabled={Disabled} size='small' disablePortal value={{CourseName}}  options={Courses} onChange={getCourseDetails} getOptionLabel={(option) => option.CourseName} renderInput={(params) => <TextField {...params}  error={Error.courseName} helperText={ Error.courseName ? "Course Name is required" :""}  label='Course Name' />} />
                        {/* <TextField disabled={Disabled} error={Error.courseName} helperText={ Error.courseName ? "Course Name is required" :""}  type='text' label='Course Name' value={CourseName} size='small' fullWidth onChange={(e)=>setCourseName(e.target.value)} /> */}
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={true} error={Error.batchName} helperText={ Error.batchName ? "Batch Name is required" :""}  type='text' label='Batch Name' value={BatchName} size='small' fullWidth onChange={(e)=>setBatchName(e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} error={Error.session} helperText={Error.session === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.session ?"Field cannot be empty ":""}  type='text' label='Session' value={Session} size='small' fullWidth onChange={(e)=>setSession(e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} error={Error.pendingAmount} helperText={Error.pendingAmount === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.pendingAmount ?"Field cannot be empty ":""} type='tel' label="Pending Amount" value={PendingAmount} size='small' fullWidth onChange={(e, value)=>setPendingAmount(e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <Autocomplete disabled={Disabled} value={{title:Term}}
                        disablePortal options={TermList} getOptionLabel={(option) => option.title || ""} getOptionSelected={(option, value) => option.value === value.value}
                        size='small' 
                        onChange={(e, val) => {
                            if (val != null && val.title != null) {
                                setTerm(val.title)
                                if (val.title === "Full Term"){
                                    setTermFees(CourseFee)
                                    setTotalAmount(CourseFee)
                                } else {
                                    let fee = (50/100) * CourseFee;
                                     setTermFees(fee)
                                    setTotalAmount(fee)}
                                
                            } else {
                                setTermFees("");
                            }
                        }}     
                        renderInput={(params) => (
                            <TextField
                            error={Error.term} helperText={ Error.term ? "Term is required" :""} 
                            {...params} 
                            label="Term" 
                            
                            />
                        )} 
                        />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} error={Error.termFees} helperText={Error.termFees === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.termFees ?"Field cannot be empty ":""} type='tel' label="Term Fees" value={TermFees} size='small' fullWidth 
                        onChange={(e)=>{
                            setTotalAmount(e.target.value)
                            setTermFees(e.target.value)} }/>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} type='text' label="Discount" value={Discount} size='small' fullWidth 
                        onChange={(e)=>{
                            if (e.target.value == "" || /^\d*\.?\d*$/.test(e.target.value) && (e.target.value <= 100)){
                            setDiscount(e.target.value)
                            setTotalAmount( e.target.value == "" ? TermFees :(TermFees - ((e.target.value/100) * TermFees)))}}} />
                    </Grid>
                    {/* <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} error={Error.totalAmount} helperText={Error.totalAmount === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.totalAmount ?"Field cannot be empty ":""} type='tel' label="Payable Amount" value={TotalAmount} size='small' fullWidth onChange={(e)=>setTotalAmount(e.target.value)} />
                    </Grid> */}
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} error={Error.paymentMethod} helperText={ Error.paymentMethod ? "Payment method field is required" :""} type='text' label="Payment Method" value={PaymentMethod} size='small' fullWidth onChange={(e)=>setPaymentMethod(e.target.value)} />
                    </Grid>
                    {/* <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} type='text' label="Other Discounts" value={AdditionalDiscountName} size='small' fullWidth onChange={(e)=>setAdditionalDiscountName(e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} type='text' label="Discount Amount" value={AdditionalDiscountAmount} size='small' fullWidth onChange={(e)=>setAdditionalDiscountAmount(e.target.value)} />
                    </Grid> */}
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={true} error={Error.invoiceGenDate} helperText={ Error.invoiceGenDate ? "Invoice Generating Date reqiured" :""}  label="Invoice Generating Date" value={InvoiceGenDate} size='small' fullWidth onChange={(e)=>setInvoiceGenDate(moment(e.target.value).format("YYYY-MM-DD"))} />
                    </Grid>
                </Grid> 
                <Box sx={{ mt: 3, mr:8, display: "flex", justifyContent: "end" }}>
                    {params.action == "read" ?  "":
                    <Button disableElevation disableRipple style={{marginRight:"10px", }} color='primary' variant='contained' onClick={handleSubmit}>{params.action=="update"? "Update" : "Create"}</Button>}
                    <Link to='/invoices'><Button disableElevation color='secondary' disableRipple style={{ color:"#fff"}} variant='contained' >{params.action == "read" ? "Back" : "Cancel"}</Button></Link>
                </Box>
            </Box>
        </ThemeProvider>
  )
};
