import { Box, Breadcrumbs, Button, Grid, MenuItem, TextField, Typography, Link as Links, createTheme, ThemeProvider, Autocomplete } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useForm } from "react-hook-form";
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

    const handleCrumbClick = (evnt) => {
        evnt.preventDefault();
    };

    const [Batch, setBatch] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8080/batches/list').then((res) => {
            setBatch([...res.data.result]);
        });
    }, []);

    // const Batch = [{ batchID: "1", batchNum: "I", batchStartingDate: "01-04-2023" }, { batchID: "2", batchNum: "II", batchStartingDate: "03-05-2023" }, { batchID: "3", batchNum: "III", batchStartingDate: "02-07-2023" }];

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

    const [UGDegreeName, setUGDegreeName] = useState('');
    const [UGCollegeName, setUGCollegeName] = useState('');
    const [UGCollegePassedYear, setUGCollegePassedYear] = useState('');
    const [UGCollegePercentage, setUGCollegePercentage] = useState('');

    const [PGDegreeName, setPGDegreeName] = useState('');
    const [PGCollegeName, setPGCollegeName] = useState('');
    const [PGCollegePassedYear, setPGCollegePassedYear] = useState('');
    const [GCollegePercentage, setPGCollegePercentage] = useState('');

    const [PhDMajor, setPhDMajor] = useState('');
    const [PhDCollegeName, setPhDCollegeName] = useState('');
    const [PhDPassedYear, setPhDPassedYear] = useState('');
    const [PhDPercentage, setPhDPercentage] = useState('');

    const [GuardianName, setGuardianName] = useState("");
    const [GuardianNumber, setGaurdianNumber] = useState("");

    const [AdditionalCertificate, setAdditionalCertificate] = useState([{ "id": 1, "description": "" }]);

    const [BatchNumber, setBatchNumber] = useState("I");
    const [BatchStartingDate, setBatchStartingDate] = useState(" ");
    const [CourseName, setCourseName] = useState("");
    const [CourseAdmissionFee, setCourseAdmissionFee] = useState("");

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
        ugCollegeName: false,
        ugCollegePassedYear: false,
        ugCollegePercentage: false,
        pgDegreeName: false,
        pgCollegeName: false,
        pgCollegePassedYear: false,
        pgCollegePercentage: false,
        guardianName: false,
        guardianNumber: false,
        additionalCertificate: false,
        batchNumber: false,
        batchStartingDate: false,
        courseName: false,
        courseAdmissionFee: false,
    });

    // const dataCol = {studentName, studentNumber, email, parentName, RegDate, batchNumber}
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const OnSubmit = (data) => {
        axios.post("http://localhost:8080/register/create",).then((res) => {
            res.data.result ? <Link to='/students' /> : alert(res.data.result);
        });
    };
    useEffect(() => {

    }, [AdditionalCertificate.length])
    const handlesubmit = (e) => { e.preventDefault() };

    return (
        <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(OnSubmit)}>
            <AppBreadcrumbs crntPage='Student Form' prevPage='Students Table' path='/students' />
            <Box sx={{ background: "#fff", pb: 3, borderRadius:"25px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
                <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Student Details</Typography>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.regDate} helperText={Error.regDate ? "Registration Date Cannot be Empty" : ""} value={RegDate} type='date' fullWidth onChange={(e) => setRegDate(e.target.value)} size='small' label="Registration Date" />
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
                </Grid>

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
                            <Typography sx={{ fontWeight: "bold" }}>UnderGraduate</Typography>
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField value={UGDegreeName} error={Error.ugDegreeName} helperText={Error.ugDegreeName ? "Select the Degree" : ""} fullWidth onChange={(e) => setUGDegreeName(e.target.value)} size='small' label="Degree Name" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField value={UGCollegeName} error={Error.ugCollegeName} helperText={Error.ugCollegeName ? "College Name field cannot be Empty" : ""} fullWidth onChange={(e) => setUGCollegeName(e.target.value)} size='small' label="College Name" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField value={UGCollegePassedYear} error={Error.ugCollegePassedYear} helperText={Error.ugCollegePassedYear ? "Field Cannot be Empty" : ""} onChange={(e) => setUGCollegePassedYear(e.target.value)} fullWidth on label="Passed-out Year" size="small" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField value={UGCollegePercentage} error={Error.ugCollegePercentage} helperText={Error.ugCollegePercentage ? "Field Cannot be Empty" : ""} onChange={(e) => setUGCollegePercentage(e.target.value)} fullWidth label="Percentage of Marks" size="small" />
                        </Grid>
                    </Grid>
                </Box>
                <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Parent/Guardian Details</Typography>
                    </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField value={GuardianName} error={Error.guardianName} helperText={Error.guardianName ? "Guardian Name needed" : ""} fullWidth onChange={(e) => setGuardianName(e.target.value)} size='small' label="Parent/Guardian Name" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField value={GuardianNumber} error={Error.GuardianNumber} helperText={Error.guardianNumber ? "Guardian Number needed" : ""} fullWidth onChange={(e) => setGaurdianNumber(e.target.value)} size='small' label="Gaurdian Contact Number" />
                        </Grid>
                </Grid>

                <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Additional Certifications <Button disableElevation disableRipple variant='contained' style={{backgroundColor:"#4daaff",}} onClick={() => setAdditionalCertificate([...AdditionalCertificate, { "id": AdditionalCertificate.length + 1, "description": "" }])}>Add<AddCircleOutlineIcon /></Button></Typography>
                    </Grid>
                    {AdditionalCertificate.map((val, ind) => {
                        return (<Grid item xs={10} md={3.5}>
                            <TextField name='Certification' value={val.description} onChange={(e) => AdditionalCertificate[ind].description = e.target.value} fullWidth label="Add Certificates" size='small' />
                        </Grid>)
                    })}
                </Grid>

                <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Course Details</Typography>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField name='CourseName' {...register("CourseName", { required: "Enter the Course Name", })} error={Boolean(errors.CourseName)} helperText={errors.CourseName?.message} fullWidth size='small' label="Course Enrolled For" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField name='AdmissionFee' {...register("AdmissionFee", { required: "Enter the admission fee", })} fullWidth size='small' label="Admission Fee" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <Autocomplete size='small' disablePortal options={Batch} getOptionLabel={(option) => option.BatchName} renderInput={(params) => <TextField {...params} label="Batch" />} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField name='BatchStartDate' type='date' value={BatchStartingDate} onChange={(e) => setBatchStartingDate(e.target.value)} fullWidth label="Batch Starting Date" size="small" />
                    </Grid>
                    {/* inputProps={{readOnly:true}} */}
                </Grid>
                <Box sx={{ mt: 3, display: "flex", justifyContent: "end", mr:8 }}>
                    <Button style={{backgroundColor:"#4daaff"}} disableElevation disableRipple variant='contained'>Submit</Button>
                    <Link to='/students/table'><Button disableElevation disableRipple style={{ marginLeft: "10px", backgroundColor:"#ff726f" }} variant='contained' color='error'>Back</Button></Link>
                </Box>
            </Box>
            </form>
            </ThemeProvider>
    )
}
