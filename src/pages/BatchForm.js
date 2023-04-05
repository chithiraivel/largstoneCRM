import { Autocomplete, Box, Button, createTheme, Grid, MenuItem, Select, TextField, ThemeProvider, Typography } from '@mui/material';
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
    const [CourseFee, setCourseFee] = useState(" ");
    const [Subjects, setSubjects] = useState(" ");
    const [Session, setSession] = useState(" ");
    const [SessionStartingTime, setSessionStartingTime] = useState(" ");
    const [SessionEndingTime, setSessionEndingTime] = useState(" ");
    const [Count, setCount] = useState("");
    const [Error, setError] = useState({
    courseName: false,
    courseFee: false,
    subjects: false,
    session: false,
    sessionStartingTime: false,
    sessionEndingTime: false,
    count:false,
    });

    const handleSubmit = () => {
        const CreateBatch = {
            CourseName: CourseName === " ",
            CourseFee: CourseFee === " ",
            subjects: Subjects ==="",
            session: Session ==="",
            sessionStartingTime: SessionStartingTime ===" ",
            sessionEndingTime: SessionEndingTime ===" ",
            count: Count ==="",
        };    
        setError(CreateBatch)    
            // let data = {
            //     CourseFee,
            // }
            // axios.post("http://localhost:8080/batches/create", ).then((res) => {
            //     res.data.result ? <Link to='/batches/table' /> : alert(res.data.result);
            // });
    };

    const CourseSession = [{label:"Morning"},{ label:"AfterNoon"}, {label:"Evening"}, {label:"Full Day",}]

    return (
        <ThemeProvider theme={theme}>
            <AppBreadcrumbs crntPage='Batches Form' prevPage="Batches Table" path='/batches/table' />
            <Box sx={{ background: "#fff", pb: 3, boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", borderRadius:"25px" }}>
                <Grid container rowGap={5} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography sx={{ fontWeight: "bold" }}>Batch Details</Typography>
                    </Grid>                        
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.courseName} helperText={ Error.courseName ? "Batch Name cannot be Empty" :""} type='text' label="Batch Name" value={CourseName} size='small' fullWidth onChange={(e)=>setCourseName(e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.courseFee} helperText={ Error.courseFee ? "Student Name is required" :""} type='date' label="Batch Starting Date" value={CourseFee} size='small' fullWidth onChange={(e) => setCourseFee(e.target.value)}>
                        </TextField>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.subjects} helperText={ Error.subjects ? "Course Name is required" :""}  type='date' label='Batch Ending Date' value={Subjects} size='small' fullWidth onChange={(e)=>setSubjects(e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <Autocomplete size='small' disablePortal options={CourseSession}  value={Session} renderInput={(params) => <TextField {...params} label=" Select the Session" />} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.sessionStartingTime} helperText={ Error.sessionStartingTime ? "Select Session StraAmount required" :""} type='time' label="Session Starting Time" value={SessionStartingTime} size='small' fullWidth onChange={(e)=>setSessionStartingTime(e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.sessionEndingTime} helperText={ Error.sessionEndingTime ? "If not have any SessionEndingTime enter NONE" :""} type='time' label="SessionEndingTime" value={SessionEndingTime} size='small' fullWidth onChange={(e)=>setSessionEndingTime(e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField error={Error.count} helperText={ Error.count ? "Total Amount not tallied. Please check" :""} type='tel' label="Maximum Seats"  value={Count} size='small' fullWidth onChange={(e)=>setCount(e.target.value)} />
                    </Grid>
                </Grid> 
                <Box sx={{ mt: 3, mr:8, display: "flex", justifyContent: "end" }}>
                    <Button disableElevation disableRipple style={{marginRight:"10px", backgroundColor:"#4daaff"}} variant='contained' onClick={handleSubmit}>Create</Button>
                    <Link to='/batches/table'><Button disableElevation disableRipple style={{backgroundColor:"#ff726f", color:"#fff"}} variant='contained' >Cancel</Button></Link>
                </Box>
            </Box>
        </ThemeProvider>
  )
};
