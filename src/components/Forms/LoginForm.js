import { Box, Button, Checkbox, Divider, Grid, IconButton, Link, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import {CheckBoxOutlined, CheckBoxOutlineBlankOutlined, VisibilityOutlined, VisibilityOffOutlined} from '@mui/icons-material';
import React, {useContext, useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import LoginImage from '../../assets/images/footer.png'
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
    const [Checked, setChecked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [Error, setError] = useState({
        username : false,
        password : false,
    });

    const {login, setLogin} = useContext(context)
    let user = "Admin";
    let pass = "admin123";

    const handleSubmit = ()=>{
        const ValidateUser = {
            username: UserName === "",
            password: Password === "",
        }
        setError(ValidateUser)
        if (Object.values(ValidateUser).some(val => val == true )){}
        else{
          if (UserName == user && Password == pass){
            localStorage.setItem("LoggedIN", true);
            setIsLoggedIn(true)  
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

    const handleCBchange = (e)=>{
      setChecked(e.target.checked)
    };

    const handleTogglePassword = (e)=>{
      setShowPassword(!ShowPassword)
    };

  return (
    <div>
        <ThemeProvider theme={theme}>
            <Grid container justifyContent='space-evenly' sx={{backgroundColor:"#fafafb", py:6}}>
                <Grid item sx={{backgroundColor:"white", p:3, py:6, borderRadius:"20px"}} xs={12} md={4.5} >
                    <Box>
                        <Typography variant='h3' sx={{fontWeight:"bold", pb:2}}>Login</Typography>
                        <Typography variant='paragraph' sx={{color:"#696969", lineHeight:1.5}}>Login with data that you entered during your registration</Typography>
                        <Box sx={{pt:3}} >
                          <Typography sx={{py:1}}>Enter your Username</Typography>
                          <TextField placeholder='username' error={Error.username} helperText={Error.username ? "User Name is required" : ""} value={UserName} onChange={(e)=> setUserName(e.target.value)} fullWidth type='text' size='small' />
                        </Box>
                        <Box  sx={{pt:2}}>
                          <Typography sx={{py:1}}>Enter your Password</Typography>
                          <TextField placeholder='atleast 8 characters' error={Error.password} helperText={Error.password ? "Password is required" : ""} value={Password} onChange={(e)=> setPassword(e.target.value)} fullWidth type={ShowPassword ? "text" : "password"} size='small' InputProps={{endAdornment: ( <IconButton disableRipple onClick={handleTogglePassword}> {ShowPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />} </IconButton> ), }} />
                        </Box>
                        <Button fullWidth disableElevation disableRipple size='large' style={{marginRight:"10px", backgroundColor:"#4daaff", marginTop:"15px"}} variant='contained' onClick={handleSubmit}>Login</Button>
                        <Box sx={{display:"flex", justifyContent:"center", mt:2, color:"#696969"}}>
                          <Checkbox icon={<CheckBoxOutlineBlankOutlined style={{color:"#4daaff"}}/>} checkedIcon={<CheckBoxOutlined style={{color:"#4daaff"}}/>} sx={{ p:0, }} disableRipple size='small' onChange={handleCBchange}></Checkbox>
                          <Typography >Remember me</Typography>
                        </Box>
                        <Link sx={{textDecoration:"none", color:"#4daaff", cursor:"pointer"}}><Typography sx={{textAlign:"center", my:2,}}>Forget your password?</Typography></Link>
                        <Divider/>
                        <Box sx={{display:"flex", justifyContent:"center", mt:3}}>
                          <Button disableElevation disableRipple variant='outlined' style={{borderColor:"#4daaff", color:"#4daaff", borderRadius:"40px"}} >Signup Now</Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={6} sx={{display:"flex", mt:10}} justifyContent='center' xs={2}>
                    <img src={LoginImage} width="80%" height="80%" alt='login Image'/>
                </Grid>
            </Grid>
        </ThemeProvider>
    </div>
  )
}
