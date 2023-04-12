import { Autocomplete, Box, Button, createTheme, Grid, MenuItem, TextField, ThemeProvider, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppBreadcrumbs from '../breadCrumbs/breadcrumbs';
import AxiosInstance from '../../axiosinstance';
import { useEffect } from 'react';

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

export default function BatchForm(props) {

    const [CourseName, setCourseName] = useState("");
    const [CourseFee, setCourseFee] = useState("");
    const [Subjects, setSubjects] = useState([{ "id": 1, "Subject": "",}]);
    const [CourseDuration, setCourseDuration] = useState("");
    const [Terms, setTerms] = useState("");
    const [AdmissionFee, setAdmissionFee] = useState("");
    const [CreatedBy, setCreatedBy] = useState("Admin");
    const [CreatedDate, setCreatedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [UpdatedBy, setAUpdatedBy] = useState("Admin");
    const [UpdatedDate, setUpdatedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [Error, setError] = useState({
        courseName: false,
        courseFee: false,
        subjects: false,
        courseDuration: false,
        terms: false,
        admissionFee:false,
    });
    const [Disable, setDisable] = useState(false);
    const params = useParams()

    const PostCourses = ()=>{
        let data = {
            CourseFee, CourseName, CourseDuration, Subjects: JSON.stringify(Subjects), AdmissionFee, CreatedBy, CreatedDate
        };
        
        AxiosInstance.post("courses/create",data ).then((res) => {
            res.data.result ? props.history.push('/courses') : alert(res.data.result);
            
        });
    };

    const Update = ()=>{
        let data = {
            CourseID: params.CourseID, CourseFee, CourseName, CourseDuration, Subjects: JSON.stringify(Subjects), AdmissionFee, UpdatedBy, UpdatedDate
        };
        AxiosInstance.post('courses/update', data).then((res)=>{
            res.data.result ? props.history.push('/courses') : alert(res.data.result);
        })
    };

    const Read = ()=>{
        AxiosInstance.post('courses/read', {CourseID: params.CourseID}).then((res)=>{
            if (res.data.status){
                setCourseName(res.data.result[0].CourseName ? res.data.result[0].CourseName :"")
                setCourseFee(res.data.result[0].CourseFee ? res.data.result[0].CourseFee :"")
                setCourseDuration(res.data.result[0].CourseDuration ? res.data.result[0].CourseDuration :"")
                setAdmissionFee(res.data.result[0].AdmissionFee ? res.data.result[0].AdmissionFee :"")
                setSubjects(res.data.result[0].Subjects ? JSON.parse(res.data.result[0].Subjects) :"")
            }
        })
    };

    const handleSubmit = () => {

        const CreateCourse = {
            courseName: CourseName === "",
            courseFee: CourseFee === "",
            subjects: Subjects.map((obj, ind) => (obj.Subject)).some(val => val == ""),
            courseDuration: CourseDuration ==="",
            admissionFee: AdmissionFee === "",
        };
        setError(CreateCourse)
        if (Object.values(CreateCourse).some(val => val == true )){console.log(CreateCourse)}
        else{
            if(params.action == "update"){
                Update()
            } else {
                PostCourses()
            }
        };
    };

    useEffect(() => {
        Read()
        if(params.action == "read"){
            setDisable(true)
        }
    }, []);

    const CourseDura = [{title:"3 months",}, {title:"6 months",}, {title:"1 year",}];

    return (
        <div>
            <ThemeProvider theme={theme}>
                <AppBreadcrumbs crntPage='Courses Form' prevPage="Courses Table" path='/courses' />
                <Box sx={{ background: "#fff", pb: 3, boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", borderRadius:"25px" }}>
                    <Grid container rowGap={5} columnGap={5} paddingLeft={4} paddingTop={3}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontWeight: "bold" }}>Course Details</Typography>
                        </Grid>                        
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} inputProps={{pattern : "[A-Z]{1}"}} error={Error.courseName} helperText={ Error.courseName ? "Course Name is required" :""} type='text' label="Course Name" value={CourseName} size='small' fullWidth onChange={(e)=>setCourseName(e.target.value)} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} error={Error.courseFee} helperText={ Error.courseFee ? "Course Fee is required" :""} type='tel' label="Course Fee" value={CourseFee} size='small' fullWidth onChange={(e) => setCourseFee(e.target.value)}>
                            </TextField>
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                        <Autocomplete disabled={Disable} size='small'  value={{title:CourseDuration}} disablePortal options={CourseDura} getOptionLabel={(option) => option.title}
                                      renderInput={(params) => <TextField {...params} error={Error.courseDuration} helperText={ Error.courseDuration ? "Course Duration is required" :""} label="Course Duration" />} onChange={(e, val) =>{ 
                                        if (val != null){setCourseDuration(val.title)} else{setCourseDuration("")}}} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} error={Error.admissionFee} helperText={ Error.admissionFee ? " Admission Fee required" :""} type='tel' label="Admission Fee" value={AdmissionFee} size='small' fullWidth onChange={(e)=>setAdmissionFee(e.target.value)} />
                        </Grid>
                        <Grid item xs={10}>
                            {/* Add Subjects for the courses */}
                            <Grid container>
                                <Grid item xs={1}>
                                    <Typography sx={{fontWeight:"bold", verticalAlign:"center"}}>Subjects </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button disabled={Disable} disableElevation disableRipple variant='contained' style={{backgroundColor:"#4daaff",}} onClick={() => setSubjects([...Subjects, { "id": Subjects.length + 1, "Subject": "" }])}>Add</Button>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button disabled={Disable} disableElevation disableRipple style={{backgroundColor:"#ff726f", color:"#fff"}} onClick={() => setSubjects(Subjects.slice(0, -1))} variant='contained' sx={{display: (Subjects.length > 1) ? "block" : "none"}}>Cancel</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        {Subjects.map((val, ind) => {
                            const handleSubjectsChange = (e) =>{
                                const newSubjects = [...Subjects];
                                newSubjects[ind] = { ...val, Subject: e.target.value };
                                setSubjects(newSubjects);
                            }
                            return (
                            <Grid key={ind} item xs={10} md={3.5}>
                                <TextField disabled={Disable} error={Error.subjects} helperText={ Error.subjects ? "Subject is required" :""} name='Subjects' value={val.Subject} onChange={handleSubjectsChange} fullWidth label="Subject Name" size='small' />
                            </Grid>
                            
                            )
                        })}
                    </Grid> 
                    <Box sx={{ mt: 3, mr:8, display: "flex", justifyContent: "end" }}>
                        
                        {params.action == "read" ? "" : <Button disableElevation disableRipple style={{marginRight:"10px", backgroundColor:"#4daaff"}} variant='contained' onClick={handleSubmit}>{params.action == "update"? "Update" : "Create"}</Button>}
                        <Link to='/courses'><Button disableElevation disableRipple style={{backgroundColor:"#ff726f", color:"#fff"}} variant='contained' >{params.action == "read" ? "Back" : "Cancel"}</Button></Link>
                    </Box>
                </Box>
            </ThemeProvider>
      </div>
  )
};
