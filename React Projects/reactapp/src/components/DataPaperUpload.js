import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export default function DataPaperUpload({ url, btColor, bgColor, txtColor, visible, textBt, txtupload }) {
  const DemoPaper = styled(Paper)(({ theme }) => ({
    width: "90%",
    height: "20px",
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
    backgroundColor: bgColor,

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
    height: '20px',
  }




  return (

    <DemoPaper variant="elevation" elevation={0}>
      <Grid container spacing={2} direction="row"
        justifyContent="space-between"
        alignItems="center">

        <Grid item xs={6} md={8}>

          <Grid container spacing={2} direction="row"
            justifyContent="flex-start"
            alignItems="center">
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontWeight: 500,
                fontSize: "110%",
                lineHeight: "18px",
                color: txtColor
              }}
            >
              {url}

            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={6} md={4}>

          <Grid container spacing={1} sx={{ flexDirection: { xs: "column", md: "row" } }}>
            <Grid item xs={12} md={6} >
              <Box style={statusBoxStyle}>
                {txtupload}
              </Box>
            </Grid>
            <Grid item xs={12} md={6} >
              <Button
                variant="contained"
              > Cancel
              </Button>
            </Grid>
          </Grid>
















        </Grid>

      </Grid>

    </DemoPaper>

  )
}