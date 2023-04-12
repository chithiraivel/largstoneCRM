import { Box, Button, Grid, TextField, Typography, createTheme, ThemeProvider, Autocomplete } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment/moment';
import AppBreadcrumbs from '../breadCrumbs/breadcrumbs';
import AxiosInstance from '../../axiosinstance';

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

    const [Degree, setDegree] = useState([{"id": 1, "degree": "", "College": "", "yearOfPass": "", "Percentage": ""}]);

    const [GuardianName, setGuardianName] = useState("");
    const [GuardianNumber, setGaurdianNumber] = useState("");

    const [Address, setAddress] = useState([{"doornum": "", "street": "", "place":""}]);
    
    const [AdditionalCertificate, setAdditionalCertificate] = useState([{ "id": 1, "academy": "", "course": "", "time" :"", "days": ""}]);

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
        ugDegreeName: false,
        degreeCollege: false,
        degreeName: false,
        degreePercentage: false,
        degreePassingYear: false,
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
            res.data.result ? props.history.push('/students') : alert(res.data.result);   
        });
    };

    const Read = ()=>{
        AxiosInstance.put('registration/read',{StudentID: params.StudentID} ).then((res)=>{
            if (res.data.status){
                
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
            };
        })
    }

    const Update = ()=>{

        let HSC = JSON.stringify({HSCboard, HSCSchoolName, HSCPassedYear, HSCPercentage});
        let SSLC = JSON.stringify({SSLCboard, SSLCSchoolName, SSLCPassedYear, SSLCPercentage});
        let data = {
            StudentName, MobileNumber: StudentContactNumber, Email, DOB, RegDate, AdmissionFee, GuardianName, GuardianNumber, BatchID, CourseID,
            HSC, Certification: JSON.stringify(AdditionalCertificate), SSLC, Degree: JSON.stringify(Degree), Address: JSON.stringify(Address), UpdatedBy, UpdatedDate, StudentID: params.StudentID
        };
        AxiosInstance.post('registration/update', data).then((res)=>{
            res.data.result ? props.history.push('/students') : alert(res.data.result);
        })
    };

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

    const handleSubmit = () => {
        const RegisterStudent = {
            studentName: StudentName === "",
            studentContactNumber: StudentContactNumber === "",
            studentEmail: Email === "",
            DOB: DOB ===" ",
            regDate: RegDate === " ",
            sslcBoard: SSLCboard === "",
            sslcSchoolName: SSLCSchoolName === "",
            sslcPassedYear: SSLCPassedYear === "",
            sslcPercentage: SSLCPercentage === "",
            hscBoard: HSCboard === "",
            hscSchoolName: HSCSchoolName === "",
            hscPassedYear: HSCPassedYear === "",
            hscPercentage: HSCPercentage === "",
            degreeCollege :Degree.map((obj, ind) => (obj.College)).some(val => val == ""),
            degreeName :Degree.map((obj, ind) => (obj.degree)).some(val => val == ""),
            degreePercentage :Degree.map((obj, ind) => (obj.Percentage)).some(val => val == ""),
            degreePassingYear :Degree.map((obj, ind) => (obj.yearOfPass)).some(val => val == ""),
            guardianNumber: GuardianNumber === "",
            guardianName: GuardianName === "",
            batchName : BatchName === "",
            batchStartingDate: BatchStartingDate === " ",
            batchEndDate : BatchEndDate ===" ",
            session : Session === "",
            sessionStartTime : SessionStartTime === " ",
            sessionEndtime : SessionEndTime === " ",
            courseAdmissionFee : AdmissionFee === "",
            courseName: CourseName === "",
            addressDN : Address.map((obj)=> (obj.doornum)).some(val => val ==""),
            addressStreet : Address.map((obj)=> (obj.street)).some(val => val ==""),
            addressPlace : Address.map((obj)=> (obj.place)).some(val => val ==""),
        };
        setError(RegisterStudent)
        console.log("cer", AdditionalCertificate);
         console.log("reg",RegisterStudent);
        if (Object.values(RegisterStudent).some(val => val == true )){}
        else{
            if(params.action == "update"){
                Update()
            } else {
                PostStudents()
            }
        };
    };

    const Duration = [
        {title:"days"}, {title:"months"}, {title:"year"},
    ];

    useEffect(() => {
        ListBatches()
        ListCourses()
        Read()
        if(params.action == "read"){
            setDisable(true)
        }
    }, []);

    return (
        <ThemeProvider theme = {theme}>
            <AppBreadcrumbs crntPage='Student Form' prevPage='Students Table' path='/students' />
            <Box sx={{ background: "#fff", pb: 3, borderRadius:"25px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
                {/* Student Details */}
                <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Student Details</Typography>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disable} error={Error.studentName} helperText={Error.studentName ? "* Student Name is required" : ""} value={StudentName} fullWidth onChange={(e) => setStudentName(e.target.value)} size='small' label="Student Name" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disable} error={Error.studentContactNumber} helperText={Error.studentContactNumber ? "*  Contact number is required" : ""} value={StudentContactNumber} fullWidth onChange={(e) => setStudentContactNumber(e.target.value)} size='small' label="Student contact Number" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disable} value={Email} error={Error.studentEmail} helperText={Error.studentEmail ? "Student E-mail field cannot be empty" : ""} fullWidth onChange={(e) => setEmail(e.target.value)} size='small' label="Email" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disable} value={DOB} error={Error.DOB} helperText={Error.DOB ? "Date of Birth needed!" : ""} type='date' fullWidth onChange={(e) => setDOB(e.target.value)} size='small' label="Date of Birth" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disable} error={Error.regDate} helperText={Error.regDate ? "Registration Date Cannot be Empty" : ""} value={RegDate} type='date' fullWidth onChange={(e) => setRegDate(e.target.value)} size='small' label="Registration Date" />
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
                            <TextField disabled={Disable} value={SSLCboard} error={Error.sslcBoard} helperText={Error.sslcBoard ? "Select the Board of Learning" : ""} fullWidth onChange={(e) => setSSLCboard(e.target.value)} size='small' label="Board" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} value={SSLCSchoolName} error={Error.sslcSchoolName} helperText={Error.sslcSchoolName ? "School Name field cannot be Empty" : ""} fullWidth onChange={(e) => setSSLCSchool(e.target.value)} size='small' label="School Name" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} value={SSLCPassedYear} error={Error.sslcPassedYear} helperText={Error.sslcPassedYear ? "Field Cannot be Empty" : ""} onChange={(e) => setSSLCPassedYear(e.target.value)} fullWidth on label="Passed-out Year" size="small" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} value={SSLCPercentage} error={Error.sslcPercentage} helperText={Error.sslcPercentage ? "Field Cannot be Empty" : ""} onChange={(e) => setSSLCPercentage(e.target.value)} fullWidth label="Percentage of Marks" size="small" />
                        </Grid>
                    </Grid>
                    <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: "bold" }}>HSC</Typography>
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} value={HSCboard} error={Error.hscBoard} helperText={Error.hscBoard ? "Select the Board of Learning" : ""} fullWidth onChange={(e) => setHSCboard(e.target.value)} size='small' label="Board" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} value={HSCSchoolName} error={Error.hscSchoolName} helperText={Error.hscSchoolName ? "School Name field cannot be Empty" : ""} fullWidth onChange={(e) => setHSCSchoolName(e.target.value)} size='small' label="School Name" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} value={HSCPassedYear} error={Error.hscPassedYear} helperText={Error.hscPassedYear ? "Field Cannot be Empty" : ""} onChange={(e) => setHSCPassedYear(e.target.value)} fullWidth on label="Passed-out Year" size="small" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} value={HSCPercentage} error={Error.hscPercentage} helperText={Error.hscPercentage ? "Field Cannot be Empty" : ""} onChange={(e) => setHSCPercentage(e.target.value)} fullWidth label="Percentage of Marks" size="small" />
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
                                    onClick={() => setDegree([...Degree, { "id": Degree.length + 1, "degree": "", "College":"", "yearOfPass":"", "Percentage":"" }])}>Add<AddCircleOutlineIcon /></Button>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button disabled={Disable} disableElevation disableRipple style={{backgroundColor:"#ff726f", color:"#fff"}} onClick={() => setDegree(Degree.slice(0, -1))} variant='contained' sx={{display: (Degree.length > 1) ? "block" : "none"}}>Cancel</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        {Degree.map((val, ind)=>{
                            return(
                                <Grid container rowGap={3} columnGap={5} key={ind}>
                                    <Grid item xs={10} md={3.5}>
                                        <TextField error={Error.degreeName} helperText={Error.degreeName ? "Degree Name is required" : ""} disabled={Disable} value={val.degree}  onChange={(e) => {
                                            const newDegree = [...Degree];
                                            newDegree[ind].degree = e.target.value;
                                            setDegree(newDegree)
                                        }} fullWidth label="Degree Name" size='small' />
                                    </Grid>
                                    <Grid item xs={10} md={3.5}>
                                        <TextField error={Error.degreeCollege} helperText={Error.degreeCollege ? "College Name is required" : ""} disabled={Disable} value={val.College} onChange={(e) => {
                                            const newDegree = [...Degree];
                                            newDegree[ind].College = e.target.value;
                                            setDegree(newDegree)
                                        }} fullWidth label="College Name" size='small' />
                                    </Grid>
                                    <Grid item xs={10} md={3.5}>
                                        <TextField error={Error.degreePercentage} helperText={Error.degreePercentage ? "Percentage of Marks is required" : ""} disabled={Disable} value={val.Percentage} onChange={(e) => {
                                            const newDegree = [...Degree];
                                            newDegree[ind].Percentage = e.target.value;
                                            setDegree(newDegree)
                                        }} fullWidth label="Percentage of Marks" size='small' />
                                    </Grid>
                                    <Grid item xs={10} md={3.5}>
                                        <TextField error={Error.degreePassingYear} helperText={Error.degreePassingYear ? "Year of Passing is required" : ""} disabled={Disable} value={val.yearOfPass} onChange={(e) => {
                                            const newDegree = [...Degree];
                                            newDegree[ind].yearOfPass = e.target.value;
                                            setDegree(newDegree)
                                        }} fullWidth label="Year of Passing" size='small' />
                                    </Grid>
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
                            <TextField disabled={Disable} value={GuardianName} error={Error.guardianName} helperText={Error.guardianName ? "Guardian Name required" : ""} fullWidth onChange={(e) => setGuardianName(e.target.value)} size='small' label="Parent/Guardian Name" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} value={GuardianNumber} error={Error.guardianNumber} helperText={Error.guardianNumber ? "Guardian Number required" : ""} fullWidth onChange={(e) => setGaurdianNumber(e.target.value)} size='small' label="Gaurdian Contact Number" />
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
                                onClick={() => setAdditionalCertificate([...AdditionalCertificate, { "id": AdditionalCertificate.length + 1, "description": "" }])}>Add<AddCircleOutlineIcon /></Button>
                            </Grid>
                            <Grid item xs={1}>
                                <Button disabled={Disable} disableElevation disableRipple style={{backgroundColor:"#ff726f", color:"#fff"}} onClick={() => setAdditionalCertificate(AdditionalCertificate.slice(0, -1))} variant='contained' sx={{display: (AdditionalCertificate.length > 1) ? "block" : "none"}}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    {AdditionalCertificate.map((val, ind) => {
                        return (
                            <Grid container key={ind} rowGap={3} columnGap={5}>
                                <Grid item xs={10} md={3.5}>
                                    <TextField disabled={Disable} error={Error.additionalCertificate && !val.academy}
                                        helperText={
                                            Error.additionalCertificate && !val.academy
                                            ? "Academy name is required"
                                            : "" } value={val.academy} onChange={(e) => {
                                        const newCertificate = [...AdditionalCertificate];
                                        newCertificate[ind].academy = e.target.value;
                                        setAdditionalCertificate(newCertificate)
                                    }} fullWidth label="Academy Name" size='small' />
                                </Grid>
                                <Grid item xs={10} md={3.5}>
                                    <TextField disabled={Disable} value={val.course} onChange={(e) => {
                                        const newCertificate = [...AdditionalCertificate];
                                        newCertificate[ind].course = e.target.value;
                                        setAdditionalCertificate(newCertificate)
                                    }} fullWidth label="Course Name" size='small' />
                                </Grid>
                                <Grid item xs={10} md={3.5}>
                                    <Grid container columnGap={1}>
                                        <Grid item xs={5.5}>
                                            <TextField disabled={Disable} value={val.time} onChange={(e) => {
                                                const newCertificate = [...AdditionalCertificate];
                                                newCertificate[ind].time = e.target.value;
                                                setAdditionalCertificate(newCertificate)
                                            }} fullWidth label="Duration" size='small' />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Autocomplete 
                                            disabled={Disable}
                                            value={val.days}
                                            onChange={(e, newValue) => {
                                                const newCertificate = [...AdditionalCertificate];
                                                newCertificate[ind].days = newValue;
                                                setAdditionalCertificate(newCertificate);
                                            }}
                                            getOptionLabel={(option) => option.title || ''}
                                            size="small"
                                            disablePortal
                                            options={Duration}
                                            renderInput={(params) => <TextField {...params} label="Period" />} />
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
                    {params.action == "read" ? "" :
                    <Button style={{backgroundColor:"#4daaff",}} disableElevation disableRipple onClick={handleSubmit} variant='contained'>{params.action=="update"? "Update" : "Submit"}</Button> }
                    <Link to='/students'><Button disableElevation disableRipple style={{ marginLeft: "10px", backgroundColor:"#ff726f" }} variant='contained' color='error'>{params.action == "read" ? "Back" : "Cancel"}</Button></Link>
                </Box>
            </Box>
        </ThemeProvider>
    )
}
