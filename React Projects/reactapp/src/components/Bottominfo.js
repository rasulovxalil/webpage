import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


export default function Bottominfo({procent,header,text}) {
    return (
        <Grid container spacing={2} direction="column" alignItems="center"
        justifyContent="center"
        >
            <Grid item xs={3} >
                <Typography  className='binfoprocent'>
                    {procent}
                </Typography>
            </Grid>
            <Grid item xs={4} className='binfoheader' >
                <Typography   >
                    {header}
                </Typography>
            </Grid>
            <Grid item xs={5}   className='binfotext'>
                <Typography  >
                    {text}
                </Typography>
            </Grid>

        </Grid>
    )
}
