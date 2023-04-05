import { Autocomplete, Box, Button, createTheme, Grid, MenuItem, TextField, ThemeProvider, Typography } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

export default function BatchForm() {

    const [CourseName, setCourseName] = useState("");
    const [CourseFee, setCourseFee] = useState("");
    const [Subjects, setSubjects] = useState([{ "id": 1, "Subject": "",}]);
    // const [Subjects, setSubjects] = useState("");
    const [CourseDuration, setCourseDuration] = useState("");
    const [Terms, setTerms] = useState("");
    const [AdmissionFee, setAdmissionFee] = useState("");
    const [Error, setError] = useState({
    courseName: false,
    courseFee: false,
    subjects: false,
    courseDuration: false,
    terms: false,
    admissionFee:false,
});

    const handleSubmit = () => {
        const CreateCourse = {
            courseName: CourseName === "",
            courseFee: CourseFee === "",
            subjects: Subjects === "",
            courseDuration: CourseDuration ==="",
            terms: Terms === "",
            admissionFee: AdmissionFee === "",
        };    
        setError(CreateCourse)    
            // let data = {
            //     CourseFee, CourseName, CourseDuration, Subjects, Terms, AdmissionFee
            // };
            // axios.post("http://localhost:8080/courses/create",data ).then((res) => {
            //     console.log(res.data.result);
            //     res.data.result ? <Link to='/courses/table' /> : alert(res.data.result);
                
            // });
    };

            const CourseDura = [{label:"3 months",}, {label:"6 months",}, {label:"1 year",}];


    return (
        <div>
            <ThemeProvider theme={theme}>
                <AppBreadcrumbs crntPage='Courses Form' prevPage="Courses Table" path='/courses/table' />
                <Box sx={{ background: "#fff", pb: 3, boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", borderRadius:"25px" }}>
                    <Grid container rowGap={5} columnGap={5} paddingLeft={4} paddingTop={3}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: "bold" }}>Course Details</Typography>
                        </Grid>                        
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.courseName} helperText={ Error.courseName ? "Course Name cannot be Empty" :""} type='text' label="Course Name" value={CourseName} size='small' fullWidth onChange={(e)=>setCourseName(e.target.value)} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.courseFee} helperText={ Error.courseFee ? "Course Fee is needed" :""} type='tel' label="Course Fee" value={CourseFee} size='small' fullWidth onChange={(e) => setCourseFee(e.target.value)}>
                            </TextField>
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                        <Autocomplete size='small' disablePortal options={CourseDura}  renderInput={(params) => <TextField {...params} label="Course Duration" />} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.admissionFee} helperText={ Error.admissionFee ? " Admission Fee needed" :""} type='tel' label="Admission Fee" value={AdmissionFee} size='small' fullWidth onChange={(e)=>setAdmissionFee(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{fontWeight:"bold"}}>Subjects <Button disableElevation disableRipple variant='contained' style={{backgroundColor:"#4daaff",}} onClick={() => setSubjects([...Subjects, { "id": Subjects.length + 1, "Suject": "" }])}>Add</Button></Typography>
                        </Grid>
                        {Subjects.map((val, ind) => {
                            return (
                            <Grid key={ind} item xs={10} md={3.5}>
                                <TextField name='Subjects' value={val.Subject} onChange={(e) => Subjects[ind].Subject = e.target.value} fullWidth label="Subject Name" size='small' />
                            </Grid>
                            )
                        })}
                        {/* <Grid item xs={10} md={3.5}>
                            <TextField size='small' fullWidth label='Subject' onChange={setAdmissionFee} />
                        </Grid> */}
                    </Grid> 
                    <Box sx={{ mt: 3, mr:8, display: "flex", justifyContent: "end" }}>
                        <Button disableElevation disableRipple style={{marginRight:"10px", backgroundColor:"#4daaff"}} variant='contained' onClick={handleSubmit}>Create</Button>
                        <Link to='/courses/table'><Button disableElevation disableRipple style={{backgroundColor:"#ff726f", color:"#fff"}} variant='contained' >Cancel</Button></Link>
                    </Box>
                </Box>
            </ThemeProvider>
      </div>
  )
};
