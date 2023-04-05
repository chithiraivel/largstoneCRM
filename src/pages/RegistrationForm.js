import { Box, Button, Grid, TextField, Typography, createTheme, ThemeProvider, Autocomplete } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
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

export default function Form(props) {

    const [Batch, setBatch] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/batches/list').then((res) => {
            setBatch([...res.data.result]);
        });
        axios.get('http://localhost:8080/courses/list').then((res) => {
            setCourses([...res.data.result]);
        });
    }, []);
    
    const [Courses, setCourses] = useState([]);
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

    const [Degree, setDegree] = useState([{"id": 1, "degree": "", "College":"", "yearOfPass":"", "Percentage":""}]);
    
    const [GuardianName, setGuardianName] = useState("");
    const [GuardianNumber, setGaurdianNumber] = useState("");

    const [Address, setAddress] = useState([{"doornum":"", "street":"", "place":""}]);

    const [AdditionalCertificate, setAdditionalCertificate] = useState([{ "id": 1, "academy": "", "course":"", "time":"", "days":""}]);
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
        degree: false,
        ugCollegeName: false,
        ugCollegePassedYear: false,
        ugCollegePercentage: false,
        guardianName: false,
        guardianNumber: false,
        additionalCertificate: false,
        batchName: false,
        batchStartingDate: false,
        batchEndDate: false,
        courseName: false,
        courseAdmissionFee: false,
    });

    const getCourseDetails = (e, val) => {
        setCourseID(val.CourseID);
        setAdmissionFee(val.AdmissionFee)
    };

    const getBatchDetails = (e, val) => {
        setBatchStartingDate(moment(val.BatchStartDate).format("YYYY-MM-DD"));
        setBatchEndDate(moment(val.BatchEndDate).format("YYYY-MM-DD"));
        setSession(val.Session)
        setSessionEndTime(val.SessionEndTime);
        setSessionStartTime(val.SessionStartTime);
        setBatchID(val.BatchID)
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
            guardianNumber: GuardianNumber === "",
            guardianName: GuardianName === "",
        };    
        setError(RegisterStudent)
        if (Object.values(RegisterStudent).some(val => val == true )){}
        else{
            let HSC = JSON.stringify({HSCboard, HSCSchoolName, HSCPassedYear, HSCPercentage});
            let SSLC = JSON.stringify({SSLCboard, SSLCSchoolName, SSLCPassedYear, SSLCPercentage});

            let data = {
                StudentName, MobileNumber: StudentContactNumber, Email, DOB, RegDate, AdmissionFee, GuardianName, GuardianNumber, CourseID,  BatchID,
                HSC, Certification: JSON.stringify(AdditionalCertificate), SSLC, Degree: JSON.stringify(Degree), CreatedBy, CreatedDate
            };
            axios.post("http://localhost:8080/registration/register", data ).then((res) => {     
                console.log(res.data.result, "result"); 
                res.data.result ? props.history.push('/students/table') : alert(res.data.result);   
                });
        };
    };

    const Duration = [
        {title:"days"}, {title:"months"}, {title:"year"},
    ];

    // useEffect(() => {

    // }, [AdditionalCertificate.length,AdmissionFee])
    // const handlesubmit = (e) => { e.preventDefault() };

    return (
        <ThemeProvider theme = {theme}>
            <AppBreadcrumbs crntPage='Student Form' prevPage='Students Table' path='/students/table' />
            <Box sx={{ background: "#fff", pb: 3, borderRadius:"25px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
                {/* Student Details */}
                <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Student Details</Typography>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.regDate} helperText={Error.studentName ? "Student Name field cannot be empty" : ""} value={StudentName} fullWidth onChange={(e) => setStudentName(e.target.value)} size='small' label="Student Name" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.studentContactNumber} helperText={Error.studentContactNumber ? "Student Contact number needed" : ""} value={StudentContactNumber} fullWidth onChange={(e) => setStudentContactNumber(e.target.value)} size='small' label="Student contact Number" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField value={Email} error={Error.studentEmail} helperText={Error.studentEmail ? "Student E-mail field cannot be empty" : ""} fullWidth onChange={(e) => setEmail(e.target.value)} size='small' label="Email" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField value={DOB} error={Error.DOB} helperText={Error.DOB ? "Date of Birth needed!" : ""} type='date' fullWidth onChange={(e) => setDOB(e.target.value)} size='small' label="Date of Birth" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.regDate} helperText={Error.regDate ? "Registration Date Cannot be Empty" : ""} value={RegDate} type='date' fullWidth onChange={(e) => setRegDate(e.target.value)} size='small' label="Registration Date" />
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
                            <TextField value={SSLCboard} error={Error.sslcBoard} helperText={Error.sslcBoard ? "Select the Board of Learning" : ""} fullWidth onChange={(e) => setSSLCboard(e.target.value)} size='small' label="Board" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField value={SSLCSchoolName} error={Error.sslcSchoolName} helperText={Error.sslcSchoolName ? "School Name field cannot be Empty" : ""} fullWidth onChange={(e) => setSSLCSchool(e.target.value)} size='small' label="School Name" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField value={SSLCPassedYear} error={Error.sslcPassedYear} helperText={Error.sslcPassedYear ? "Field Cannot be Empty" : ""} onChange={(e) => setSSLCPassedYear(e.target.value)} fullWidth on label="Passed-out Year" size="small" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField value={SSLCPercentage} error={Error.sslcPercentage} helperText={Error.sslcPercentage ? "Field Cannot be Empty" : ""} onChange={(e) => setSSLCPercentage(e.target.value)} fullWidth label="Percentage of Marks" size="small" />
                        </Grid>
                    </Grid>
                    <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: "bold" }}>HSC</Typography>
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField value={HSCboard} error={Error.hscBoard} helperText={Error.hscBoard ? "Select the Board of Learning" : ""} fullWidth onChange={(e) => setHSCboard(e.target.value)} size='small' label="Board" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField value={HSCSchoolName} error={Error.hscSchoolName} helperText={Error.hscSchoolName ? "School Name field cannot be Empty" : ""} fullWidth onChange={(e) => setHSCSchoolName(e.target.value)} size='small' label="School Name" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField value={HSCPassedYear} error={Error.hscPassedYear} helperText={Error.hscPassedYear ? "Field Cannot be Empty" : ""} onChange={(e) => setHSCPassedYear(e.target.value)} fullWidth on label="Passed-out Year" size="small" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField value={HSCPercentage} error={Error.hscPercentage} helperText={Error.hscPercentage ? "Field Cannot be Empty" : ""} onChange={(e) => setHSCPercentage(e.target.value)} fullWidth label="Percentage of Marks" size="small" />
                        </Grid>
                    </Grid>
                    <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Typography variant='h6'>UnderGraduate / PostGraduate</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button disableElevation disableRipple variant='contained' style={{backgroundColor:"#4daaff",}} 
                                    onClick={() => setDegree([...Degree, { "id": Degree.length + 1, "degree": "", "College":"", "yearOfPass":"", "Percentage":"" }])}>Add<AddCircleOutlineIcon /></Button>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button disableElevation disableRipple style={{backgroundColor:"#ff726f", color:"#fff"}} onClick={() => setDegree(Degree.slice(0, -1))} variant='contained' sx={{display: (Degree.length > 1) ? "block" : "none"}}>Cancel</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        {Degree.map((val, ind)=>{
                            return(
                                <Grid container rowGap={3} columnGap={5} key={ind}>
                                    <Grid item xs={10} md={3.5}>
                                        <TextField value={val.degree} onChange={(e) => {
                                            const newDegree = [...Degree];
                                            newDegree[ind].degree = e.target.value;
                                            setDegree(newDegree)
                                        }} fullWidth label="Degree Name" size='small' />
                                    </Grid>
                                    <Grid item xs={10} md={3.5}>
                                        <TextField value={val.College} onChange={(e) => {
                                            const newDegree = [...Degree];
                                            newDegree[ind].College = e.target.value;
                                            setDegree(newDegree)
                                        }} fullWidth label="College Name" size='small' />
                                    </Grid>
                                    <Grid item xs={10} md={3.5}>
                                        <TextField value={val.Percentage} onChange={(e) => {
                                            const newDegree = [...Degree];
                                            newDegree[ind].Percentage = e.target.value;
                                            setDegree(newDegree)
                                        }} fullWidth label="Percentage of Marks" size='small' />
                                    </Grid>
                                    <Grid item xs={10} md={3.5}>
                                        <TextField value={val.yearOfPass} onChange={(e) => {
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
                            <TextField value={GuardianName} error={Error.guardianName} helperText={Error.guardianName ? "Guardian Name required" : ""} fullWidth onChange={(e) => setGuardianName(e.target.value)} size='small' label="Parent/Guardian Name" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField value={GuardianNumber} error={Error.guardianNumber} helperText={Error.guardianNumber ? "Guardian Number required" : ""} fullWidth onChange={(e) => setGaurdianNumber(e.target.value)} size='small' label="Gaurdian Contact Number" />
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
                                <Button disableElevation disableRipple variant='contained' style={{backgroundColor:"#4daaff",}} 
                                onClick={() => setAdditionalCertificate([...AdditionalCertificate, { "id": AdditionalCertificate.length + 1, "description": "" }])}>Add<AddCircleOutlineIcon /></Button>
                            </Grid>
                            <Grid item xs={1}>
                                <Button disableElevation disableRipple style={{backgroundColor:"#ff726f", color:"#fff"}} onClick={() => setAdditionalCertificate(AdditionalCertificate.slice(0, -1))} variant='contained' sx={{display: (AdditionalCertificate.length > 1) ? "block" : "none"}}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    {AdditionalCertificate.map((val, ind) => {
                        return (
                            <Grid container key={ind} rowGap={3} columnGap={5}>
                                <Grid item xs={10} md={3.5}>
                                    <TextField value={val.academy} onChange={(e) => {
                                        const newCertificate = [...AdditionalCertificate];
                                        newCertificate[ind].academy = e.target.value;
                                        setAdditionalCertificate(newCertificate)
                                    }} fullWidth label="Academy Name" size='small' />
                                </Grid>
                                <Grid item xs={10} md={3.5}>
                                    <TextField value={val.course} onChange={(e) => {
                                        const newCertificate = [...AdditionalCertificate];
                                        newCertificate[ind].course = e.target.value;
                                        setAdditionalCertificate(newCertificate)
                                    }} fullWidth label="Course Name" size='small' />
                                </Grid>
                                <Grid item xs={10} md={3.5}>
                                    <Grid container columnGap={1}>
                                        <Grid item xs={5.5}>
                                            <TextField value={val.time} onChange={(e) => {
                                                const newCertificate = [...AdditionalCertificate];
                                                newCertificate[ind].time = e.target.value;
                                                setAdditionalCertificate(newCertificate)
                                            }} fullWidth label="Duration" size='small' />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Autocomplete
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
                        <Autocomplete size='small' disablePortal options={Courses} onChange={getCourseDetails} getOptionLabel={(option) => option.CourseName} renderInput={(params) => <TextField {...params} label="Course Enrolled For" />} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField name='AdmissionFee' value={AdmissionFee} fullWidth size='small' label="Admission Fee" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <Autocomplete size='small' disablePortal options={Batch} getOptionDisabled={(option) => option.BatchStatus !== 'Active'} onChange={getBatchDetails} getOptionLabel={(option) => option.BatchName} renderInput={(params) => <TextField {...params} label="Batch" />} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField name='BatchStartDate' type='date' value={BatchStartingDate} inputProps={{readOnly:true}} onChange={(e) => setBatchStartingDate(e.target.value)} fullWidth label="Batch Starting Date" size="small" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField name='BatchEndDate' type='date' value={BatchEndDate} inputProps={{readOnly:true}} onChange={(e) => setBatchEndDate(e.target.value)} fullWidth label="Batch Ending Date" size="small" />
                    </Grid>
                    {/* inputProps={{readOnly:true}} */}
                    <Grid item xs={10} md={3.5}>
                        <TextField name='Session' type='text' value={Session} inputProps={{readOnly:true}} onChange={(e) => setBatchStartingDate(e.target.value)} fullWidth label="Session" size="small" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField  type='time' value={SessionStartTime} inputProps={{readOnly:true}} onChange={(e) => setBatchStartingDate(e.target.value)} fullWidth label="Session Starting Time" size="small" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField type='time' value={SessionEndTime} inputProps={{readOnly:true}} onChange={(e) => setBatchEndDate(e.target.value)} fullWidth label="Session Ending Time" size="small" />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 3, display: "flex", justifyContent: "end", mr:8 }}>
                    <Button style={{backgroundColor:"#4daaff"}} disableElevation disableRipple onClick={handleSubmit} variant='contained'>Submit</Button>
                    <Link to='/students/table'><Button disableElevation disableRipple style={{ marginLeft: "10px", backgroundColor:"#ff726f" }} variant='contained' color='error'>Back</Button></Link>
                </Box>
            </Box>
        </ThemeProvider>
    )
}
