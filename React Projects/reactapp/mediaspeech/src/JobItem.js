import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import CsvView from './CsvView'
import { Base64 } from 'js-base64';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Conf from "./Conf"



class JobItem extends React.Component {
    state = {
        modalOpen: false,
        eta: 0,
        etaTime: "00:00:00"
    }
    currentEta = 0
    timerInterval = 0

    componentDidUpdate() {
        this.initComponentStatus()
    }

    componentDidMount() {
        console.log(this.props.item)
        if (this.props.item.status === 2 || this.props.item.status === 3) {
            if (this.props.item.eta <= 0) {
                this.setState({
                    eta: 0,
                    etaTime: "FINISHING"
                })
            } else {
                this.setState({
                    eta: this.props.item.eta,
                    etaTime: Conf.toHHMMSS(this.props.item.eta)
                })
            }

            this.initComponentStatus()
        } else {
            this.setState({
                eta: 0,
                etaTime: ""
            })
        }


    }

    initComponentStatus() {
        console.log(`status:${this.props.item.status}, eta:${this.props.item.eta}, interval:${this.timerInterval}`)
        if (this.props.item.status === 2 || this.props.item.status === 3) {
            if (this.timerInterval === 0) {
                if(this.currentEta === 0){
                    this.currentEta = this.props.item.eta
                }
                this.timerInterval = setInterval(function () {
                    this.currentEta--
                    if (this.currentEta <= 0) {
                        clearInterval(this.timerInterval)
                        this.setState({
                            etaTime: "FINISHING"
                        })
                    } else {
                        this.setState({
                            eta: this.currentEta,
                            etaTime: Conf.toHHMMSS(this.currentEta)
                        })
                    }
                }.bind(this), 1000)
            }
        } 
    }

    getStatusText() {
        if (this.props.item.itemtype === 'file') {
            return [
                "WAITING",
                "EXTRACTING",
                "EXTRACTED",
                "PROCESSING",
                "ERROR",
                "FINISHED",
                this.props.item.credits + " CREDITS NEEDED"
            ][this.props.item.status]
        }

        return [
            "WAITING",
            "DOWNLOADING",
            "DOWNLOADED",
            "PROCESSING",
            "ERROR",
            "FINISHED",
            this.props.item.credits + " CREDITS NEEDED"
        ][this.props.item.status]

    }


    viewHandler() {
        this.setState({ modalOpen: true })
    }

    downloadHandler() {
        var txt = Base64.decode(this.props.item.transcribed)
        const element = document.createElement("a");
        const file = new Blob([txt], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `job_${this.props.item.id}.csv`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    handleClose() {
        this.setState({ modalOpen: false })
    }


    render() {
        return <Box style={this.boxStyle} >
            <Grid container spacing={1} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                <Grid item xs={12} md={6}>
                    <Typography noWrap style={this.txtStyle} component="span">
                        {this.props.item.itemname}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box display="flex" justifyContent="flex-end">
                        <Box sx={{
                            background: this.props.item.status === 4 ? '#ed0202' : '#ED6C02',
                            color: '#FFFFFF'
                        }} style={this.statusBoxStyle}>
                            {this.getStatusText()}
                        </Box>
                        <Box sx={{
                            background: this.props.item.status === 4 ? '#ed0202' : '#ED6C02',
                            color: '#FFFFFF',
                            width: "51px",
                            textAlign: 'center',
                            display: (this.props.item.status === 2 || this.props.item.status === 3) ? 'flex' : 'none'
                        }} style={this.statusBoxStyle}>
                            {this.state.etaTime}
                        </Box>
                        <Button sx={{
                            background: '#0288D1',
                            color: '#FFFFFF',
                            "&:hover": {
                                backgroundColor: "#38b2f5"
                            },
                            display: this.props.item.status === 5 ? 'flex' : 'none'
                        }}
                            onClick={this.viewHandler.bind(this)}
                            style={this.statusBoxStyle}>
                            VIEW
                        </Button>
                        <Button sx={{
                            background: '#9C27B0',
                            color: '#FFFFFF',
                            "&:hover": {
                                backgroundColor: "#cd35e7"
                            },
                            display: this.props.item.status === 5 ? 'flex' : 'none'
                        }}
                            onClick={this.downloadHandler.bind(this)}
                            style={this.statusBoxStyle}>
                            DOWNLOAD
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Dialog
                maxWidth={'sm'}
                fullWidth={true}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <DialogTitle sx={{ m: 0, p: 2 }} >
                    Transcribed
                </DialogTitle>
                <DialogContent dividers>
                    <CsvView item={this.props.item} job={this.props.job} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.handleClose.bind(this)}>
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>;
    }

    modalStyle = {
        width: '400px',
        height: '500px',
    };

    boxStyle = {
        'width': '100%',
        'background': '#F1F2FD',
        'borderRadius': '5px',

        'marginTop': '15px',
        'display': 'flex',
        'flexDirection': 'row',
        'alignItems': 'center',
        'padding': '16px 28px',
        'gap': '10px',
    }

    txtStyle = {
        color: '#313771',
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "block",

    }



    statusBoxStyle = {
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

export default JobItem;

