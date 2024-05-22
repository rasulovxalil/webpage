import React from 'react'
import Dashcard from '../src/components/Dashcard';
import Grid from '@mui/material/Grid';
import Lang from './Langauges';
import wate from '../src/svgs/water.svg'
import don from '../src/svgs/done.svg'
import clou from '../src/svgs/cloud.svg'
import ContentCard from '../src/components/ContentCard';
import ContentCard2 from '../src/components/ContentCard2';
import { useState,useEffect } from 'react';

export default function Content() {


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
        console.log(response)
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
    <Grid container spacing={4} sx={{padding:"10%", alignItems:"center", justifyContent:"center"}}>
    <Grid container spacing={4} sx={{padding:"10%"}}>
      <Grid item md={4} xs={12}>
        <Dashcard  icon={wate} header={Lang.water.header} content={Lang.water.text} number={data.credits}/>
      </Grid>
      <Grid item md={4} xs={12}>
        <Dashcard icon={don}  header={Lang.done.header} content={Lang.done.text} number={data.processed}/>
      </Grid>
      <Grid item md={4} xs={12}>
        <Dashcard  icon={clou} header={Lang.cloud.header} content={Lang.cloud.text} number={data.active}/>
      </Grid>
    
    </Grid>
    <Grid container spacing={4}>
    <Grid item md={12} xs={12}>
    <ContentCard/>
    </Grid>
   
    
    
    </Grid>
    </Grid>
  )
}
