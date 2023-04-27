import { Box, Button, Grid, TextField, Typography, createTheme, ThemeProvider, Autocomplete, CircularProgress, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment/moment';
import AppBreadcrumbs from '../breadCrumbs/breadcrumbs';
import AxiosInstance from '../../axiosinstance';
import Swal from 'sweetalert2';
import {Clear,Add} from '@mui/icons-material';
// import AddIcon from '@mui/icons-material/Add';

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

export default function Form(props) {

    const [Batch, setBatch] = useState("");    
    const [BatchName, setBatchName] = useState("");    
    const [Courses, setCourses] = useState("");
    const [CourseName, setCourseName] = useState("");
    const [CourseID, setCourseID] = useState("");
    const [BatchID, setBatchID] = useState("");

    const [RegDate, setRegDate] = useState(" ");
    const [StudentName, setStudentName] = useState("");
    const [StudentContactNumber, setStudentContactNumber] = useState("");
    const [Email, setEmail] = useState('');
    const [DOB, setDOB] = useState(" ");

    const [SSLCboard, setSSLCboard] = useState('');
    const [SSLCSchoolName, setSSLCSchool] = useState('');
    const [SSLCPassedYear, setSSLCPassedYear] = useState('');
    const [SSLCPercentage, setSSLCPercentage] = useState('');

    const [HSCboard, setHSCboard] = useState('');
    const [HSCSchoolName, setHSCSchoolName] = useState('');
    const [HSCPassedYear, setHSCPassedYear] = useState('');
    const [HSCPercentage, setHSCPercentage] = useState('');

    const [Degree, setDegree] = useState([{"id": 1, "degree": "", "College": "", "yearOfPass": "", "Percentage": "", "collegeErr" : false, "degreeErr": false, "yearOfPassErr": false, "PercentageErr": false, }]);

    const [GuardianName, setGuardianName] = useState("");
    const [GuardianNumber, setGaurdianNumber] = useState("");

    const [Address, setAddress] = useState([{"doornum": "", "street": "", "place":""}]);
    
    const [AdditionalCertificate, setAdditionalCertificate] = useState([{ "id": 1, "academy": "", "course": "", "time" :"", "days": "", "academyErr" : false, "courseErr" : false, "timeErr" : false, "daysErr" : false,}]);

    const [AdmissionFee, setAdmissionFee] = useState("");
    const [Session, setSession] = useState("");
    const [SessionStartTime, setSessionStartTime] = useState(" ");
    const [SessionEndTime, setSessionEndTime] = useState(" ");
    const [BatchStartingDate, setBatchStartingDate] = useState(" ");
    const [BatchEndDate, setBatchEndDate] = useState(" ");

    const [CreatedBy, setCreatedBy] = useState("Admin");
    const [UpdatedBy, setUpdatedBy] = useState("Admin");

    const [CreatedDate, setCreatedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [UpdatedDate, setUpdatedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

    const [Loading, setLoading] = useState(false);

    const [Error, setError] = useState({
        regDate: false,
        studentName: false,
        studentContactNumber: false,
        studentEmail: false,
        DOB: false,
        sslcBoard: false,
        sslcSchoolName: false,
        sslcPassedYear: false,
        sslcPercentage: false,
        hscBoard: false,
        hscSchoolName: false,
        hscPassedYear: false,
        hscPercentage: false,
        guardianName: false,
        guardianNumber: false,
        additionalCertificate: false,
        batchName: false,
        batchStartingDate: false,
        batchEndDate: false,
        session: false,
        sessionStartTime: false,
        sessionEndtime: false,
        courseName: false,
        courseAdmissionFee: false,
        addressDN: false,
        addressPlace: false,
        addressStreet: false
    });
   
    const [Disable, setDisable] = useState(false);
    const params = useParams() 

    // APIs
    
    const ListBatches = ()=>{
        AxiosInstance.get('/batches/list').then((res)=>{
            setBatch([...res.data.result]);
        })
    };

    const ListCourses = ()=>{
        AxiosInstance.get('/courses/list').then((res)=>{
            setCourses([...res.data.result]);
        })
    };


    const PostStudents = ()=>{
        let HSC = JSON.stringify({HSCboard, HSCSchoolName, HSCPassedYear, HSCPercentage});
        let SSLC = JSON.stringify({SSLCboard, SSLCSchoolName, SSLCPassedYear, SSLCPercentage});
       
        let data = {
            StudentName, MobileNumber: StudentContactNumber, Email, DOB, RegDate, AdmissionFee, GuardianName, GuardianNumber, Address : JSON.stringify(Address), CourseID,  BatchID,
            HSC, Certification: JSON.stringify(AdditionalCertificate), SSLC, Degree: JSON.stringify(Degree), CreatedBy, CreatedDate
        };
        AxiosInstance.post("registration/register", data ).then((res) => {     
            res.data.result ?
            <>
            {
            Swal.fire({
                title:"Registered",
                text:"Registration success",
                icon:"success",
                confirmButtonText:"ok"
            }) }
            {props.history.push('/students')} 
            </>: 
            Swal.fire({title: "Some Error!!",
            text: res.data.result,
            icon: "error",
            confirmButtonText:"ok"
        });  
        });
    };

    const Read = ()=>{
        setLoading(true)
        AxiosInstance.put('registration/read',{StudentID: params.StudentID} ).then((res)=>{
            if (res.data.result.length > 0){         
                setStudentName(res.data.result[0].StudentName ? res.data.result[0].StudentName :"")
                setStudentContactNumber(res.data.result[0].MobileNumber ? res.data.result[0].MobileNumber :"")
                setEmail(res.data.result[0].Email ? res.data.result[0].Email :"")
                setDOB(res.data.result[0].DOB ? moment(res.data.result[0].DOB).format("YYYY-MM-DD") :"")
                setRegDate(res.data.result[0].RegDate ? moment(res.data.result[0].RegDate).format("YYYY-MM-DD") :"")
                setHSCboard(res.data.result[0].HSC ? (JSON.parse(res.data.result[0].HSC)).HSCboard :"")
                setHSCSchoolName(res.data.result[0].HSC ? (JSON.parse(res.data.result[0].HSC)).HSCSchoolName :"")
                setHSCPassedYear(res.data.result[0].HSC ? (JSON.parse(res.data.result[0].HSC)).HSCPassedYear :"")
                setHSCPercentage(res.data.result[0].HSC ? (JSON.parse(res.data.result[0].HSC)).HSCPercentage :"")
                setSSLCboard(res.data.result[0].SSLC? (JSON.parse(res.data.result[0].SSLC)).SSLCboard :"")
                setSSLCSchool(res.data.result[0].SSLC ? (JSON.parse(res.data.result[0].SSLC)).SSLCSchoolName :"")
                setSSLCPassedYear(res.data.result[0].SSLC ? (JSON.parse(res.data.result[0].SSLC)).SSLCPassedYear :"")
                setSSLCPercentage(res.data.result[0].SSLC ? (JSON.parse(res.data.result[0].SSLC)).SSLCPercentage :"")
                setCourseName(res.data.result[0].CourseName ? res.data.result[0].CourseName :"")
                setAdmissionFee(res.data.result[0].AdmissionFee ? res.data.result[0].AdmissionFee :"")
                setBatchName(res.data.result[0].BatchName ? res.data.result[0].BatchName :"")
                setBatchStartingDate(res.data.result[0].BatchStartDate ? moment(res.data.result[0].BatchStartDate).format("YYYY-MM-DD") : " ")
                setBatchEndDate(res.data.result[0].BatchEndDate ? moment(res.data.result[0].BatchEndDate).format("YYYY-MM-DD") : " ")
                setSession(res.data.result[0].Session ? res.data.result[0].Session :"")
                setSessionStartTime(res.data.result[0].SessionStartTime ? res.data.result[0].SessionStartTime :"")
                setSessionEndTime(res.data.result[0].SessionEndTime ? res.data.result[0].SessionEndTime :"")
                setGuardianName(res.data.result[0].GuardianName ? res.data.result[0].GuardianName :"")
                setGaurdianNumber(res.data.result[0].GuardianNumber ? res.data.result[0].GuardianNumber :"")
                setDegree(res.data.result[0].Degree ? JSON.parse(res.data.result[0].Degree) :"")
                setAdditionalCertificate(res.data.result[0].Certification ? JSON.parse(res.data.result[0].Certification) :"")
                setAddress(res.data.result[0].Address ? JSON.parse(res.data.result[0].Address) : Address)
                setCourseID(res.data.result[0].CourseID ? res.data.result[0].CourseID : "")
                setBatchID(res.data.result[0].BatchID ? res.data.result[0].BatchID : "")
            }
            else {
                props.history.push('/students')
            }
        }).finally(()=>{setLoading(false)})
    }

    const Update = ()=>{

        let HSC = JSON.stringify({HSCboard, HSCSchoolName, HSCPassedYear, HSCPercentage});
        let SSLC = JSON.stringify({SSLCboard, SSLCSchoolName, SSLCPassedYear, SSLCPercentage});
        let data = {
            StudentName, MobileNumber: StudentContactNumber, Email, DOB, RegDate, AdmissionFee, GuardianName, GuardianNumber, BatchID, CourseID,
            HSC, Certification: JSON.stringify(AdditionalCertificate), SSLC, Degree: JSON.stringify(Degree), Address: JSON.stringify(Address), UpdatedBy, UpdatedDate, StudentID: params.StudentID
        };
        AxiosInstance.post('registration/update', data).then((res)=>{
            res.data.result ?
            <>
            {
            Swal.fire({
                title:"Updated",
                text:"Updated successfully",
                icon:"success",
                confirmButtonText:"ok"
            }).then((res)=>{
                if(res.isConfirmed){
                    {props.history.push('/students')}
                }
            }) }
             
            </>: 
            Swal.fire({title: "Some Error!!",
            text: res.data.result,
            icon: "error",
            confirmButtonText:"ok"
        });
        })
    };

    // AutoComplete Onchange

    const getCourseDetails = (e, val) => {
        if (val != null && val.CourseName != null){
            setCourseName(val.CourseName)
            setCourseID(val.CourseID);
            setAdmissionFee(val.AdmissionFee)
        } else {
            setCourseName("")
            setCourseID(null);
            setAdmissionFee("")        
        }
    };

    const getBatchDetails = (e, val) => {
        if (val != null && val.BatchName != null) {
            setBatchStartingDate(moment(val.BatchStartDate).format("YYYY-MM-DD"));
            setBatchEndDate(moment(val.BatchEndDate).format("YYYY-MM-DD"));
            setSession(val.Session)
            setBatchName(val.BatchName)
            setBatchID(val.BatchID)
            setSessionEndTime(val.SessionEndTime);
            setSessionStartTime(val.SessionStartTime);
        } else {
            setBatchName("")
            setBatchStartingDate(" ");
            setBatchEndDate(" ");
            setSession("")
            setSessionEndTime(" ");
            setSessionStartTime(" ");
            setBatchID(null)            
        }
    };

    // Validations

    const handleSubmit = () => {
        const RegisterStudent = {
            studentName: StudentName.trim() === "" ? true : !(/^[A-Z][A-Za-z_\s]{3,29}$/.test(StudentName)) ? "wrongpattern" : false,
            studentContactNumber: StudentContactNumber.trim() === "" ? true : !(/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(StudentContactNumber)) ? "wrongpattern" : false,
            studentEmail: Email.trim() === "" ? true : !(/^[a-zA-Z0-9._%+-]+@(gmail|yahoo|mail|outlook)\.(com|org|in)$/.test(Email)) ? "wrongpattern" : false,
            DOB: DOB === " " ? true : DOB > "2008-12-31" || DOB >= moment(new Date()).format("YYYY-MM-DD") ? "wrongpattern" : false,
            regDate: RegDate === " " ? true : (RegDate > moment(new Date()).format("YYYY-MM-DD") || RegDate <= DOB) ? "wrongpattern"  : false,
            sslcBoard: SSLCboard.trim() === "" ? true : !(/^[A-Z][A-Za-z_\s]{3,29}$/.test(SSLCboard)) ? "wrongpattern" : false,
            sslcSchoolName: SSLCSchoolName.trim()=== "" ? true : !(/^[A-Z][A-Za-z_\s]{3,100}$/.test(SSLCSchoolName)) ? "wrongpattern" : false,
            sslcPassedYear: SSLCPassedYear.trim() === "" ? true : !(/^(19|20)\d{2}$/.test(SSLCPassedYear)) ? "wrongpattern" : false,
            sslcPercentage: SSLCPercentage.trim() === "",
            hscBoard: HSCboard.trim() === "" ? true : !(/^[A-Z][A-Za-z_\s]{3,29}$/.test(HSCboard)) ? "wrongpattern" : false,
            hscSchoolName: HSCSchoolName.trim() === "" ? true : !(/^[A-Z][A-Za-z_\s]{3,100}$/.test(HSCSchoolName)) ? "wrongpattern" : false,
            hscPassedYear: HSCPassedYear.trim() === "" ? true :  HSCPassedYear < parseInt(SSLCPassedYear) +2 || !( /^(19|20)\d{2}$/.test(HSCPassedYear))  ? "wrongpattern" : false,
            hscPercentage: HSCPercentage.trim() === "",
            guardianNumber: GuardianNumber.trim() === "" ? true : !(/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(GuardianNumber)) ? "wrongpattern" : false,
            guardianName: GuardianName.trim() === "" ? true : !(/^[A-Z][A-Za-z_\s]{3,29}$/.test(GuardianName)) ? "wrongpattern" : false,
            batchName : BatchName.trim() === "",
            batchStartingDate: BatchStartingDate === " ",
            batchEndDate : BatchEndDate ===" ",
            session : Session.trim() === "",
            sessionStartTime : SessionStartTime === " ",
            sessionEndtime : SessionEndTime === " ",
            courseAdmissionFee : AdmissionFee === "",
            courseName: CourseName.trim() === "",
            addressDN : Address[0].doornum.trim() === "",
            addressStreet : Address[0].street.trim() === "",
            addressPlace : Address[0].place.trim() === "",
            
        };

        let a = Degree.map((Obj) =>{
                            return (Object.entries(Obj).map(val=>{
                                if((val[0] == "yearOfPass" && val[1].toString().trim() == "") || (val[0] == "Percentage" && val[1].toString().trim() == "")||(val[0] == "degree" && val[1].toString().trim() == "")||(val[0] == "College" && val[1].toString().trim() == "")){
                                    let x = val[0] == "yearOfPass" ? Obj["yearOfPassErr"]=true : val[0]=='Percentage' ? Obj["PercentageErr"] = true : val[0] == 'degree' ? Obj["degreeErr"] = true : val[0] =='College' ? Obj["collegeErr"] = true : ""
                                    setDegree([...Degree])
                                    return true
                                }else{
                                    let x = val[0] == "yearOfPass" ? Obj["yearOfPassErr"] = false : val[0] == 'Percentage' ? Obj["PercentageErr"] = false : val[0] == 'degree' ? Obj["degreeErr"] = false : val[0] == 'College' ? Obj["collegeErr"] = false : ""
                                    setDegree([...Degree])
                                    return false
                                }
                                
                            }))
                        })
        if(AdditionalCertificate.length>1  ){
            let b = AdditionalCertificate.map((Obj) =>{
                    return (Object.entries(Obj).map(val=>{
                        if((val[0] == "academy" && val[1].trim() == "") || (val[0] == "days" && val[1].toString().trim() == "")||(val[0] == "course" && val[1].toString().trim() == "")||(val[0].toString().trim() == "time" && val[1] == "")){
                            let x = val[0] == "academy" ? Obj["academyErr"]=true : val[0]=='days' ? Obj["daysErr"] = true : val[0] == 'course' ? Obj["courseErr"] = true : val[0] == 'time' ? Obj["timeErr"] = true : ""
                            setAdditionalCertificate([...AdditionalCertificate])
                            return true
                        }else{
                            let x = val[0] == "academy" ? Obj["academyErr"] = false : val[0] == 'days' ? Obj["daysErr"] = false : val[0] == 'course' ? Obj["courseErr"] = false : val[0] == 'time' ? Obj["timeErr"] = false : ""
                            setAdditionalCertificate([...AdditionalCertificate])
                            return false
                        }
                        
                    }))
                })
        setError(RegisterStudent)
        if (Object.values(RegisterStudent).some(val => val === true || val === "wrongpattern") || (a.flat(Infinity).some(val=>val==true)) || (b.flat(Infinity).some(val=>val==true)) ){

        }
        else{
            if(params.action === "update"){
                Update()
            } else {
                PostStudents()
            }
        };
        } 
        else {
            setError(RegisterStudent)
            if (Object.values(RegisterStudent).some(val => val === true || val === "wrongpattern") || (a.flat(Infinity).some(val=>val==true)) ){

            }
            else{
                if(params.action === "update"){
                    Update()
                } else {
                    PostStudents()
                }
            };
    }
    };

    const Duration = [
        {title:"days"}, {title:"months"}, {title:"year"},
    ];

    useEffect(() => {
        ListBatches()
        ListCourses()
        if(params.action === "read" || params.action === "update"){
            Read()
        }
        if(params.action === "read"){
            setDisable(true)
        }
    }, []);

    return (
        <>
         { Loading ?<div style={{display:"flex", justifyContent:"center", height:"50vh", verticalAlign:"center",}}> <CircularProgress size='lg' variant='soft' /></div>:(<ThemeProvider theme = {theme}>
           <AppBreadcrumbs crntPage='Student Form' prevPage='Students Table' path='/students' />
            <Box sx={{ background: "#fff", pb: 3, borderRadius:"25px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
                {/* General Infos */}
                <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Student Details</Typography>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disable} error={Error.studentName} helperText={Error.studentName === "wrongpattern" ? "Name should start with Caps and have minimum 4 letters" : Error.studentName ? "Student Name is required" : ""} value={StudentName} fullWidth onChange={(e) => setStudentName(e.target.value)} size='small' label="Student Name" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disable} error={Error.studentContactNumber} helperText={Error.studentContactNumber === "wrongpattern" ? "Enter valid Number" : Error.studentContactNumber ? "Contact number is required" : ""} value={StudentContactNumber} fullWidth onChange={(e) => setStudentContactNumber(e.target.value)} size='small' label="Student contact Number" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disable} value={Email} error={Error.studentEmail} helperText={Error.studentEmail === "wrongpattern" ? "Enter valid Email" :  Error.studentEmail ? "Student E-mail is required" :  "" } fullWidth size='small' label="Email" onChange={(e) =>{setEmail(e.target.value)}} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disable} value={DOB} error={Error.DOB} helperText={Error.DOB === "wrongpattern" ? "DOB 01-01-2009 and above students not permitted :) " : Error.DOB ? "Date of Birth is required" : ""} type='date' fullWidth onChange={(e) => setDOB(e.target.value)} size='small' label="Date of Birth" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disable} error={Error.regDate} helperText={ Error.regDate == "wrongpattern" ? "Registration date must be present date" : Error.regDate ? "Registration Date is required" : ""} value={RegDate} type='date' fullWidth onChange={(e) => setRegDate(e.target.value)} size='small' label="Registration Date" />
                    </Grid>
                </Grid>

                {/* Education Details */}
                <Box>
                    <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                        <Grid item xs={12}>
                            <Typography variant='h6'>Educational Details</Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography sx={{ fontWeight: "bold" }}>SSLC</Typography>
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} value={SSLCboard} error={Error.sslcBoard} helperText={ Error.sslcBoard === "wrongpattern" ? "begin with caps" :Error.sslcBoard ? "Board of Learning field is required" : ""} fullWidth onChange={(e) => setSSLCboard(e.target.value)} size='small' label="Board" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} value={SSLCSchoolName} error={Error.sslcSchoolName} helperText={Error.sslcSchoolName === "wrongpattern" ? "Name should start with Caps and have minimum 4 letters" : Error.sslcSchoolName ? "School Name field cannot be Empty" : ""} fullWidth onChange={(e) => setSSLCSchool(e.target.value)} size='small' label="School Name" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} value={SSLCPassedYear} error={Error.sslcPassedYear} helperText={ Error.sslcPassedYear === "wrongpattern" ? "Year format is wrong (eg. 1999)" : Error.sslcPassedYear ? "Field Cannot be Empty" : ""} onChange={(e) => setSSLCPassedYear(e.target.value)} fullWidth on label="Passed-out Year" size="small" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} value={SSLCPercentage} error={Error.sslcPercentage} helperText={Error.sslcPercentage ? "Field Cannot be Empty" : ""} fullWidth label="Percentage of Marks" size="small" onChange={(e) => {if (e.target.value === "" || /^\d*\.?\d*$/.test(e.target.value) && e.target.value <= 100){setSSLCPercentage(e.target.value)}}} />                                                                                                                                                                                                          
                        </Grid>
                    </Grid>
                    <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: "bold" }}>HSC</Typography>
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} value={HSCboard} error={Error.hscBoard} helperText={ Error.hscBoard === "wrongpattern" ? "begin with caps" : Error.hscBoard ? "Select the Board of Learning" : ""} fullWidth onChange={(e) => setHSCboard(e.target.value)} size='small' label="Board" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} value={HSCSchoolName} error={Error.hscSchoolName} helperText={Error.hscSchoolName === "wrongpattern" ? "Name should start with Caps and have minimum 4 letters" : Error.hscSchoolName ? "School Name field cannot be Empty" : ""} fullWidth onChange={(e) => setHSCSchoolName(e.target.value)} size='small' label="School Name" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} value={HSCPassedYear} error={Error.hscPassedYear} helperText={ Error.hscPassedYear === "wrongpattern" ? "HSC year should be atleast 2 years ahead of SSLC" : Error.hscPassedYear ? "Field Cannot be Empty" : ""} onChange={(e) => setHSCPassedYear(e.target.value)} fullWidth on label="Passed-out Year" size="small" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} value={HSCPercentage} error={Error.hscPercentage} helperText={Error.hscPercentage ? "Field Cannot be Empty" : ""} onChange={(e) => {if (e.target.value === "" || /^\d*\.?\d*$/.test(e.target.value) && e.target.value <= 100){setHSCPercentage(e.target.value)}}} fullWidth label="Percentage of Marks" size="small" />
                        </Grid>
                    </Grid>
                    <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Typography variant='h6'>UnderGraduate / PostGraduate</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button disabled={Disable} disableElevation disableRipple variant='contained' style={{backgroundColor:"#4daaff",}} 
                                    onClick={()=>{let a = Degree.map((Obj) =>{
                                       return (Object.entries(Obj).map(val=>{
                                            if((val[0] == "yearOfPass" && val[1].toString().trim() == "") || (val[0] == "Percentage" && val[1].toString().trim() == "")||(val[0] == "degree" && val[1].toString().trim() == "")||(val[0] == "College" && val[1].toString().trim() == "")){
                                                let x = val[0] == "yearOfPass" ? Obj["yearOfPassErr"]=true : val[0]=='Percentage' ? Obj["PercentageErr"] = true : val[0] == 'degree' ? Obj["degreeErr"] = true : val[0] == 'College' ? Obj["collegeErr"] = true : ""
                                                setDegree([...Degree])
                                                return true
                                            }else{
                                               let x = val[0] == "yearOfPass" ? Obj["yearOfPassErr"] = false : val[0] == 'Percentage' ? Obj["PercentageErr"] = false : val[0] == 'degree' ? Obj["degreeErr"] = false : val[0] == 'College' ? Obj["collegeErr"] = false : ""
                                               setDegree([...Degree])
                                               return false
                                            }
                                           
                                        }))
                                    })
                                    if(a.flat(Infinity).some(val=>val==true)){
                                    }else{
                                        setDegree([...Degree, {"id": Degree.length + 1, "degree": "", "College": "", "yearOfPass": "", "Percentage": "", "collegeErr" : false, "degreeErr": false, "yearOfPassErr": false, "PercentageErr": false, }])
                                    }
                                    }}>
                                        Add
                                        <AddCircleOutlineIcon />
                                    </Button>
                                </Grid>
                                {/* <Grid item xs={1}>
                                    <Button disabled={Disable} disableElevation disableRipple style={{backgroundColor:"#ff726f", color:"#fff"}} onClick={() => setDegree(Degree.slice(0, -1))} variant='contained' sx={{display: (Degree.length > 1) ? "block" : "none"}}>Cancel</Button>
                                </Grid> */}
                            </Grid>
                        </Grid>
                        {Degree.map((val, ind)=>{
                            return(
                                <Grid container rowGap={3} columnGap={5} key={ind}>
                                    <Grid item xs={10} md={3.5}>
                                        <TextField error={val.degreeErr} helperText={val.degreeErr ? "Degree Name is required" : ""} disabled={Disable} value={val.degree}  onChange={(e) => {
                                            const newDegree = [...Degree];
                                            newDegree[ind].degree = e.target.value;
                                            setDegree(newDegree)
                                        }} fullWidth label="Degree Name" size='small' />
                                    </Grid>
                                    <Grid item xs={10} md={3.5}>
                                        <TextField error={val.collegeErr} helperText={val.collegeErr? "College Name is required" : ""} disabled={Disable} value={val.College} onChange={(e) => {
                                            const newDegree = [...Degree];
                                            newDegree[ind].College = e.target.value;
                                            setDegree(newDegree)
                                        }} fullWidth label="College Name" size='small' />
                                    </Grid>
                                    <Grid item xs={10} md={3.5}>
                                        <TextField error={val.yearOfPassErr} helperText={val.yearOfPassErr ? "Year of Passing is required" : ""} disabled={Disable} value={val.yearOfPass} onChange={(e) => {
                                            const newDegree = [...Degree];
                                            if(/^\d*\.?\d*$/.test(e.target.value ) && e.target.value <= (moment(new Date()).format("YYYY"))){
                                                newDegree[ind].yearOfPass = e.target.value;
                                                setDegree(newDegree)
                                            }

                                        }} fullWidth label="Year of Passing" size='small' />
                                    </Grid>
                                    <Grid item xs={10} md={3.5}>
                                        <TextField error={val.PercentageErr} helperText={val.PercentageErr ? "Percentage of Marks is required" : ""} disabled={Disable} value={val.Percentage} onChange={(e) => {
                                            const newDegree = [...Degree];
                                            if(/^\d*\.?\d*$/.test(e.target.value ) && e.target.value <= 100){
                                                newDegree[ind].Percentage = e.target.value;
                                                setDegree(newDegree)
                                            }
                                        }} fullWidth label="Percentage of Marks" size='small' />
                                    </Grid>
                                    <IconButton disabled={Disable} disableElevation disableRipple variant='contained' sx={{display: ( ind > 0) ? "block" : "none"}}
                                                onClick={() =>{
                                                    const updatedDegree = [...Degree];
                                                    updatedDegree.splice(ind, 1);
                                                    setDegree(updatedDegree)
                                                }}>
                                        <Clear/>
                                    </IconButton>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>

                {/* Parent/ Guardian Detail*/}
                <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Parent/Guardian Details</Typography>
                    </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} value={GuardianName} error={Error.guardianName} helperText={Error.guardianName === "wrongpattern" ? "Name should start with Caps and have minimum 4 letters" : Error.guardianName ? "Guardian Name required" : ""} fullWidth onChange={(e) => setGuardianName(e.target.value)} size='small' label="Parent/Guardian Name" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} value={GuardianNumber} error={Error.guardianNumber} helperText={Error.guardianNumber === "wrongpattern" ? "Enter valid Number" : Error.guardianNumber ? "Guardian Number required" : ""} fullWidth onChange={(e) => setGaurdianNumber(e.target.value)} size='small' label="Gaurdian Contact Number" />
                        </Grid>
                </Grid>

                {/* Address */}
                <Grid container paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Address</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {Address.map((val, ind)=>{
                            return(
                                <>
                                <Grid container rowGap={3} columnGap={5} paddingTop={3}>
                                    <Grid item xs={10} md={3.5}>
                                        <TextField error={Error.addressDN} helperText={Error.addressDN ? "Home Door Number is required" : ""} disabled={Disable} value={val.doornum} onChange={(e) => {
                                            const newAddress = [...Address]
                                            newAddress[ind].doornum = e.target.value;
                                            setAddress(newAddress)
                                        }} fullWidth label=" Door Number" size='small' />
                                    </Grid>
                                    <Grid item xs={10} md={3.5}>
                                        <TextField error={Error.addressStreet} helperText={Error.addressStreet ? "Street Name is required" : ""} disabled={Disable} value={val.street} onChange={(e) => {
                                            const newAddress = [...Address]
                                            newAddress[ind].street = e.target.value;
                                            setAddress(newAddress)
                                        }} fullWidth label="Street" size='small' />
                                    </Grid>
                                    <Grid item xs={10} md={3.5}>
                                        <TextField error={Error.addressPlace} helperText={Error.addressPlace ? "Place Name is required" : ""} disabled={Disable} value={val.place} onChange={(e) => {
                                            const newAddress = [...Address]
                                            newAddress[ind].place = e.target.value;
                                            setAddress(newAddress)
                                        }} fullWidth label="Place" size='small' />
                                    </Grid>
                                </Grid>
                                </>
                            )
                        })}
                    </Grid>
                </Grid>
                {/* Additional Certifications */}
                <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography variant='h6'>Additional Certifications</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Button disabled={Disable} disableElevation disableRipple variant='contained' style={{backgroundColor:"#4daaff",}} 
                                onClick={() => 
                                {
                                let a = AdditionalCertificate.map((Obj) =>{
                                       return (Object.entries(Obj).map(val=>{
                                            if((val[0] == "academy" && val[1].trim() == "") || (val[0] == "days" && val[1].toString().trim() == "")||(val[0] == "course" && val[1].toString().trim() == "")||(val[0].toString().trim() == "time" && val[1] == "")){
                                                let x = val[0] == "academy" ? Obj["academyErr"]=true : val[0]=='days' ? Obj["daysErr"] = true : val[0] == 'course' ? Obj["courseErr"] = true : val[0] == 'time' ? Obj["timeErr"] = true : ""
                                                setAdditionalCertificate([...AdditionalCertificate])
                                                return true
                                            }else{
                                               let x = val[0] == "academy" ? Obj["academyErr"] = false : val[0] == 'days' ? Obj["daysErr"] = false : val[0] == 'course' ? Obj["courseErr"] = false : val[0] == 'time' ? Obj["timeErr"] = false : ""
                                               setAdditionalCertificate([...AdditionalCertificate])
                                               return false
                                            }
                                           
                                        }))
                                    })
  
                                    if(a.flat(Infinity).some(val=>val==true)){
                                    }else{
                                        setAdditionalCertificate([...AdditionalCertificate, {"id": AdditionalCertificate.length + 1,  "academy": "", "course": "", "time" :"", "days": "", "academyErr" : false, "courseErr" : false, "timeErr" : false, "daysErr" : false, }])
                                    }
                                    }
                                }>
                                    Add<AddCircleOutlineIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    {AdditionalCertificate.map((val, ind) => {
                        return (
                            <Grid container key={ind} rowGap={3} columnGap={5}>
                                <Grid item xs={10} md={3.5}>
                                    <TextField disabled={Disable} value={val.academy} error={val.academyErr} helperText={val.academyErr ? "Academy Name is required" : ""}
                                     onChange={(e) => {
                                        const newCertificate = [...AdditionalCertificate];
                                        newCertificate[ind].academy = e.target.value;
                                        setAdditionalCertificate(newCertificate)
                                    }} fullWidth label="Academy Name" size='small' />
                                </Grid>
                                <Grid item xs={10} md={3.5}>
                                    <TextField disabled={Disable} value={val.course}  error={val.courseErr} helperText={val.courseErr ? "Course Name is required" : ""}
                                    onChange={(e) => {
                                        const newCertificate = [...AdditionalCertificate];
                                        newCertificate[ind].course = e.target.value;
                                        setAdditionalCertificate(newCertificate)
                                    }} fullWidth label="Course Name" size='small' />
                                </Grid>
                                <Grid item xs={10} md={4}>
                                    <Grid container columnGap={1}>
                                        <Grid item xs={4}>
                                            <TextField disabled={Disable} value={val.time}  error={val.timeErr} helperText={val.timeErr ? "Duration of course is required" : ""}
                                            onChange={(e) => {
                                                const newCertificate = [...AdditionalCertificate];
                                                if((newCertificate[ind].academy != "" || newCertificate[ind].course != "" ) && /^\d*\.?\d*$/.test(e.target.value)){
                                                    newCertificate[ind].time = e.target.value;
                                                    setAdditionalCertificate(newCertificate)
                                                }
                                            }} fullWidth label="Duration" size='small' />
                                        </Grid>
                                        <Grid item xs={7} sx={{ display:'flex'}}>
                                            <Autocomplete sx={{width:"200px"}}
                                            disabled={Disable}
                                            value={val.days}  
                                            onChange={(e, newValue) => {
                                                const newCertificate = [...AdditionalCertificate];
                                                if (newCertificate[ind].time != "" ){
                                                    newCertificate[ind].days = newValue;
                                                    setAdditionalCertificate(newCertificate);
                                                }else if(newCertificate[ind].time == ""){
                                                    newCertificate[ind].daysErr = "false"
                                                }
                                            }}
                                            getOptionLabel={(option) => option.title || ''}
                                            size="small"
                                            disablePortal
                                            options={Duration}
                                            renderInput={(params) => <TextField {...params} label="Period" error={val.daysErr} helperText={ val.daysErr ? "Duration of course required" : ""} />} />
                                            <IconButton  disabled={Disable} disableElevation disableRipple variant='contained' sx={{display: (ind === 0 ) ? "none" : "block", p:0}} 
                                                                onClick={() =>{
                                                                                const UpdatedCertificate = [...AdditionalCertificate];
                                                                                UpdatedCertificate.splice(ind, 1);
                                                                                setAdditionalCertificate(UpdatedCertificate)
                                                                            }}>
                                                <Clear/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                           
                           
                            </Grid>
                        )
                    })}
                </Grid>

                <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Course Details</Typography>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <Autocomplete disabled={Disable} size='small' value={{CourseName}} disablePortal options={Courses} onChange={getCourseDetails} getOptionLabel={(option) => option.CourseName} renderInput={(params) => <TextField {...params} error={Error.courseName} helperText={Error.courseName ? "Course Name is required" : ""} label="Course Enrolled For" />} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disable} error={Error.courseAdmissionFee} helperText={Error.courseAdmissionFee ? "Admission Fee is required" : ""} name='AdmissionFee' value={AdmissionFee} fullWidth size='small' label="Admission Fee" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <Autocomplete disabled={Disable}  size='small' disablePortal value={{BatchName}} options={Batch} getOptionDisabled={(option) => option.BatchStatus !== 'Active'} onChange={getBatchDetails} getOptionLabel={(option) => option.BatchName} renderInput={(params) => <TextField {...params} error={Error.batchName} helperText={Error.batchName ? "Batch Name is required" : ""} label="Batch" />} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.batchStartingDate} helperText={Error.batchStartingDate ? "Batch Start date is required" : ""} disabled={Disable} name='BatchStartDate' type='date' value={BatchStartingDate} inputProps={{readOnly:true}} onChange={(e) => setBatchStartingDate(e.target.value)} fullWidth label="Batch Starting Date" size="small" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.batchEndDate} helperText={Error.batchEndDate ? "Batch End Date is required" : ""} disabled={Disable} name='BatchEndDate' type='date' value={BatchEndDate} inputProps={{readOnly:true}} onChange={(e) => setBatchEndDate(e.target.value)} fullWidth label="Batch Ending Date" size="small" />
                    </Grid>
                    {/* inputProps={{readOnly:true}} */}
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.session} helperText={Error.session ? "Session is required" : ""} disabled={Disable} name='Session' type='text' value={Session} inputProps={{readOnly:true}} onChange={(e) => setBatchStartingDate(e.target.value)} fullWidth label="Session" size="small" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.sessionStartTime} helperText={Error.sessionStartTime ? "Session Start Time is required" : ""} disabled={Disable} type='time' value={SessionStartTime} inputProps={{readOnly:true}} onChange={(e) => setBatchStartingDate(e.target.value)} fullWidth label="Session Starting Time" size="small" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.sessionEndtime} helperText={Error.sessionEndtime ? "Session End Time is required" : ""} disabled={Disable} type='time' value={SessionEndTime} inputProps={{readOnly:true}} onChange={(e) => setBatchEndDate(e.target.value)} fullWidth label="Session Ending Time" size="small" />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 3, display: "flex", justifyContent: "end", mr:8 }}>
                    {params.action === "read" ? "" :
                    <Button style={{backgroundColor:"#4daaff",}} disableElevation disableRipple onClick={handleSubmit} variant='contained'>{params.action==="update"? "Update" : "Submit"}</Button> }
                    <Link to='/students'><Button disableElevation disableRipple style={{ marginLeft: "10px", backgroundColor:"#ff726f" }} variant='contained' color='error'>{params.action == "read" ? "Back" : "Cancel"}</Button></Link>
                </Box>
            </Box>
        </ThemeProvider>)}
        </>
    )
}
