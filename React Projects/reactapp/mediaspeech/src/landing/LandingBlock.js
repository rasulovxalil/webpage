import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';

class LandingBlock extends React.Component {


    //this.props.statePercent

    render() {
        return <Box component="div" sx={{ flexGrow: 1, }}>
            <SvgIcon style={this.logoStyle} viewBox="0 0 32 33">
                {this.props.icon}
            </SvgIcon>
            <Typography component="h5" variant="h5" sx={{ fontWeight: '600',fontSize: '1rem' }}>
                {this.props.header}
            </Typography>
            <Typography component="h6" variant="h6" sx={{ fontSize: '1rem' }}>
                {this.props.content}
            </Typography>
        </Box>;
    }


}

export default LandingBlock;

