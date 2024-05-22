import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';

import { ReactComponent as FooterMS } from '../icons/footer.svg'

class LandingFooter extends React.Component {


    render() {
        return <Box component="div" sx={{ flexGrow: 1 }}>
            <Box position="static" >
                <Toolbar variant="dense">
                    <Box flex={1} display="flex" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <SvgIcon viewBox="0 0 47 26" sx={{ width: '47px', height: '26px' }}>
                                <FooterMS />
                            </SvgIcon>
                        </Box>
                        <Box display="flex">
                            <Typography
                                component="span"
                                variant="h6"
                                sx={{
                                    color: '#55566F',
                                    fontSize: '1rem',
                                    textAlign: "right",
                                    display: { xs: "block", md: "none"},
                                }} >
                                © MediaSpeech. 2023
                            </Typography>
                            <Typography
                                component="span"
                                variant="h6"
                                sx={{
                                    color: '#55566F',
                                    fontSize: '1rem',
                                    textAlign: "right",
                                    
                                    display: { xs: "none", md: "block"},
                                }} >
                                © MediaSpeech. 2023. All rights Reserved.
                            </Typography>
                        </Box>
                    </Box>
                </Toolbar>
            </Box>
        </Box>;
    }


}

export default LandingFooter;

