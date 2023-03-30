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
    const [Subjects, setSubjects] = useState("");
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
            //     CourseFee,
            // }
            // axios.post("http://localhost:8080/courses/create", ).then((res) => {
            //     res.data.result ? <Link to='/courses/table' /> : alert(res.data.result);
            // });
    };


    return (
        //   const rows = [{id:1, CourseName:"28-03-2023", CourseFee:"Suresh", Subjects:"Full Stack Developer", Term:"I", TermFee:"25000", Terms:"none", TotalAmount:"25000", PaymentMethod:"Online(Google Pay)"}];
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
                            {/* <Autocomplete size='small' disablePortal options={studentsList}  renderInput={(params) => <TextField {...params} label="Sudent Name" />} /> */}
                            <TextField error={Error.courseFee} helperText={ Error.courseFee ? "Course Fee is needed" :""} type='tel' label="Course Fee" value={CourseFee} size='small' fullWidth onChange={(e) => setCourseFee(e.target.value)}>
                            </TextField>
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.subjects} helperText={ Error.subjects? "Subjects feild cannot be empty" :""}  type='text' label='Subjects Taught' value={Subjects} size='small' fullWidth onChange={(e)=>setSubjects(e.target.value)} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.courseDuration} helperText={ Error.courseDuration ? " Course Duration must be Mentioned" :""} type='text' label="Course Duration" value={CourseDuration} size='small' fullWidth onChange={(e)=>setCourseDuration(e.target.value)} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.terms} helperText={ Error.terms ? "If not have any Terms enter NONE" :""} type='text' label="Number of Terms" value={Terms} size='small' fullWidth onChange={(e)=>setTerms(e.target.value)} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.admissionFee} helperText={ Error.admissionFee ? " Admission Fee needed" :""} type='tel' label="Admission Fee" value={AdmissionFee} size='small' fullWidth onChange={(e)=>setAdmissionFee(e.target.value)} />
                        </Grid>
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
