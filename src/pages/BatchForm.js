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
// CourseID
// CourseName
// Fee
// Subjects
// Duration
// Terms
// Admission Fee
export default function BatchForm() {

    const [CourseName, setCourseName] = useState("");
    const [CourseFee, setCourseFee] = useState(" ");
    const [Subjects, setSubjects] = useState(" ");
    const [SessionStartingTime, setSessionStartingTime] = useState(" ");
    const [SessionEndingTime, setSessionEndingTime] = useState(" ");
    const [Count, setCount] = useState("");
    const [Available, setAvailable] = useState("");
        const [Error, setError] = useState({
        courseName: false,
        courseFee: false,
        Subjects: false,
        sessionStartingTime: false,
        sessionEndingTime: false,
        count:false,
        available:false
    });

    const handleSubmit = () => {
        const GenInvoice = {
            CourseName: CourseName === " ",
            CourseFee: CourseFee === " ",
            Subjects: Subjects ==="",
            sessionStartingTime: SessionStartingTime ===" ",
            sessionEndingTime: SessionEndingTime ===" ",
            count: Count ==="",
            available: Available ==="",
        };    
        setError(GenInvoice)    
            // let data = {
            //     CourseFee,
            // }
            // axios.post("http://localhost:8080/batches/create", ).then((res) => {
            //     res.data.result ? <Link to='/batches/table' /> : alert(res.data.result);
            // });
    };


    return (
        //   const rows = [{id:1, CourseName:"28-03-2023", CourseFee:"Suresh", Subjects:"Full Stack Developer", Term:"I", TermFee:"25000", SessionEndingTime:"none", TotalAmount:"25000", PaymentMethod:"Online(Google Pay)"}];
        <div>
            <ThemeProvider theme={theme}>
                <AppBreadcrumbs crntPage='Batches Form' prevPage="Batches Table" path='/batches/table' />
                <Box sx={{ background: "#fff", pb: 3, boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", borderRadius:"25px" }}>
                    <Grid container rowGap={5} columnGap={5} paddingLeft={4} paddingTop={3}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: "bold" }}>Batch Details</Typography>
                        </Grid>                        
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.CourseName} helperText={ Error.CourseName ? "Batch Name cannot be Empty" :""} type='text' label="Batch Name" value={CourseName} size='small' fullWidth onChange={(e)=>setCourseName(e.target.value)} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            {/* <Autocomplete size='small' disablePortal options={studentsList}  renderInput={(params) => <TextField {...params} label="Sudent Name" />} /> */}
                            <TextField error={Error.CourseFee} helperText={ Error.CourseFee ? "Student Name is needed" :""} type='date' label="Batch Starting Date" value={CourseFee} size='small' fullWidth onChange={(e) => setCourseFee(e.target.value)}>
                            </TextField>
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.Subjects} helperText={ Error.Subjects? "Course Name is needed" :""}  type='date' label='Batch Ending Date' value={Subjects} size='small' fullWidth onChange={(e)=>setSubjects(e.target.value)} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.sessionStartingTime} helperText={ Error.sessionStartingTime ? "Select Session StraAmount needed" :""} type='time' label="Session Starting Time" value={SessionStartingTime} size='small' fullWidth onChange={(e)=>setSessionStartingTime(e.target.value)} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.sessionEndingTime} helperText={ Error.sessionEndingTime ? "If not have any SessionEndingTime enter NONE" :""} type='time' label="SessionEndingTime" value={SessionEndingTime} size='small' fullWidth onChange={(e)=>setSessionEndingTime(e.target.value)} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.count} helperText={ Error.count ? "Total Amount not tallied. Please check" :""} type='number' label="Maximum Seats" value={Count} size='small' fullWidth onChange={(e)=>setCount(e.target.value)} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField error={Error.available} helperText={ Error.available ? "Available seats not tallied" :""} type='text' label="Available" value={Available} size='small' fullWidth onChange={(e)=>setAvailable(e.target.value)} />
                        </Grid>
                    </Grid> 
                    <Box sx={{ mt: 3, mr:8, display: "flex", justifyContent: "end" }}>
                        <Button disableElevation disableRipple style={{marginRight:"10px", backgroundColor:"#4daaff"}} variant='contained' onClick={handleSubmit}>Create</Button>
                        <Link to='/batches/table'><Button disableElevation disableRipple style={{backgroundColor:"#ff726f", color:"#fff"}} variant='contained' >Cancel</Button></Link>
                    </Box>
                </Box>
            </ThemeProvider>
      </div>
  )
};
