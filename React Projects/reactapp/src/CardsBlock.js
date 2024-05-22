import React from 'react'
import Grid from '@mui/material/Grid';
import MediaSpeechCard from './components/MediaSpeechCard';
import Lang from './Langauges';
import mic from './icons/mic.svg'
import person from './icons/person.svg'
import clock from './icons/clock.svg'
import dynamic from './icons/dynamic.svg'

export default function CardsBlock() {
    return (
        <Grid container spacing={2} direction='column' alignItems="center"
        justifyContent="center" style={{padding:"10%"}} className='cardsstyle'
         >
            <Grid item md={6}>
                <Grid container spacing={2} >
                    <Grid item md={6} xs={12}>
                        <MediaSpeechCard header={Lang.mic.header} desc={Lang.mic.text} icon={mic} />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <MediaSpeechCard header={Lang.person.header} desc={Lang.person.text} icon={person}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={6}>
                <Grid container spacing={2} >
                    <Grid item md={6} xs={12}>
                        <MediaSpeechCard header={Lang.clock.header} desc={Lang.clock.text} icon={clock}/>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <MediaSpeechCard header={Lang.dynamic.header} desc={Lang.dynamic.text} icon={dynamic}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
