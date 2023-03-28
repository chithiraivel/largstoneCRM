import { Box, Breadcrumbs, Button, Grid, MenuItem, TextField, Typography, Link as Links } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
import AppBreadcrumbs from '../breadCrumbs/breadcrumbs';

export default function Form(props) {

    const handleCrumbClick = (evnt) => {
        evnt.preventDefault();
    }

    const Batch = [{ batchID: "1", batchNum: "I", batchStartingDate: "01-04-2023" }, { batchID: "2", batchNum: "II", batchStartingDate: "03-05-2023" }, { batchID: "3", batchNum: "III", batchStartingDate: "02-07-2023" }];
    const breadCrumbs = [<Links underline="hover" href='/students' key="1" color="black" >Students Table</Links>, <Links underline="none" key="2" color="black" >Students Registration</Links>,];

    const [RegDate, setRegDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [StudentName, setStudentName] = useState("");
    const [StudentContactNumber, setStudentContactNumber] = useState("");
    const [Email, setEmail] = useState('');
    const [DOB, setDOB] = useState(moment(new Date()).format('YYYY-MM-DD'));

    const [SSLCboard, setSSLCboard] = useState('');
    const [SSLCschool, setSSLCschool] = useState('');
    const [SSLCpassedYear, setSSLCpassedYear] = useState('');
    const [SSLCPercentage, setSSLCPercentage] = useState('');

    const [HSCboard, setHSCboard] = useState('');
    const [HSCschool, setHSCschool] = useState('');
    const [HSCpassedYear, setHSCpassedYear] = useState('');
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
    const [BatchStartingDate, setBatchStartingDate] = useState((moment(new Date()).format('YYYY-MM-DD')));
    const [CourseName, setCourseName] = useState("");
    const [CourseAdmissionFee, setCourseAdmissionFee] = useState("");

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
        <form onSubmit={handleSubmit(OnSubmit)}>
            <AppBreadcrumbs crntPage='Student Form' subpage='Students' path='/students' />
            <Box sx={{ background: "#fff", pb: 3 }}>
                <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Student Details</Typography>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField value={RegDate} name='RegDate' type='date' fullWidth onChange={(e) => setRegDate(e.target.value)} size='small' label="Registration Date" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField value={StudentName} name='StudentName' {...register("StudentName", { required: "Enter the Student Name", maxLength: "20", })} error={Boolean(errors.StudentName)} helperText={errors.StudentName?.message} fullWidth onChange={(e) => setAdditionalCertificate(e.target.value)} size='small' label="Student Name" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField value={StudentContactNumber} name='StudentContactNumber' {...register("StudentContactNumber", { required: "Enter contact number" })} error={Boolean(errors.StudentContactNumber)} helperText={errors.StudentContactNumber?.message} fullWidth onChange={(e) => setStudentContactNumber(e.target.value)} size='small' label="Student contact Number" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField value={Email} name='Email' {...register("Email", { required: "Enter the E-mail" })} error={Boolean(errors.Email)} helperText={errors.Email?.message} fullWidth onChange={(e) => setEmail(e.target.value)} size='small' label="Email" />
                    </Grid>

                    <Grid item xs={10} md={3.5}>
                        <TextField value={DOB} name='DOB' type='date' fullWidth onChange={(e) => setDOB(e.target.value)} size='small' label="Date of Birth" />
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
                            <TextField name='TENboard' {...register("TENboard", { required: "Enter the school board", })} error={Boolean(errors.TENboard)} helperText={errors.TENboard?.message} fullWidth onChange={(e) => setSSLCboard(e.target.value)} size='small' label="Board" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField name='TENschool' {...register("TENschool", { required: "Enter the school Name", })} error={Boolean(errors.TENschool)} helperText={errors.TENschool?.message} fullWidth onChange={(e) => setSSLCschool(e.target.value)} size='small' label="School Name" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField fullWidth label="Passed-out Year" size="small" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField fullWidth label="Percentage of Marks" size="small" />
                        </Grid>
                    </Grid>
                    <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: "bold" }}>HSC</Typography>
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField name='TWELFTHboard' {...register("TWELFTHboard", { required: "Enter the school bosrd" })} error={Boolean(errors.TWELFTHboard)} helperText={errors.TWELFTHboard?.message} fullWidth onChange={(e) => setHSCboard(e.target.value)} size='small' label="Board" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField name='TWELFTHschool' {...register("TWELFTHschool", { required: "Enter the school Name", })} error={Boolean(errors.TWELFTHschool)} helperText={errors.TWELFTHschool?.message} fullWidth onChange={(e) => setHSCschool(e.target.value)} size='small' label="School Name" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField fullWidth label="Passed-out Year" size="small" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField fullWidth label="Percentage of Marks" size="small" />
                        </Grid>
                    </Grid>
                    <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: "bold" }}>Under Graduate</Typography>
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField name='DegreeName' {...register("DegreeName", { required: "Enter the Degree", maxLength: "15", })} error={Boolean(errors.DegreeName)} helperText={errors.DegreeName?.message} fullWidth onChange={(e) => setUGDegreeName(e.target.value)} size='small' label="Degree" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField name='CollegeName' {...register("CollegeName", { required: "Enter the College Name", })} error={Boolean(errors.CollegeName)} helperText={errors.CollegeName?.message} fullWidth onChange={(e) => setUGCollegeName(e.target.value)} size='small' label="College Name" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField fullWidth label="Passed-out Year" size="small" />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField fullWidth label="Percentage of Marks" size="small" />
                        </Grid>
                    </Grid>
                </Box>
                <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Parent/Guardian Details</Typography>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField name='GuardianName' {...register("GuardianName", { required: "Enter the Name", })} error={Boolean(errors.GuardianName)} helperText={errors.GuardianName?.message} fullWidth onChange={(e) => setGuardianName(e.target.value)} size='small' label="Guardian/Parent Name" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField name='ParentContactNumber' {...register("ParentContactNumber", { required: "Enter the Parent Contact Number", })} error={Boolean(errors.ParentContactNumber)} helperText={errors.ParentContactNumber?.message} fullWidth onChange={(e) => setGaurdianNumber(e.target.value)} size='small' label="Parent Contact Number" />
                    </Grid>
                </Grid>

                <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Additional Certifications <Button variant='contained' onClick={() => setAdditionalCertificate([...AdditionalCertificate, { "id": AdditionalCertificate.length + 1, "description": "" }])}>Add<AddCircleOutlineIcon /></Button></Typography>
                    </Grid>
                    {AdditionalCertificate.map((val, ind) => {
                        return (<Grid item xs={10} md={3.5}>
                            <TextField name='Certification' value={val.description} onChange={(e) => AdditionalCertificate[ind].description = e.target.value} fullWidth label="add here" size='small' />
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
                        <TextField select value={BatchNumber} name='BatchNumber' fullWidth label="Batch" size="small" onChange={(e) => setBatchNumber(e.target.value)}>
                            {Batch.map((num, index) => {
                                return (<MenuItem value={num.batchNum} key={index}>{num.batchNum}</MenuItem>)
                            })}
                        </TextField>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField name='BatchStartDate' type='date' value={BatchStartingDate} onChange={(e) => setBatchStartingDate(e.target.value)} fullWidth label="Batch Starting Date" size="small" />
                    </Grid>
                    {/* inputProps={{readOnly:true}} */}
                </Grid>
                <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                    <Button variant='contained' type='submit'>Confirm</Button>
                    <Link to='/students'><Button sx={{ ml: 1 }} variant='outlined' color='error'>Back</Button></Link>
                </Box>
            </Box>
        </form>
    )
}
