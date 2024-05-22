import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import upload from '../svgs/upload.svg';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DataPaperDone from '../components/DataPaperDone'
import DataPaperUpload from '../components/DataPaperUpload';
import DataPaperCancel from '../components/DataPaperCancel';


const DemoPaper = styled(Paper)(({ theme }) => ({
    width: "100%",
    height: "100%",
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));

export default function ContentCard() {
    const [url, setUrl] = useState("https://www.youtube.com/")
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    function getUrl() {
        console.log(url)
    }
    return (
        <Grid container spacing={2} sx={{ padding: "7%", alignItems: "center", justifyContent: "center" }}>
            <DemoPaper variant="elevation">
                <Grid container spacing={2} direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start">
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography sx={{
                                    fontFamily: "Poppins",
                                    fontWeight: 600,
                                    fontSize: "18px",
                                    lineHeight: "18px",
                                    color: "#13165C",
                                    textAlign: "start",
                                    paddingTop: "1%"
                                }} >
                                    New Job
                                </Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <Typography sx={{
                                    fontFamily: "Poppins",
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    lineHeight: "16px",
                                    color: "#13165C",
                                    textAlign: "start",
                                    paddingTop: "1%"
                                }} >
                                    Use any media for transcription
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={2} direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                        >


                            <Grid item md={4} xs={12}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Diarization" />
                                </FormGroup>

                            </Grid>
                            <Grid item md={4} xs={12}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label="Timestamps" />
                                </FormGroup>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <Box
                                    
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '172px', height: "56px" },
                                    }}

                                >
                                    <Button variant="text" component="label"
                                        role={undefined}

                                        tabIndex={-1}
                                        style={{ backgroundColor: "#141645", color: "#FFFFFF",width:"100%",paddingRight:"3%" }} onClick={() => getUrl()} >

                                        Transcribe
                                        <VisuallyHiddenInput type="file" />
                                    </Button>
                                </Box>
                            </Grid>


                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} direction="row"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    paddingTop={"7%"}
                >
                    <Grid item md={6} xs={12} >
                        <DataPaperDone url={url} />

                    </Grid>
                    <Grid item md={6} xs={12} >
                        <DataPaperDone url={url} />
                    </Grid>
                    <Grid item md={6} xs={12} >
                        <DataPaperUpload url={url} />
                    </Grid>
                    <Grid item md={6} xs={12} >
                        <DataPaperUpload url={url} />
                    </Grid>
                    <Grid item md={6} xs={12} >
                        <DataPaperCancel url={url} />
                    </Grid>
                    <Grid item md={6} xs={12} >
                        <DataPaperCancel url={url} />
                    </Grid>
                </Grid>
                <Grid container spacing={2} direction="row"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    paddingTop={"7%"}
                >
                    <Grid item md={6} xs={12} >
                        <Box
                            
                            sx={{
                                '& > :not(style)': { m: 1, width: '95%', height: "56px" },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="outlined-basic" label="Enter URL" variant="outlined" onChange={(e) => setUrl(e.target.value)} value={url} />
                        </Box>

                    </Grid>
                    <Grid item md={6} xs={12} >
                        <Box
                            
                            sx={{
                                '& > :not(style)': { m: 1, width: '100%', height: "56px" },
                            }}

                        >
                            <Button variant="text" style={{ maxWidth: "700px", maxHeight: "56px", backgroundColor: "#E7E9FC", color: "#13165C" }} onClick={() => getUrl()} >
                                <Box
                                    component="img"
                                    src={upload}
                                    sx={{ padding: "1%" }}

                                />
                                Upload File
                                <VisuallyHiddenInput type="file" />
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </DemoPaper>
        </Grid>

    )
}