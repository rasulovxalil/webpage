import React from 'react'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';



export default function Dashcard({ icon, header, content, number }) {
  const DemoPaper = styled(Paper)(({ theme }) => ({
    width: "95%",
    height: "100",
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
  }));

  return (

    <DemoPaper variant="elevation">
      <Grid container spacing={2} direction="row"
        justifyContent="space-between"
        alignItems="center">
        <Grid item >
          <Box
            component="img"
            src={icon}
          />
        </Grid>
        <Grid item >
          <Typography sx={{
            fontFamily:"Poppins",
            fontWeight:600,
            fontSize:"18px",
            lineHeight:"18px",
            color:"#13165C"
          }} >
            {header}
          </Typography>
          <Typography 
          sx={{
            fontFamily:"Poppins",
            fontWeight:400,
            fontSize:"18px",
            lineHeight:"18px",
            color:" #13165C"
          }} 
          >
            {content}
          </Typography>
        </Grid>
        <Grid item >
          <Typography 
          sx={{
            fontFamily:"Poppins",
            fontWeight:600,
            fontSize:"32px",
            lineHeight:"32px",
            color:" #13165C"
          }}
          >
            {number}
          </Typography>
        </Grid>
      </Grid>
    </DemoPaper>



  )
}
