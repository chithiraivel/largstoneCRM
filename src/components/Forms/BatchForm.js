import { Autocomplete, Box, Button, createTheme, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import AxiosInstance from '../../axiosinstance';
import moment from 'moment';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppBreadcrumbs from '../breadCrumbs/breadcrumbs';
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

    const [BatchName, setBatchName] = useState("");
    const [BatchStartDate, setBatchStartDate] = useState(" ");
    const [BatchEndDate, setBatchEndDate] = useState(" ");
    const [Session, setSession] = useState("");
    const [SessionStartTime, setSessionStartTime] = useState(" ");
    const [SessionEndTime, setSessionEndTime] = useState(" ");
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

    const Post = ()=>{
        let data = {
            BatchName, BatchStartDate, BatchEndDate, Session, SessionStartTime, SessionEndTime, CreatedBy, CreatedDate, BatchStatus: "Active", BatchCountLimit
        };
        AxiosInstance.post("batches/create", data ).then((res) => {
            res.data.status ? props.history.push('/batches') : alert(res.data.result);
        });
    };

    const Read = ()=>{
        AxiosInstance.post("batches/read", {BatchID: params.BatchID}).then((res)=>{
            setBatchName(res.data.result[0].BatchName ? res.data.result[0].BatchName : "");
            setBatchStartDate(res.data.result[0].BatchStartDate ? moment(res.data.result[0].BatchStartDate).format("YYYY-MM-DD") : "");
            setBatchEndDate(res.data.result[0].BatchEndDate ? moment(res.data.result[0].BatchEndDate).format("YYYY-MM-DD") : "");
            setSession(res.data.result[0].Session ? res.data.result[0].Session : "");
            setSessionStartTime(res.data.result[0].SessionStartTime ? res.data.result[0].SessionStartTime : "");
            setSessionEndTime(res.data.result[0].SessionEndTime ? res.data.result[0].SessionEndTime : "");
            setBatchCountLimit(res.data.result[0].BatchCountLimit ? res.data.result[0].BatchCountLimit : "");
        })
    };
 
    const Update = ()=>{
        let data = {
            BatchID: params.BatchID, BatchName, BatchStartDate, BatchEndDate, Session, SessionStartTime, SessionEndTime, UpdatedBy, UpdatedDate, BatchStatus: "Active", BatchCountLimit
        };
        AxiosInstance.post("batches/update", data).then((res)=>{
            res.data.status ? props.history.push('/batches') : alert(res.data.result);
        })
    };
    
    const handleSubmit = () => {
        const CreateBatch = {
            BatchName: BatchName === "",
            BatchStartDate: BatchStartDate === " ",
            BatchEndDate: BatchEndDate ===" ",
            session: Session === "",
            sessionStartTime: SessionStartTime ===" ",
            sessionEndTime: SessionEndTime ===" ",
            BatchCountLimit: BatchCountLimit ==="",
        };    
        setError(CreateBatch)
        if (Object.values(CreateBatch).some(val => val == true )){}
        else {
            if(params.action == "update"){
                Update()
            } else {
                Post()
            }
        }
    };

    useEffect(() => {
        if (params.action == "read" || params.action == "update"){
            Read()
        }
        if(params.action == "read"){
            setDisabled(true)
        }
    }, []);

    const CourseSession = [{label:"Morning"},{ label:"AfterNoon"}, {label:"Evening"}, {label:"Full Day",}]

    return (
        <ThemeProvider theme={theme}>
            <AppBreadcrumbs crntPage='Batches Form' prevPage="Batches Table" path='/batches' />
            <Box sx={{ background: "#fff", pb: 3, boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", borderRadius:"25px" }}>
                <Grid container rowGap={5} columnGap={5} paddingLeft={4} paddingTop={3}>
                    <Grid item xs={12}>
                        <Typography sx={{ fontWeight: "bold" }}>Batch Details</Typography>
                    </Grid>                        
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} error={Error.BatchName} helperText={ Error.BatchName ? "Batch Name is required" :""} type='text' label="Batch Name" value={BatchName} size='small' fullWidth onChange={(e)=>setBatchName(e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} error={Error.BatchStartDate} helperText={ Error.BatchStartDate ? "Batch Start Time is required" :""} type='date' label="Batch Starting Date" value={BatchStartDate} size='small' fullWidth onChange={(e) => setBatchStartDate(e.target.value)}>
                        </TextField>
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} error={Error.BatchEndDate} helperText={ Error.BatchEndDate ? "Batch End Time is required" :""}  type='date' label='Batch Ending Date' value={BatchEndDate} size='small' fullWidth onChange={(e)=>setBatchEndDate(e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <Autocomplete disabled={Disabled} size='small' disablePortal options={CourseSession} onChange={((e, val)=> setSession(val.label))} value={{label :Session}} renderInput={(params) => <TextField {...params} error={Error.session} helperText={ Error.session ? "Session is required" : ""} label=" Select the Session" />} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} error={Error.sessionStartTime} helperText={ Error.sessionStartTime ? "Session Start Time is required" :""} type='time' label="Session Starting Time" value={SessionStartTime} size='small' fullWidth onChange={(e)=>setSessionStartTime(e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} error={Error.sessionEndTime} helperText={ Error.sessionEndTime ? "Session End Time is required" :""} type='time' label="SessionEndTime" value={SessionEndTime} size='small' fullWidth onChange={(e)=>setSessionEndTime(e.target.value)} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <TextField disabled={Disabled} error={Error.BatchCountLimit} helperText={ Error.BatchCountLimit ? "Total Seats Count required" :""} type='tel' label="Maximum Seats"  value={BatchCountLimit} size='small' fullWidth onChange={(e)=>setBatchCountLimit(e.target.value)} />
                    </Grid>
                </Grid> 
                <Box sx={{ mt: 3, mr:8, display: "flex", justifyContent: "end" }}>
                    {params.action == "read" ? "" :
                        <Button disableElevation disableRipple style={{marginRight:"10px", backgroundColor:"#4daaff"}} variant='contained' onClick={handleSubmit}>{params.action == "update" ? "Update" : "Create"}</Button>}
                    <Link to='/batches'><Button disableElevation disableRipple style={{backgroundColor:"#ff726f", color:"#fff"}} variant='contained' >{params.action == "read" ? "Back" : "Cancel"}</Button></Link>
                </Box>
            </Box>
        </ThemeProvider>
  )
};
