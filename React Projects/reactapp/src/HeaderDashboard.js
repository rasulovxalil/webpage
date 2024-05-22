import React from 'react';
import Grid from '@mui/material/Grid';
import mediaspeech from './mediaspeech.svg'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import logout from './logout.svg';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';

export default function Header() {

  const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 310,
    height: 48,
    textAlign: 'center',
    backgroundColor:" #F4F2FF",
    alignItems:"center"
  }));
  const styleMedia = {
    width: {xs : '400%',md:"208px"},
    height : {xs : "100%", md:"26px"}
  }
  const [data,setData]=useState([]);

  const getData=()=>{
    fetch('data.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson)
        setData(myJson);
      });
  }

  useEffect(()=>{
    getData()
  },[])


  return (
    <Grid container spacing={2}   justifyContent="space-between">
      <Grid item md={6} xs={6} >

        <Grid container spacing={2} paddingLeft={"10%"}>
          <Grid item xs={4}>
            <Box
            sx={styleMedia}
              component="img"
              src={mediaspeech}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item md={6} xs={6}>
        <Grid container spacing={0.5}   justifyContent="flex-end"
        alignItems="center"

        direction={{xs: "column", md: "row"}}
        
        >
        
          <Grid item md={4} xs={6}>
            <Box
              sx={{
                display: 'flex',
            
                '& > :not(style)': {
                  m: 1,
                  width: "100%",
                  height: 38,
                },
              }}
            >
            <DemoPaper variant="elevation">Hello! {data.email}</DemoPaper>

            </Box>
          </Grid>

          <Grid item md={4} xs={6} >
            <Link to="/">
            <Button variant="contained" style={{
              background: '#F9CDCD',
              color: '#5C1313',
              fontSize: 'Poppins',
              fontWeight: "500"

            }}><Box
                component="img"
                src={logout}

              /> Logout</Button>
              </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>



  )
}
