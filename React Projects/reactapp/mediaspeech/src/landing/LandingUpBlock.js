import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { withRouter } from '../withRouter';

class LandingUpBlock extends React.Component {


    componentDidMount() {

    }

    handleGetStarted() {
        
    }
    handleDocumentation() {
        
    }



    render() {
        return <Box component="div" sx={{ flexGrow: 1, }}>
            <div style={{
                backgroundImage: "url('./landingbg.svg')",
                width: "100%",
                height: "370px",
                textAlign: "center",
                backgroundBlendMode: "luminosity",
                marginTop: "50px"
            }} >
                <Typography component="h4" variant="h4" sx={{fontWeight: '600'}}>
                    The Most Advanced Georgian Speech Recognition<br />On The Market
                </Typography>
                <Typography component="h6" variant="h6">
                    We created the most accurate ASR product on the market in partnership with USAID to fight disinformation and propaganda.
                </Typography>
                <Grid 
                    container 
                    justifyContent="center"
                    alignItems="center"
                    spacing={1} 
                    sx={{ marginTop: '10px', flexDirection: { xs: "column", md: "row"} }}
                >
                    <Grid item xs={6} sx={{ textAlign: 'right' }}>
                        <Button
                            variant="contained"
                            sx={{
                                width:'200px',
                                boxShadow: 0,
                                color: '#ffffff',
                                background: '#13165C',
                                borderRadius: '5px',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                paddingLeft: '10px',
                                paddingRight: '10px',
                                border: '1px solid #13165C'
                            }}
                            onClick={this.handleGetStarted.bind(this)}
                        >
                            Lets get started
                        </Button>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: 'left' }}>
                        <Button
                            variant="contained"
                            sx={{
                                width:'200px',
                                boxShadow: 0,
                                color: '#13165C',
                                background: '#ffffff',
                                borderRadius: '5px',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                paddingLeft: '10px',
                                paddingRight: '10px',
                                border: '1px solid #8F91C5'
                            }}
                            onClick={this.handleDocumentation.bind(this)}
                        >
                            Documentation
                        </Button>
                    </Grid>
                </Grid>



            </div>
        </Box>;
    }


}

export default withRouter(LandingUpBlock);

