import React from 'react';
import LandingBlock2 from './LandingBlock2';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


class LandingDownBlocks extends React.Component {


    render() {
        return <Box>
            <Grid container spacing={5} sx={{ marginTop: '20px',flexDirection: { xs: "column", md: "row"} }}>
                <Grid item xs={12} md={4}>
                    <LandingBlock2
                        percent="5.3%"
                        header="Word Error Rate"
                        content="Our advanced Georgian Speech Recognition system yields the lowest Word Error Rate on the market - 5.3%, which is 6x lower than our next best competitor's performance."
                    />
                </Grid>
                <Grid item xs={12} md={4} >
                    <LandingBlock2
                        percent="800x"
                        header="Real Time Factor"
                        content="With cutting-edge optimizations, our service works at an amazing 1000sec/sec speed to give the lowest turnaround time for large audio transcription tasks."
                    />
                </Grid>
                <Grid item xs={12} md={4} >
                    <LandingBlock2
                        percent="19200 h."
                        header="Human Hours"
                        content="It would take 19200 work hours for a human to transcribe the same amount of audio as you can accomplish with our system in just 3 hours."
                    />
                </Grid>
            </Grid>
        </Box>
    }


}

export default LandingDownBlocks;

