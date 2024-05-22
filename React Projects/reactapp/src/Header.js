import React from 'react';
import Grid from '@mui/material/Grid';
import mediaspeech from './mediaspeech.svg'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box
            component="img"
            src={mediaspeech}
          />
        </Grid>
        <Grid item xs={6}>
        <Link to="/loginpage">
          <Button variant="contained" style={{ backgroundColor: '#13165C' }}>Login</Button>
          </Link>
        </Grid>

      </Grid>
  
  )
}
