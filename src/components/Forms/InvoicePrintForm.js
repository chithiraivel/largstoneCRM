import { Box, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import AppBreadcrumbs from '../breadCrumbs/breadcrumbs';
import InvoiceImage from '../../assets/images/LSOT_744_291.png';
import AxiosInstance from '../../axiosinstance';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import moment from 'moment';
import Signature from '../../assets/images/signature.png'; 
import { Link, useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

export default function InvoicePrintForm(props) {

    const [InvoiceGenDate, setInvoiceGenDate] = useState(" ");
    const [StudentName, setStudentName] = useState("");
    const [InvoiceNumber, setInvoiceNumber] = useState("");
    const [CourseName, setCourseName] = useState("");
    const [GuardianNumber, setGuardianNumber] = useState("");
    const [Term, setTerm] = useState("");
    const [TermFees, setTermFees] = useState("");
    const [Discount, setDiscount] = useState("");
    const [AdditionalDiscountName, setAdditionalDiscountName] = useState("");
    const [AdditionalDiscountAmount, setAdditionalDiscountAmount] = useState("");
    const [TotalAmount, setTotalAmount] = useState("");
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

    const Read = ()=>{
        AxiosInstance.post('invoice/read', {InvoiceID : params.InvoiceID}).then((res)=>{
            if(res.data.result.length > 0) {
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
                setGuardianNumber(res.data.result[0].GuardianNumber ? res.data.result[0].GuardianNumber : "");
            }
            else{
                props.history.push('/invoice')
            }
        })
    };

    const SubTotal = TotalAmount - AdditionalDiscountAmount;
    const GSTAmount = ((12/100) * SubTotal);
    const GrandTotal = (GSTAmount + SubTotal);

    let componentRef = useRef();

    useEffect(()=>{
        Read()
    },[])

  return (
    <div>
        <AppBreadcrumbs crntPage='Invoice' prevPage="Invoices Table" path='/invoice'/>
        <Box ref={(elem) => componentRef = elem} sx={{background:"#fff", borderRadius :"20px", py:3, "@media print":{m:3, pt:2, }}}>
            <Grid container justifyContent = "space-between">
                <Grid item xs={8}>
                    <Box sx={{pl:4}}>
                        <Typography sx={{fontSize:"45px",verticalAlign:"center", pb:0.5, fontWeight:"bold"}}>Invoice</Typography>
                        {OfficeAddress}
                    </Box>
                </Grid>
                <Grid item xs={4} sx={{display:"flex", justifyContent:"end"}}>
                    <Box component='img' src={InvoiceImage} sx={{height:"60%", width:"80%", mt:2, "@media print":{width:"110%"} }} alt='invoice' />
                </Grid>
            </Grid>
             {/*main  */}
            <Grid container justifyContent="end" sx={{mt:3, p:4}}>
                {/* First Column */}
                <Grid item xs={6} >
                    <Box >
                        <Typography sx={{fontSize:"30px", fontWeight:"700"}}>Bill to </Typography>
                        <Typography>{StudentName},</Typography>
                        <Typography>{(Address.map((val)=> val.doornum)) == "" ? "(Door Number) N/A" : `# ${Address.map((val)=> val.doornum)}` }</Typography>
                        <Typography>{(Address.map((val)=> val.street)) == "" ? "(Street) N/A" : Address.map((val)=> val.street)}</Typography>
                        <Typography>{(Address.map((val)=> val.place)) == "" ? "(Place Name) N/A" : Address.map((val)=> val.place)}</Typography>
                    </Box>
                </Grid>
                {/* Second Column */}
                <Grid item xs={6}>
                    <Grid sx={{mt:5.5}} container>
                        <Grid item xs={5}>
                            <Box>
                                <Typography sx={{fontWeight:"700"}}>Invoice#</Typography>
                                <Typography sx={{fontWeight:"700"}}>Invoice Date</Typography>
                                <Typography sx={{fontWeight:"700"}}>Contact Number</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box>
                                <Typography>{InvoiceNumber}</Typography>
                                <Typography>{InvoiceGenDate}</Typography>
                                <Typography>{GuardianNumber}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} sx={{px:4,}} >
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{borderBottom:0, fontWeight:"bold", backgroundColor: 'rgb(250,250,251)', color:"#455560",}}>No.</TableCell>
                                    <TableCell sx={{borderBottom:0, fontWeight:"bold", backgroundColor: 'rgb(250,250,251)', color:"#455560", width:"2   50px"}}>Description</TableCell>
                                    <TableCell sx={{borderBottom:0, fontWeight:"bold", backgroundColor: 'rgb(250,250,251)', color:"#455560",}}>Paying Term</TableCell>
                                    <TableCell sx={{borderBottom:0, fontWeight:"bold", backgroundColor: 'rgb(250,250,251)', color:"#455560",}}>Unit Price</TableCell>
                                    <TableCell sx={{borderBottom:0, fontWeight:"bold", backgroundColor: 'rgb(250,250,251)', color:"#455560",}}>Discount (%)</TableCell>
                                    <TableCell sx={{borderBottom:0, fontWeight:"bold", backgroundColor: 'rgb(250,250,251)', color:"#455560", width:"130px"}}>Total Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{borderBottom:0}}>1</TableCell>
                                    <TableCell sx={{borderBottom:0}}>{CourseName}</TableCell>
                                    <TableCell sx={{borderBottom:0}}>{Term}</TableCell>
                                    <TableCell sx={{borderBottom:0}}>{TermFees}</TableCell>
                                    <TableCell sx={{borderBottom:0}}>{Discount}</TableCell>
                                    <TableCell sx={{borderBottom:0}}>{TotalAmount}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{borderBottom:1}}>2</TableCell>
                                    <TableCell sx={{borderBottom:1}}>{AdditionalDiscountName}</TableCell>
                                    <TableCell sx={{borderBottom:1}}></TableCell>
                                    <TableCell sx={{borderBottom:1}}></TableCell>
                                    <TableCell sx={{borderBottom:1}}></TableCell>
                                    <TableCell sx={{borderBottom:1}}>{AdditionalDiscountAmount}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{borderBottom:0}}></TableCell>
                                    <TableCell sx={{borderBottom:0}}></TableCell>
                                    <TableCell sx={{borderBottom:0}}></TableCell>
                                    <TableCell sx={{borderBottom:0}}></TableCell>
                                    <TableCell sx={{borderBottom:0, fontWeight:"bold"}}>Sub Total</TableCell>
                                    <TableCell sx={{borderBottom:0, fontWeight:"bold"}}>{SubTotal}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{borderBottom:1}}></TableCell>
                                    <TableCell sx={{borderBottom:1}}></TableCell>
                                    <TableCell sx={{borderBottom:1}}></TableCell>
                                    <TableCell sx={{borderBottom:1}}></TableCell>
                                    <TableCell sx={{borderBottom:1, fontWeight:"bold"}}>GST 12%</TableCell>
                                    <TableCell sx={{borderBottom:1, fontWeight:"bold"}}>{GSTAmount}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{borderBottom:0}}></TableCell>
                                    <TableCell sx={{borderBottom:0}}></TableCell>
                                    <TableCell sx={{borderBottom:0}}></TableCell>
                                    <TableCell sx={{borderBottom:0}}></TableCell>
                                    <TableCell sx={{borderBottom:0, fontWeight:"bold", fontSize:"18px"}}>Total</TableCell>
                                    <TableCell sx={{borderBottom:0, fontWeight:"bold", fontSize:"18px"}}>{GrandTotal}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Grid container sx={{ mt:15, pl:4}}>
                <Grid item xs={4.5}>
                    <Box>                        
                        <Typography sx={{fontWeight:"bold", fontSize:"20px"}}>Bank Details</Typography>
                        <Typography sx={{mt:1}}><b>Name:</b> Puvan Mani Elansudar</Typography>
                        <Typography sx={{mt:0.5}}><b>Bank :</b>Indian OverSeas Bank</Typography>
                        <Typography sx={{mt:0.5}}><b>Branch :</b>Pavoorchatram</Typography>
                        <Typography sx={{mt:0.5}} ><b>ACC No. :</b>784596555555448</Typography>
                        <Typography sx={{mt:0.5}}><b>IFSC Code :</b>78455448</Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box>
                        <Typography sx={{fontWeight:"bold", fontSize:"20px"}}>Terms and Conditions</Typography>
                        <ul style={{listStyleType: "disc", marginLeft:"15   px"}}>
                            <li style={{marginTop:"8px", lineHeight:"1.5", fontSize:"10px"}}>lorem ipsum "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </li>
                            <li style={{marginTop:"4px", lineHeight:"1.5", fontSize:"10px"}}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </li>
                        </ul>
                    </Box>
                </Grid>
                <Grid item xs={3.5} sx={{pl:6}}>
                    <Box sx={{ display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <Box component= "img" src={Signature} alt="Signature"/>
                        <Typography sx={{fontSize:"16px"}}>Full Stack Developer</Typography>
                        <Typography sx={{fontSize:"12px"}}>(Puvan Mani Elansudar)</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>

        <Box sx={{display:"flex", justifyContent:"end", my:4, pr:4}}>
            <ReactToPrint 
            trigger={() =>
                <Button endIcon={<PrintOutlinedIcon/>} style={{ backgroundColor:"#4daaff", marginRight:"20px"}} disableElevation disableRipple  variant='contained'>Print</Button>}
            content={()=> componentRef}
            />
            <Link to = "/invoice"><Button style={{backgroundColor: "#ff726f",}} disableElevation disableRipple  variant='contained'>Back</Button></Link>
        </Box>
    </div>
  )
}
