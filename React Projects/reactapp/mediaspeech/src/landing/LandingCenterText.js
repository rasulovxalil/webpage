import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

class LandingCenterText extends React.Component {


    render() {
        return <Box sx={{ textAlign: 'center', marginTop: "60px" }}>
            <Typography component="h5" variant="h5" sx={{ color: '#56A517', fontSize: '1rem' }}>
                ABOUT NUMBERS
            </Typography>
            <Typography component="h4" variant="h4" sx={{ fontWeight: '600'}}>
                Our Technology<br />
            </Typography>
            <Typography component="h6" variant="h6" >
            With our cutting-edge technology, we outperform existing services by a large margin in two dimensions: quality, performance.
            </Typography>

        </Box>
    }


}

export default LandingCenterText;

