import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Bottominfo from './components/Bottominfo';
import Lang from './Langauges';


export default function BottomCard() {
    return (
        <Grid container spacing={2} direction='column' alignItems="center"
            justifyContent="center" padding="10%" 
        >
            <Grid item md={6} xs={12}>
                <Grid container spacing={2}  direction='column' alignItems="center" justifyContent="center">
                    <Grid item xs={4}>
                        <Typography  style={{color: '#56A517'}} >
                            ABOUT NUMBERS
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography  className="bcardheader" >
                            Mediaspeech tech
                            performance
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography   className='bcardtext' >
                            As an added benefit, professionals can save time by using this service
                            instead of manually transcribing lengthy audio recordings.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={6} style={{padding:"10%"}}>
                <Grid container spacing={2} >
                    <Grid item md={4} xs={12}> 
                        <Bottominfo  procent={Lang.bottominfo1.procent} header={Lang.bottominfo1.header} text={Lang.bottominfo1.text}/>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Bottominfo  procent={Lang.bottominfo2.procent} header={Lang.bottominfo2.header} text={Lang.bottominfo2.text}/>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Bottominfo procent={Lang.bottominfo3.procent} header={Lang.bottominfo3.header} text={Lang.bottominfo3.text}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
