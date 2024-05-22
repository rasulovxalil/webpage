import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Grid,Paper,Avatar, TextField, Button, Typography,Link } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";



export default function Login() {
  const paperStyle={padding :20,width:280, margin:"20px auto"}
  const avatarStyle={backgroundColor:'#1bbd7e'}
  const btnstyle={margin:'8px 0'}
  const [loginfo,setLoginfo] = useState("")
  const [logpassw,setLogpassw] = useState("")
  const navigate = useNavigate();

//   const data = { username: loginfo,
//     password: logpassw

//    };


//  async function postJSON(data) {
//    try {
//       const response = await fetch('data.json', {
//         method: "POST", // or 'PUT'
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
  
//       const result = await response.json();
//       console.log("Success:", result);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }


  function submitInfo(){
    console.log(loginfo)
    console.log(logpassw)
//  postJSON(data);
    navigate("/dashboard");

  }




  return (
    <Grid sx={{paddingTop:"10%"}}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <Grid container spacing={2}>
                <Grid item sx={{width:"100%"}}>
                <TextField label='Username' placeholder='Enter username' fullWidth required  value={loginfo} onChange={(e)=>setLoginfo(e.target.value)}/>
                </Grid>
                <Grid item sx={{width:"100%"}}>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required value={logpassw} onChange={(e)=>setLogpassw(e.target.value)}/>
                </Grid>
                </Grid>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={()=>submitInfo()}>Sign in</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="#" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}