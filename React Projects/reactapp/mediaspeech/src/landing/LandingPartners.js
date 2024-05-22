import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

class LandingPartners extends React.Component {


    render() {
        return <Box sx={{ marginTop: '70px' }}>

            <Typography component="h5" variant="h5" sx={{ color: '#56A517', fontSize: '1rem', textAlign: "center" }}>
                PARTNERS
            </Typography>
            <Box sx={{ background: '#F5F5F9', borderRadius: '8px', padding:'10px',marginTop: '40px' }}>
                <Grid container spacing={1} sx={{ marginTop: '20px', textAlign: "center"}}>
                    <Grid item xs={2}>
                        <img alt="USAID" src="partners/usaid.svg" height={40}></img>
                    </Grid>
                    <Grid item xs={2}>
                        <img alt="Zinc Network" src="partners/zincnetwork.svg" height={40}></img>
                    </Grid>
                </Grid>
            </Box>

        </Box>
    }


}

export default LandingPartners;

