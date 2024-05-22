import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function DataPaper({ url, btColor, bgColor, txtColor, visible, textBt, txtupload,doCancel }) {
  const DemoPaper = styled(Paper)(({ theme }) => ({
    width: "90%",
    height: "10%",
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
    backgroundColor: bgColor
  }));
  const statusBoxStyle = {
    background: '#0288D1',
    borderRadius: '3px',
    fontSize: "0.5rem",
    lineHeight: "20px",
    color: '#FFFFFF',
    paddingLeft: "6px",
    paddingRight: "6px",
    marginRight: "10px",
    height: '25px',
    width:"30%",
    marginTop:"3%"
  }
  return (

    <DemoPaper variant="elevation" elevation={0}>
      <Grid container spacing={2} direction={{md:"row",xs:'column'}}
        justifyContent={{md:"space-between",xs:"center"}}
        alignItems="center">
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} direction="row"
            justifyContent={{md:"flex-start",xs:"center"}}
            alignItems="center">
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontWeight: 500,
                fontSize:{
                  lg: "110%",
                  md: "110%",
                  sm: "110%",
                  xs: "90%"
                },
                lineHeight: "18px",
                color: txtColor,
                marginTop:"2%",
              
                
               
               
              }}
            >
              {url}

            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} direction="row"
            justifyContent="flex-end"
            alignItems="center">


            
            {visible ? 
              <Box

              sx={statusBoxStyle}

            >
                 <Typography sx={
              { fontSize:{
                lg: "130%",
                md: "130%",
                sm: "130%",
                xs: "100%"
              },
               marginTop:"5%"
              }
             }
             >
             {txtupload}
 
             </Typography>
             </Box>  :null}
         
              
            
              <Button variant="text"

                role={undefined}
                onClick={()=>doCancel()}
                tabIndex={-1}
                style={{ backgroundColor: btColor, color: "#FFFFFF", maxWidth: '70px', maxHeight: '30px', minWidth: '10px', minHeight: '10px', fontSize: "60%",marginTop:"3%" }}>
               
                {textBt}

              </Button>
            
          </Grid>
        </Grid>
      </Grid>
    </DemoPaper>


  )
}


