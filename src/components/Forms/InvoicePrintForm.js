import { Box, Button, Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AppBreadcrumbs from '../breadCrumbs/breadcrumbs';
import InvoiceImage from '../../assets/images/LSOT_744_291.png';
import AxiosInstance from '../../axiosinstance';
import InvoiceDatagrid from '../table/InvoiceDatagrid';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import moment from 'moment';
import Signature from '../../assets/images/signature.png'; 
import { Link, useParams } from 'react-router-dom';

export default function InvoicePrintForm() {

    const [InvoiceGenDate, setInvoiceGenDate] = useState(" ");
    const [StudentName, setStudentName] = useState("");
    const [InvoiceNumber, setInvoiceNumber] = useState("");
    const [CourseName, setCourseName] = useState("");
    const [Term, setTerm] = useState("");
    const [TermFees, setTermFees] = useState("");
    const [Discount, setDiscount] = useState("");
    const [AdditionalDiscountName, setAdditionalDiscountName] = useState("");
    // const [AdditionalDiscount, setAdditionalDiscount] = useState("50");
    const [AdditionalDiscountAmount, setAdditionalDiscountAmount] = useState("");
    const [TotalAmount, setTotalAmount] = useState("");
    // const [CreatedBy, setCreatedBy] = useState("Admin");
    // const [UpdatedBy, setUpdatedBy] = useState("Admin");
    const [Address, setAddress] = useState([{"doornum": "", "street": "", "place":""}]);

    const params = useParams();
    const OfficeAddress = (
        <Box>
            <Typography>Largstone School of Technology,</Typography>
            <Typography>No-78(20), Maharaja Nagar,</Typography>
            <Typography>Elathur Main Road, Kuthukalvalasai,</Typography>    
            <Typography>Tenkasi-627803.</Typography>
        </Box>
    );

    const print = ()=>{
        var layoutContent = document.querySelector('.layout__content');
        layoutContent.style.paddingLeft = '0'; // Set padding-left to 0
        var layoutOuterContent = document.querySelector('.layout__content-main');
        layoutOuterContent.style.padding = '0'; // Set paddingto 0
        window.print(); 
        layoutContent.style.paddingLeft = '';
        layoutOuterContent.style.padding = '';
    };

    const Read = ()=>{
        AxiosInstance.post('invoice/read', {InvoiceID : params.InvoiceID}).then((res)=>{
            setInvoiceNumber(res.data.result[0].InvoiceID ? res.data.result[0].InvoiceID : "");
            setCourseName(res.data.result[0].CourseName ? res.data.result[0].CourseName : "");
            setStudentName(res.data.result[0].StudentName ? res.data.result[0].StudentName : "");
            setTerm(res.data.result[0].Term ? res.data.result[0].Term : "");
            setTermFees(res.data.result[0].TermFees ? res.data.result[0].TermFees : "");
            setDiscount(res.data.result[0].Discount ? res.data.result[0].Discount : "");
            setTotalAmount(res.data.result[0].TotalAmount ? res.data.result[0].TotalAmount : "");
            setInvoiceGenDate(res.data.result[0].InvoiceGenDate ? moment(res.data.result[0].InvoiceGenDate).format("YYYY-MM-DD") : "");
            setAddress(res.data.result[0].Address ? JSON.parse(res.data.result[0].Address) : Address);
            setAdditionalDiscountName(res.data.result[0].AdditionalDiscountName ? res.data.result[0].AdditionalDiscountName : "");
            setAdditionalDiscountAmount(res.data.result[0].AdditionalDiscountAmount ? res.data.result[0].AdditionalDiscountAmount : "");
        })
    };

    const SubTotal = TotalAmount - AdditionalDiscountAmount;
    const GSTAmount = ((12/100) * SubTotal);
    const GrandTotal = (GSTAmount + SubTotal);

    const columns = [
        {
            field: "id",
            headerName: "No",
            width: 40,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
            valueFormatter: params => (params.id <=2) ? params.id : ""
        },
        {
            field : "Description",
            headerName:"Description",
            width: 200,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
        },
        {
            field : "Term",
            headerName:"Paying Term",
            width: 130,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
        },
        {
            field:"UnitPrice",
            headerName:"Unit Price",
            width: 120,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
        },
        {
            field:"Discount",
            headerName:"Discount(%)",
            width: 120,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
        },
        {
            field:"Total",
            headerName:"Total Amount",
            width: 150,
            editable: false,
            headerAlign: "left",
            align: "left",
            sortable:false,
            valueFormatter: params => (params.id === 5) ? `${params.value}` : params.value
        },
    ];

    const rows = [{id:1,Description : CourseName, Term: Term, Discount: Discount, UnitPrice: TermFees, Total: TotalAmount}, {id: 2, Description : AdditionalDiscountName, Total: AdditionalDiscountAmount}, {id:3, Discount: "Sub Total", Total: SubTotal}, {id:4, Discount: "GST 12%", Total: GSTAmount}, {id:5, Discount: "Total", Total: GrandTotal}]

    useEffect(()=>{
        Read()
    },[])

  return (
    <div>
        <AppBreadcrumbs crntPage='Invoice' prevPage="Invoices Table" path='/invoice'/>
        <Box sx={{background:"#fff", borderRadius :"20px",  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", py:3}}>
            <Grid container justifyContent = "space-between">
                <Grid item xs={8}>
                    <Box sx={{pl:4}}>
                        <Typography sx={{fontSize:"45px",verticalAlign:"center", pb:0.5, fontWeight:"bold"}}>Invoice</Typography>
                        {OfficeAddress}
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box component='img' src={InvoiceImage} sx={{height:"60%", width:"100%", mt:2, pr:2}} alt='invoice' />
                </Grid>
            </Grid>
             {/*main  */}
            <Grid container justifyContent="end" sx={{mt:3, p:4}}>
                {/* First Column */}
                <Grid item xs={6} >
                    <Box >
                        <Typography sx={{fontSize:"30px", fontWeight:"700"}}>Bill to </Typography>
                        <Typography>{StudentName},</Typography>
                        <Typography>{(Address.map((val)=> val.doornum)) == "" ? "(Door Number   ) N/A" : `# ${Address.map((val)=> val.doornum)}` }</Typography>
                        <Typography>{(Address.map((val)=> val.street)) == "" ? "(Street) N/A" : Address.map((val)=> val.street)}</Typography>
                        <Typography>{(Address.map((val)=> val.place)) == "" ? "(Place Name) N/A" : Address.map((val)=> val.place)}</Typography>
                    </Box>
                </Grid>
                {/* Second Column */}
                <Grid item xs={6}>
                    <Grid container>
                        <Grid item xs={4}>
                            <Box>
                                <Typography sx={{fontWeight:"700"}}>Invoice#</Typography>
                                <Typography sx={{fontWeight:"700"}}>Invoice Date</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box>
                                <Typography>{InvoiceNumber}</Typography>
                                <Typography>{InvoiceGenDate}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} sx={{px:4}} >
                    <InvoiceDatagrid columns={columns} rows={rows} id='id' />
                </Grid>
            </Grid>
            <Grid container sx={{ mt:10, px:4}} justifyContent="space-between">
                <Grid item xs={4}>
                        {/* <Table>
                            <TableHead>
                                <TableRow sx={{borderBottom:0}}>
                                    <TableCell sx={{borderBottom:0}}>Bank Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <tr>
                                        <th>Account Holder Name :</th><td>Puvan Mani Elansudar</td>
                                </tr>
                                <tr>
                                        <th>Bank Name :</th><td>Puvan Mani Elansudar</td>
                                </tr>
                                <tr>
                                        <th>Account Holder  :</th><td>Puvan Mani Elansudar</td>
                                </tr>
                                <tr>
                                        <th>Account Holder Name :</th><td>Puvan Mani Elansudar</td>
                                </tr>
                            </TableBody>
                        </Table> */}
                    <Box>                        
                    {/* <Box sx={{borderRight:"1px solid black"}}>                         */}
                        <Typography sx={{fontWeight:"bold", fontSize:"20px"}}>Bank Details</Typography>
                        <Typography sx={{mt:1}}><b>Account Holder Name:</b> Puvan Mani Elansudar</Typography>
                        <Typography sx={{mt:0.5}}><b>Bank :</b>Indian OverSeas Bank</Typography>
                        <Typography sx={{mt:0.5}}><b>Branch :</b>Pavoorchatram</Typography>
                        <Typography sx={{mt:0.5}} ><b>ACC No. :</b>784596555555448</Typography>
                        <Typography sx={{mt:0.5}}><b>IFSC Code :</b>78455448</Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box>
                        <Typography sx={{fontWeight:"bold", fontSize:"20px"}}>Terms and Conditions</Typography>
                        <ul style={{listStyleType: "disc"}}>
                            <li style={{marginTop:"8px"}}>some point</li>
                            <li style={{marginTop:"4px"}}>some point</li>
                            <li style={{marginTop:"4px"}}>some point</li>
                            <li style={{marginTop:"4px"}}>some point</li>
                            <li style={{marginTop:"4px"}}>some point</li>
                        </ul>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box sx={{ display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <Box component= "img" src={Signature} alt="Signature"/>
                        <Typography>Full Stack Developer</Typography>
                        <Typography>(Puvan Mani Elansudar)</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        <Box sx={{display:"flex", justifyContent:"end", my:4, pr:4}}>
            <Button endIcon={<PrintOutlinedIcon/>} sx={{"@media print" : {display:"none"}}} style={{ backgroundColor:"#4daaff", marginRight:"20px"}} onClick={print} disableElevation disableRipple  variant='contained'>Print</Button>
            <Link to = "/invoice"><Button sx={{"@media print" : {display:"none"}}} style={{backgroundColor: "#ff726f",}} disableElevation disableRipple  variant='contained'>Back</Button></Link>
        </Box>
    </div>
  )
}
