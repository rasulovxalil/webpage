import React from 'react'
import ms from './Ms.svg';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
;



export default function Footer() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Box
                    component="img"
                    src={ms}
                />
            </Grid>
            <Grid item xs={6}>
                <Typography   >
                    © Mediaspeech. 2022. All rights reserved
                </Typography>
            </Grid>

        </Grid>
    )
}
