import React from 'react';
import LandingBlock from './LandingBlock';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { ReactComponent as LMic } from '../icons/l_mic.svg'
import { ReactComponent as LUser } from '../icons/l_user.svg'
import { ReactComponent as LClock } from '../icons/l_clock.svg'
import { ReactComponent as LChart } from '../icons/l_chart.svg'

class LandingCenterBlock extends React.Component {


    render() {
        return <Box>
            <Grid container spacing={5} sx={{ marginTop: '20px',flexDirection: { xs: "column", md: "row"} }}>
                <Grid item xs={12} md={6}>
                    <LandingBlock
                        icon={<LMic />}
                        header="Speech recognition"
                        content="You can use our proprietary Georgian Speech Recognition to automatically transcribe vast amount of audio files with enterprise accuracy."
                    />
                </Grid>
                <Grid item xs={12} md={6} >
                    <LandingBlock
                        icon={<LUser />}
                        header="Speaker diarization"
                        content="With our Georgian Speaker Diarization, you'll be able to understand Who talked and When in the audio."
                    />
                </Grid>
            </Grid>
            <Grid container spacing={5} sx={{ marginTop: '40px',flexDirection: { xs: "column", md: "row"}  }}>
                <Grid item xs={12} md={6}>
                    <LandingBlock
                        icon={<LClock />}
                        header="Timestamp estimation"
                        content="One of our most-popular features is Timestamp Estimation, which can provide users with Word-Level or Sentence-Level time information so you can easily jump to desired segment for further analysis."
                    />
                </Grid>
                <Grid item xs={12} md={6} >
                    <LandingBlock
                        icon={<LChart />}
                        header="Sentiment Analysis"
                        content="Our LLM (Large Language Model) based Sentiment Analysis software will automatically determine the sentiment of the segment with highest accuracy on the market."
                    />
                </Grid>
            </Grid>
        </Box>
    }


}

export default LandingCenterBlock;

