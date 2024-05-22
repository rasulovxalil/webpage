import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import JobItem from './JobItem';
import Conf from './Conf';


class ExistingJob extends React.Component {


    state = {
        txtLabel: "Enter URL",
        txtError: false,
        txtLink: "",
        jobitems: [],
        col1: [],
        col2: [],
        timestamps: false,
        diarization: false,
        txt1: "Job #" + this.props.job.id,
        txt2: "Processing...",
        uploading: false
    }



    componentDidMount() {
        console.log("this.props.jobid " + this.props.job.jobid)
        this.updateJob()
    }

    updateView(jobitems) {
        var col1 = []
        var col2 = []
        for (let i = 0; i < jobitems.length; i++) {
            if (i % 2 === 0) {
                col1.push(jobitems[i])
            } else {
                col2.push(jobitems[i])
            }
        }
        this.setState({
            col1: col1,
            col2: col2
        })
    }

    updateJob() {
        Conf.postData(Conf.mainUrl + 'getjobitems',
            {
                jwttoken: Conf.session.jwt,
                jobid: this.props.job.jobid,
            }).then((data) => {
                if (data.status) {
                    this.setState({
                        jobitems: data.jobitems
                    })
                    var finished = true
                    for (let i = 0; i < data.jobitems.length; i++) {
                        const element = data.jobitems[i];
                        if (element.status !== 4 && element.status !== 5) {
                            finished = false
                        }
                    }
                    this.updateView(data.jobitems)
                    if (!finished) {
                        setTimeout(() => {
                            this.updateJob()
                        }, 3000);
                    } else {
                        console.log('job finished')
                        this.setState({
                            txt2: "Finished"
                        })
                    }
                }
            }).catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        return <Box
            sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <Box style={this.boxStyle} sx={{ m: 1 }}>
                <Grid container spacing={1} sx={{ flexDirection: { xs: "column", md: "row"} }}>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Typography style={this.headerStyle} component="span">
                                {this.state.txt1}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography style={this.bodyStyle} component="span">
                                {this.state.txt2}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" justifyContent={{ xs: "flex-start", md: "flex-end"}}>
                            <Box sx={{ display: this.props.job.diarization?'block':'none' }} style={this.cbBoxStyle}>
                                <Typography sx={{ fontSize: "0.8rem" }}>Diarization</Typography>
                            </Box>
                            <Box sx={{ display: this.props.job.timestamps?'block':'none' }} style={this.cbBoxStyle}>
                                <Typography sx={{ fontSize: "0.8rem" }}>Timestamps</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ flexDirection: { xs: "column", md: "row"} }}>
                    <Grid item xs={12} md={6}>
                        {this.state.col1.map(d => (
                            <JobItem key={d.id} id={d.id} item={d} job={this.props.job} />
                        ))}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {this.state.col2.map(d => (
                            <JobItem key={d.id} id={d.id} item={d} job={this.props.job} />
                        ))}
                    </Grid>
                </Grid>
            </Box>
        </Box>;
    }

    boxStyle = {
        'width': '100%',
        'background': '#FFFFFF',
        'border': '1px solid #F8F8FF',
        'boxShadow': '0px 8px 16px rgba(37, 23, 75, 0.05)',
        'borderRadius': '10px',
        'display': 'flex',
        'flexDirection': 'column',
        'alignItems': 'left',
        'padding': '16px 28px',
    }

    headerStyle = {
        'fontSize': '0.9rem',
        'fontStyle': 'normal',
        'fontWeight': '600',
        'color': '#13165C'
    }
    bodyStyle = {
        'fontSize': '0.8rem',
        'fontStyle': 'normal',
        'fontWeight': '400',
        'color': '#13165C'
    }

    cbBoxStyle = {
        background: '#9C27B0',
        borderRadius: '3px',
        fontSize: "0.5rem",
        lineHeight: "20px",
        color: '#FFFFFF',
        paddingLeft: "6px",
        paddingRight: "6px",
        marginRight: "10px",
        height: '20px',
    }
}

export default ExistingJob;

