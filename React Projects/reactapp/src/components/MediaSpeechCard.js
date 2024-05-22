import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export default function MediaSpeechCard({header,desc,icon}) {
    return (
        <Grid container spacing={2} direction="column" className="lefttext" >
            <Grid item xs={3} justifyContent="flex-start" display="flex" >
                <Box
                    component="img"
                    src={icon}
                />
            </Grid>
            <Grid item xs={4} justifyContent="flex-start" display="flex" >
                <Typography   className="msheader" component="span" >
                    {header}
                </Typography>
            </Grid>
            <Grid item xs={5} justifyContent="flex-start" display="flex"  >
                <Typography  className="msdesc" >
                    {desc}
                </Typography>
            </Grid>

        </Grid>
    )
}
