import { Autocomplete, Box, Button, CircularProgress, createTheme, Grid, IconButton, MenuItem, TextField, ThemeProvider, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppBreadcrumbs from '../breadCrumbs/breadcrumbs';
import AxiosInstance from '../../axiosinstance';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import ClearIcon from '@mui/icons-material/Clear';

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
    const [Subjects, setSubjects] = useState([{ "id": 1, "Subject": "", "err": false}]);
    const [CourseDuration, setCourseDuration] = useState("");
    const [AdmissionFee, setAdmissionFee] = useState("");
    const [CreatedBy, setCreatedBy] = useState("Admin");
    const [CreatedDate, setCreatedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [UpdatedBy, setAUpdatedBy] = useState("Admin");
    const [UpdatedDate, setUpdatedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [Error, setError] = useState({
        courseName: false,
        courseFee: false,
        subjects: [{ err :false }],
        courseDuration: false,
        terms: false,
        admissionFee:false,
    });
    const [Disable, setDisable] = useState(false);
    const [Loading, setLoading] = useState(false);
    const params = useParams()

    const PostCourses = ()=>{
        let data = {
            CourseFee, CourseName, CourseDuration, Subjects: JSON.stringify(Subjects), AdmissionFee, CreatedBy, CreatedDate
        };
        AxiosInstance.post("courses/create",data ).then((res) => {
            res.data.result ? 
            <>
            {
            Swal.fire({
                title:"Created",
                text:"New Course Created successfully",
                icon:"success",
                confirmButtonText:"ok"
            }) }
            {props.history.push('/courses')} 
            </> 
            : 
            Swal.fire({title: "Some Error!!",
            text: `The Result shows something Like${res.data.result}`,
            icon: "error",
            confirmButtonText:"ok"
        });   
        });
    };

    const Update = ()=>{
        let data = {
            CourseID: params.CourseID, CourseFee, CourseName, CourseDuration, Subjects: JSON.stringify(Subjects), AdmissionFee, UpdatedBy, UpdatedDate
        };
        AxiosInstance.post('courses/update', data).then((res)=>{
            res.data.result ? 
            <>
            {
            Swal.fire({
                title:"Updated",
                text:"Updated successfully",
                icon:"success",
                confirmButtonText:"ok",

            }).then((res)=>{
                if(res.isConfirmed){
                    {props.history.push('/courses')} 
                }
            }) }
            </>
            : 
            Swal.fire({title: "Some Error!!",
            text: `The Result shows something Like${res.data.result}`,
            icon: "error",
            confirmButtonText:"ok"
        });
        })
    };

    const Read = ()=>{
        AxiosInstance.post('courses/read', {CourseID: params.CourseID}).then((res)=>{
            setLoading(true)   
            if (res.data.status && res.data.result.length > 0){
                setLoading(false)
                setCourseName(res.data.result[0].CourseName ? res.data.result[0].CourseName :"")
                setCourseFee(res.data.result[0].CourseFee ? res.data.result[0].CourseFee :"")
                setCourseDuration(res.data.result[0].CourseDuration ? res.data.result[0].CourseDuration :"")
                setAdmissionFee(res.data.result[0].AdmissionFee ? res.data.result[0].AdmissionFee :"")
                setSubjects(res.data.result[0].Subjects ? JSON.parse(res.data.result[0].Subjects) :"")
            } 
            else{
                props.history.push('/courses')
            }
        })
    };

    if (Loading){
        <CircularProgress variant="soft" />
    }

    const handleSubmit = () => {
        const CreateCourse = {
            courseName: CourseName.trim() === "" ? true : !(/^[A-Z][A-Za-z_\s]{2,29}$/.test(CourseName)) ? "wrong" : false,
            courseFee: CourseFee === "" || CourseFee <= 0 ,
            courseDuration: CourseDuration === "",
            admissionFee: AdmissionFee <= 0 || AdmissionFee === "" ? true : AdmissionFee > (30/100 * CourseFee) ? "wrong" : false,
        };

        Subjects.map((val)=> {
                    if(val.Subject.trim() === ""){
                        val.err = true 
                    }else if(!/^[A-Z][A-Za-z_\s]{2,29}$/.test(val.Subject)){
                    val.err = "false"
                    console.log("else");
                    }else{
                        val.err = false
                    }
                })

        setError(CreateCourse)
        if (Object.values(CreateCourse).some(val => val === true || val === "wrong" )){
        
        }
        else{
            if(params.action === "update"){
                Update()
            } else {
                PostCourses()
            }
        };
    };

    useEffect(() => {
        if(params.action === "read" || params.action === "update"){
        Read()
        }
        if(params.action === "read"){
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
                            <TextField disabled={Disable} error={Error.courseName} helperText={ Error.courseName == "wrong" ? "Name must begin with caps and have min 3 characters" : Error.courseName ? "Course Name is required" : ""} type='text' label="Course Name" value={CourseName} size='small' fullWidth onChange={(e)=>setCourseName(e.target.value)} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} error={Error.courseFee} helperText={ Error.courseFee ? "Course Fee is required" : ""} type='tel' label="Course Fee" value={CourseFee} size='small' fullWidth onChange={(e)=>{
                                                                                                                                                                                                                    if (e.target.value == "" || /^\d*\.?\d*$/.test(e.target.value)){
                                                                                                                                                                                                                        setCourseFee(e.target.value);
                                                                                                                                                                                                                        setAdmissionFee(30/100 * e.target.value)
                                                                                                                                                                                                                        }}} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                        <Autocomplete disabled={Disable} size='small'  value={{title:CourseDuration}} disablePortal options={CourseDura} getOptionLabel={(option) => option.title}
                                      renderInput={(params) => <TextField {...params} error={Error.courseDuration} helperText={ Error.courseDuration ? "Course Duration is required" :""} label="Course Duration" />} onChange={(e, val) =>{ 
                                        if (val != null){setCourseDuration(val.title)} else{setCourseDuration("")}}} />
                        </Grid>
                        <Grid item xs={10} md={3.5}>
                            <TextField disabled={Disable} error={Error.admissionFee} helperText={  Error.admissionFee === "wrong" ? "Admission Fee must be 30% of CourseFee" : Error.admissionFee ? "Admission Fee required" : ""} type='tel' label="Admission Fee" value={AdmissionFee} size='small' fullWidth onChange={(e)=>{if (e.target.value === "" || /^\d*\.?\d*$/.test(e.target.value)){setAdmissionFee(e.target.value)}}} />
                        </Grid>
                        <Grid item xs={10}>
                            <Grid container>
                                <Grid item xs={1}>
                                    <Typography sx={{fontWeight:"bold", verticalAlign:"center"}}>Subjects </Typography>
                                </Grid>
                                <Grid item xs={0.5}>
                                    <Button disabled={Disable} disableElevation disableRipple variant='contained' style={{backgroundColor:"#4daaff", padding:"2px"}}
                                     onClick={() => {
                                            Subjects.map((val)=> {
                                                if(val.Subject.trim() === ""){
                                                    val.err = true 
                                                }else if(!/^[A-Z][A-Za-z_\s]{2,29}$/.test(val.Subject)){
                                                val.err = "false"
                                                console.log("else");
                                                }else{
                                                    val.err = false
                                                }
                                            })
                                            setSubjects([...Subjects]);
                                            let a = Subjects.map((val)=>  val.Subject.trim() === "" ? true : (!/^[A-Z][A-Za-z_\s]{2,29}$/.test(val.Subject) ? true :false)).every(val => val === false) ? setSubjects([...Subjects, { "id": Subjects.length + 1, "Subject": "", "err": false }]) : "" 
                                        }
                                        }>
                                        Add
                                    </Button>
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
                                    <Grid item  key={ind} xs={12} md={3.5}>
                                        <Box sx={{display:"flex"}}>
                                            <TextField disabled={Disable} error={val.err} helperText={ val.err == "false" ? "Subject name must have 3 letters and Begin with caps" : val.err ? "Subject is required" : ""} name='Subjects' value={val.Subject} onChange={handleSubjectsChange} fullWidth label="Subject Name" size='small' />
                                            <IconButton  disabled={Disable} disableElevation disableRipple variant='contained' sx={{display: (ind === 0 ) ? "none" : "block", p:0}} 
                                                                onClick={() =>{
                                                                                const updatedSubjects = [...Subjects];
                                                                                updatedSubjects.splice(ind, 1);
                                                                                setSubjects(updatedSubjects)
                                                                            }}>
                                                <ClearIcon/>
                                            </IconButton>
                                        </Box>
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
