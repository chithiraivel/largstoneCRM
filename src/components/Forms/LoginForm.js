import { Box, Button, Grid, IconButton, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import {CheckBoxOutlined, CheckBoxOutlineBlankOutlined, VisibilityOutlined, VisibilityOffOutlined} from '@mui/icons-material';
import React, {useContext, useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import LoginImage from '../../assets/images/logo1.png'
import { Redirect } from 'react-router-dom';

import {context} from '../layout/Layout'

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

export default function LoginForm() {

    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [ShowPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [Error, setError] = useState({
        username : false,
        password : false,
    });

    const {login, setLogin} = useContext(context)
    let user = "user";
    let pass = "user@999";

    let admin = "vel";
    let adminPass = "vel123";

    const handleSubmit = ()=>{
        const ValidateUser = {
            username: UserName === "" ? true : UserName != user ? "wrong" : '',
            password: Password === "" ? true : Password != pass ? "wrong" : '',
        }
        setError(ValidateUser)
        if (Object.values(ValidateUser).some(val => val == true )){console.log(Error)}
        else{
          if (UserName == user && Password == pass){
            localStorage.setItem("LoggedIN", true);
            setIsLoggedIn(true) 
            localStorage.setItem("Name", "Uzumaki") 
          }
          else if (UserName == admin && Password == adminPass){
            localStorage.setItem("LoggedIN", true);
            setIsLoggedIn(true) 
            localStorage.setItem("Name", "vel") 
          }
        }
    };

    if (isLoggedIn){
      return (
        <>
        {setLogin(true)}
        <Redirect to="/dashboard" /> 
      </>)
    }

    const handleTogglePassword = (e)=>{
      setShowPassword(!ShowPassword)
    };

  return (
    <div>
        <ThemeProvider theme={theme}>
            <Grid container justifyContent='space-evenly' sx={{backgroundColor:"#fafafb", py:6}}>
            <Grid item md={6} sx={{display:"flex"}} justifyContent='center' xs={2}>
                    <img src={LoginImage} width="80%" height="80%" alt='login Image'/>
                </Grid>
                <Grid item sx={{backgroundColor:"white", p:3, pt:10, borderRadius:"20px"}} xs={12} md={4.5} >
                    <Box>
                        <Typography variant='h3' sx={{fontWeight:"bold", pb:2,textAlign:"center"}}>Login</Typography>
                        <Box sx={{pt:3}} >
                          <Typography sx={{py:1}}>Enter your Username</Typography>
                          <TextField placeholder='username' error={Error.username} helperText={Error.username == "wrong" ? "Enter valid username" : Error.username ? "User Name is required"  :""} value={UserName} onChange={(e)=> setUserName(e.target.value)} fullWidth type='text' size='small' />
                        </Box>
                        <Box  sx={{pt:2}}>
                          <Typography sx={{py:1}}>Enter your Password</Typography>
                          <TextField placeholder='atleast 8 characters' error={Error.password} helperText={ Error.password == "wrong" ? "Enter valid password" : Error.password ? "Password is required" : ""} value={Password} onChange={(e)=> setPassword(e.target.value)} fullWidth type={ShowPassword ? "text" : "password"} size='small' InputProps={{endAdornment: ( <IconButton disableRipple onClick={handleTogglePassword}> {ShowPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />} </IconButton> ), }} />
                        </Box>
                        <Button fullWidth disableElevation disableRipple size='large' style={{marginRight:"10px", backgroundColor:"#4daaff", marginTop:"15px"}} variant='contained' onClick={handleSubmit}>Login</Button>
                    </Box>
                </Grid>
                
            </Grid>
        </ThemeProvider>
    </div>
  ) 
}
