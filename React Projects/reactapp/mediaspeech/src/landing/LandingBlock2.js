import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

class LandingBlock2 extends React.Component {


    render() {
        return <Box component="div" sx={{ flexGrow: 1, }}>
            <Typography component="h5" variant="h5" sx={{  fontWeight: '600',fontSize: '2rem',  textAlign:'center'}}>
                {this.props.percent}
            </Typography>
            <Typography component="h5" variant="h5" sx={{ fontWeight: '600',fontSize: '1rem',  textAlign:'center' }}>
                {this.props.header}
            </Typography>
            <Typography component="h6" variant="h6" sx={{ fontSize: '0.9rem',  textAlign:'center' }}>
                {this.props.content}
            </Typography>
        </Box>;
    }


}

export default LandingBlock2;

