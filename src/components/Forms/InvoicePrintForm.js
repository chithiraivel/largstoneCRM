import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AppBreadcrumbs from '../breadCrumbs/breadcrumbs';
import InvoiceImage from '../../assets/images/LSOT_744_291.png';
import AxiosInstance from '../../axiosinstance';
import InvoiceDatagrid from '../table/InvoiceDatagrid';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import moment from 'moment';
import { useParams } from 'react-router-dom';

export default function InvoicePrintForm() {

    const [InvoiceGenDate, setInvoiceGenDate] = useState(" ");
    const [StudentName, setStudentName] = useState("");
    const [InvoiceNumber, setInvoiceNumber] = useState("");
    const [CourseName, setCourseName] = useState("");
    const [Session, setSession] = useState("");
    const [BatchName, setBatchName] = useState("");
    const [Term, setTerm] = useState("");
    const [TermFees, setTermFees] = useState("");
    const [PendingAmount, setPendingAmount] = useState("");
    const [Discount, setDiscount] = useState("");
    const [AdditionalDiscountName, setAdditionalDiscountName] = useState("Referral Bonus");
    const [AdditionalDiscount, setAdditionalDiscount] = useState("50");
    const [AdditionalDiscountAmount, setAdditionalDiscountAmount] = useState("10000");
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
    const Read = ()=>{
        AxiosInstance.post('invoice/read', {InvoiceID : params.InvoiceID}).then((res)=>{
            console.log(res.data.result[0]);
            setInvoiceNumber(res.data.result[0].InvoiceID ? res.data.result[0].InvoiceID : "");
            setBatchName(res.data.result[0].BatchName ? res.data.result[0].BatchName : "");
            setCourseName(res.data.result[0].CourseName ? res.data.result[0].CourseName : "");
            setStudentName(res.data.result[0].StudentName ? res.data.result[0].StudentName : "");
            setSession(res.data.result[0].Session ? res.data.result[0].Session : "");
            setTerm(res.data.result[0].Term ? res.data.result[0].Term : "");
            setTermFees(res.data.result[0].TermFees ? res.data.result[0].TermFees : "");
            setDiscount(res.data.result[0].Discount ? res.data.result[0].Discount : "");
            setTotalAmount(res.data.result[0].TotalAmount ? res.data.result[0].TotalAmount : "");
            setInvoiceGenDate(res.data.result[0].InvoiceGenDate ? moment(res.data.result[0].InvoiceGenDate).format("YYYY-MM-DD") : "");
            setPendingAmount(res.data.result[0].PendingAmount ? res.data.result[0].PendingAmount : "");
            setAddress(res.data.result[0].Address ? JSON.parse(res.data.result[0].Address) : Address)
        })
    };

    const SubTotal = TotalAmount - AdditionalDiscountAmount;
    const GSTAmount = ((12/100) * SubTotal);
    const GrandTotal = (GSTAmount + SubTotal);

    const columns = [
        {
            field: "id",
            headerName: "sl. num",
            width: 120,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
        },
        {
            field : "Description",
            headerName:"Description",
            width: 300,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
        },
        {
            field:"UnitPrice",
            headerName:"Unit Price",
            width: 180,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
        },
        {
            field:"Discount",
            headerName:"Discount(%)",
            width: 180,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
        },
        {
            field:"Total",
            headerName:"Total Amount",
            width: 180,
            editable: false,
            headerAlign: "left",
            cellClassName: 'super-app-theme--cell',
            align: "left",
            sortable:false,
            rowClassName: 'super-app-theme--Filled'
        },
    ];

    const rows = [{id:1,Description : CourseName, Discount: Discount, UnitPrice: TermFees, Total: TotalAmount}, {id: 2, Description : AdditionalDiscountName, Discount : AdditionalDiscount, Total: AdditionalDiscountAmount}, {id:3, Discount: "Sub Total", Total: SubTotal}, {id:4, Discount: "GST 12%", Total: GSTAmount}, {id:5, Discount: "Total Amount", Total: GrandTotal}]

    function getRowClassName(params) {
        if (params.row.id === 4) {
            return 'bold-row';
        }
        return '';
    }

    useEffect(()=>{
        Read()
    },[])

  return (
    <div>
        <AppBreadcrumbs crntPage='Invoice' prevPage="Invoices Table" path='/invoice/table'/>
        <Box sx={{background:"#fff", borderRadius :"20px",  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", p:2, pl:4}}>
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <Box>
                    <Typography sx={{fontSize:"45px",verticalAlign:"center", fontWeight:"bold"}}>Invoice</Typography>
                    {OfficeAddress}
                </Box>
                <img src={InvoiceImage} height="34%" width="30%" alt='invoice' />
            </Box>
             {/*main  */}
            <Box sx={{mt:4, display:"flex"}}>
                {/* First Column */}
                <Box sx={{px:2}}>
                    <Typography sx={{fontSize:"30px", fontWeight:"400"}}>Bill to </Typography>
                    <Typography>{StudentName},</Typography>
                    <Typography>{(Address.map((val)=> val.doornum)) == "" ? "() N/A" : `# ${Address.map((val)=> val.doornum)}` },</Typography>
                    <Typography>{(Address.map((val)=> val.street)) == "" ? "(Street) N/A" : Address.map((val)=> val.street)},</Typography>
                    <Typography>{(Address.map((val)=> val.place)) == "" ? "(Place Name) N/A" : Address.map((val)=> val.place)}.</Typography>
                </Box>
                {/* Second Column */}
                <Box sx={{display:"flex", pl:30}}>
                    <Box sx={{ pr:5}}>
                        <Typography sx={{fontWeight:"700"}}>Invoice#</Typography>
                        <Typography sx={{fontWeight:"700"}}>Invoice Date</Typography>
                    </Box>
                    <Box>
                        <Typography>{InvoiceNumber}</Typography>
                        <Typography>{InvoiceGenDate}</Typography>
                    </Box>
                    {/* <Box></Box> */}
                </Box>
            </Box>
            <InvoiceDatagrid getRowClassName={getRowClassName} columns={columns} rows={rows} id='id' />
        </Box>
        <Box sx={{display:"flex", justifyContent:"end", my:4, pr:4}}>
            <Button endIcon={<PrintOutlinedIcon/>} style={{backgroundColor:"#4daaff",}} disableElevation disableRipple  variant='contained'>Print</Button>
        </Box>
    </div>
  )
}
