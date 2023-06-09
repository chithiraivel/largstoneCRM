import React, { useState, useEffect } from 'react';
import { Autocomplete, Box, Button, createTheme, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import AxiosInstance from '../../axiosinstance';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import AppBreadcrumbs from '../breadCrumbs/breadcrumbs';
import Swal from 'sweetalert2';

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

    const [BatchName, setBatchName] = useState("");
    const [BatchStartDate, setBatchStartDate] = useState(" ");
    const [BatchEndDate, setBatchEndDate] = useState(" ");
    const [Session, setSession] = useState("");
    const [SessionStartTime, setSessionStartTime] = useState(" ");
    const [SessionStartLimit, setSessionStartLimit] = useState("");
    const [SessionEndTime, setSessionEndTime] = useState(" ");
    const [SessionEndLimit, setSessionEndLimit] = useState("");
    const [BatchCountLimit, setBatchCountLimit] = useState("");
    const [BatchStatus, setBatchStatus] = useState("");

    const [Disabled, setDisabled] = useState(false);

    const [CreatedBy, setCreatedBy] = useState("Admin");
    const [UpdatedBy, setUpdatedBy] = useState("Admin");

    const [CreatedDate, setCreatedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [UpdatedDate, setUpdatedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

    const [Error, setError] = useState({
    BatchName: false,
    BatchStartDate: false,
    BatchEndDate: false,
    session: false,
    sessionStartTime: false,
    sessionEndTime: false,
    BatchCountLimit:false,
    });

    const params = useParams();

    const CourseSession = [
        {label:"Morning", start: '10:00', end: '13:00'},
        {label:"AfterNoon", start: '13:30', end: '15:30'}, 
        {label:"Evening", start: '16:00', end: '18:00'}, 
        {label:"Full Day", start: '10:00', end: '16:00'}
    ];

    const Post = ()=>{
        let data = {
            BatchName, BatchStartDate, BatchEndDate, Session, SessionStartTime, SessionEndTime, CreatedBy, CreatedDate, BatchStatus: "Active", BatchCountLimit
        };
        AxiosInstance.post("batches/create", data ).then((res) => {
            res.data.status ?
            <>
            {
            Swal.fire({
                title:"Created",
                text:"New Batch Created successfully",
                icon:"success",
                confirmButtonText:"ok"
            }) }
            {props.history.push('/batches')} 
            </>: 
            Swal.fire({title: "Some Error!!",
            text: `The Result shows something Like ${res.data.result}`,
            icon: "error",
            confirmButtonText:"ok"
        });
        });
    };

    const Read = ()=>{
        AxiosInstance.post("batches/read", {BatchID: params.BatchID}).then((res)=>{
            if (res.data.status && res.data.result.length > 0 ){
            setBatchName(res.data.result[0].BatchName ? res.data.result[0].BatchName : "");
            setBatchStartDate(res.data.result[0].BatchStartDate ? moment(res.data.result[0].BatchStartDate).format("YYYY-MM-DD") : "");
            setBatchEndDate(res.data.result[0].BatchEndDate ? moment(res.data.result[0].BatchEndDate).format("YYYY-MM-DD") : "");
            setSession(res.data.result[0].Session ? res.data.result[0].Session : "");
            setSessionStartTime(res.data.result[0].SessionStartTime ? res.data.result[0].SessionStartTime : "");
            setSessionEndTime(res.data.result[0].SessionEndTime ? res.data.result[0].SessionEndTime : "");
            setBatchCountLimit(res.data.result[0].BatchCountLimit ? res.data.result[0].BatchCountLimit : "");

            CourseSession.map((Obj) =>{
                if(res.data.result[0].Session == Obj.label ){
                    setSessionStartLimit(Obj.start)
                    setSessionEndLimit(Obj.end)
                }
            })
            }
            else {
            //     Swal.fire({title: "404",
            //     text:   'Not Found',
            //     icon: "error",
            //     confirmButtonText:"ok"
            // });
            {props.history.push('/batches')}
            }
        })
    };
 
    const Update = ()=>{
        let data = {
            BatchID: params.BatchID, BatchName, BatchStartDate, BatchEndDate, Session, SessionStartTime, SessionEndTime, UpdatedBy, UpdatedDate, BatchStatus: "Active", BatchCountLimit
        };
        AxiosInstance.post("batches/update", data).then((res)=>{
            res.data.status ? 
            <>
            {
            Swal.fire({
                title:"Updated",
                text:"Updated successfully",
                icon:"success",
                confirmButtonText:"ok"
            }).then((res)=>{
                if(res.isConfirmed){
                    {props.history.push('/batches')}
                }
            }) }    
            </>:  
            Swal.fire({title: "Some Error!!",
            text: `The Result shows something Like ${res.data.result}`,
            icon: "error",
            confirmButtonText:"ok"
        });
        })
    };
    
    const handleSubmit = () => {

        const CreateBatch = {
            BatchName: BatchName.trim() === "" ? true : !/^[-a-zA-Z-()]+(\s+[-a-zA-Z-()]+)*$/.test(BatchName) ? "wrong" : false,
            BatchStartDate: BatchStartDate === " " ? true :  BatchStartDate < moment(new Date).format("YYYY-MM-DD") ? "wrong" : false,
            BatchEndDate: BatchEndDate ===" " ? true : BatchEndDate <= BatchStartDate ? "wrong" : false,
            session: Session === "",
            sessionStartTime: SessionStartTime === " " ? true : (SessionStartTime > SessionEndLimit) || (SessionStartTime < SessionStartLimit) || (SessionStartTime > moment(SessionStartLimit, 'HH:mm ').add(2, 'hours').format('HH:mm ') ) ? "wrong" : false ,
            sessionEndTime: SessionEndTime === " " ? true : (SessionEndTime < SessionEndLimit) || (SessionEndTime < SessionStartTime) || (SessionEndTime > moment(SessionEndLimit, 'HH:mm ').add(2, 'hours').format('HH:mm ') ) ? "wrong" : false ,
            BatchCountLimit: BatchCountLimit.toString().trim() === "" || BatchCountLimit <= 0,
        };    
        setError(CreateBatch)
        if (Object.values(CreateBatch).some(val => val == true || val == "wrong" )){
        }
        else {
            if(params.action === "update"){
                Update()
            } else {
                Post()
            }
        }
    };

    const handleSessionChange = (event, value) => {
        if( value != null){
            setSession(value ? value.label : '')
            setSessionStartLimit(value.start) 
            setSessionEndLimit(value.end)
        }
        else {
            setSessionEndTime(" ");
            setSessionStartTime(" ");
            setSession("");
        }
    };

    const handleSessionStartTimeChange = (event) => {
        let sess = Session != "" ? setSessionStartTime(event.target.value) : "";
    };

    const handleSessionEndTimeChange = (event) => {
        let sess = Session != "" ? setSessionEndTime(event.target.value) : "";
    };

    const handleBatchStartDate = (event) =>{
        setBatchStartDate(event.target.value);
    };

    const handleBatchEndDate = (event) =>{
        setBatchEndDate(event.target.value);
    };

    useEffect(() => {
        if (params.action === "read" || params.action === "update"){
            Read()
        }
        if(params.action === "read"){
            setDisabled(true)
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <AppBreadcrumbs crntPage='Batches Form' prevPage="Batches Table" path='/batches' />
            <Box sx={{ background: "#fff", pb: 3, boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", borderRadius:"25px" }}>
                <Grid container rowGap={5} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography sx={{ fontWeight: "bold" }}>Batch Details</Typography>
                    </Grid>                        
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} error={Error.BatchName} helperText={ Error.BatchName === "wrong" ? "Start and end space not allowed and zero not allowed" : Error.BatchName ? "Batch Name is required" :""} type='text' label="Batch Name" value={BatchName} size='small' fullWidth onChange={(e)=>setBatchName(e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} error={Error.BatchStartDate} helperText={ Error.BatchStartDate == "wrong" ? "batch start time cannot set to be past date" : Error.BatchStartDate ? "Batch Start Time is required" :""} type='date' label="Batch Starting Date" value={BatchStartDate} size='small' fullWidth onChange={handleBatchStartDate} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} error={Error.BatchEndDate} helperText={ Error.BatchEndDate == "wrong" ? "Batch End Date cannot be before or same as Start Date and no set past date" : Error.BatchEndDate ? "Batch End Time is required" :""}  type='date' label='Batch Ending Date' value={BatchEndDate} size='small' fullWidth onChange={handleBatchEndDate} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <Autocomplete disabled={Disabled} size='small' disablePortal options={CourseSession} onChange={handleSessionChange} value={{label :Session}} renderInput={(params) => <TextField {...params} error={Error.session} helperText={ Error.session ? "Session is required" : ""} label=" Select the Session" />} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} error={Error.sessionStartTime} helperText={Error.sessionStartTime == "wrong" ? `Session Starting Time should be between ${SessionStartLimit} and ${moment(SessionStartLimit, 'h:mm ').add(2, 'hours').format('h:mm ')}` : Error.sessionStartTime ? "Session Start Time is required" :""} type='time' label="Session Starting Time" value={SessionStartTime} size='small' fullWidth inputProps={{min: SessionStartTime, max:SessionEndTime}} onChange={handleSessionStartTimeChange} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} error={Error.sessionEndTime} helperText={ Error.sessionEndTime == "wrong" ? `Session End Time should be between ${SessionEndLimit} and ${moment(SessionEndLimit, 'HH:mm ').add(2, 'hours').format('HH:mm ')} ` : Error.sessionEndTime ? "Session End Time is required" :""} type='time' label="Session End Time" value={SessionEndTime} size='small' fullWidth inputProps={{min: SessionStartTime, max:SessionEndTime}} onChange={handleSessionEndTimeChange} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} error={Error.BatchCountLimit} helperText={ Error.BatchCountLimit ? "Total Seats Count required" :""} type='tel' label="Maximum Seats"  value={BatchCountLimit} size='small' fullWidth onChange={(e)=>{if (e.target.value == "" || /^[0-9\b]+$/.test(e.target.value)){setBatchCountLimit(e.target.value)}}} />
                    </Grid>
                </Grid> 
                <Box sx={{ mt: 3, mr:8, display: "flex", justifyContent: "end" }}>
                    {params.action == "read" ? "" :
                        <Button disableElevation disableRipple style={{marginRight:"10px", }} color="primary" variant='contained' onClick={handleSubmit}>{params.action == "update" ? "Update" : "Create"}</Button>}
                    <Link to='/batches'><Button disableElevation disableRipple style={{ color:"#fff"}} color="secondary" variant='contained' >{params.action == "read" ? "Back" : "Cancel"}</Button></Link>
                </Box>
            </Box>
        </ThemeProvider>
  )
};
