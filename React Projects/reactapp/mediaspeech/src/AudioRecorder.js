import React from 'react';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as RecordMS } from './icons/record.svg'
import MicRecorder from 'mic-recorder-to-mp3';
import Conf from "./Conf"

class AudioRecorder extends React.Component {


    mp3Recorder = null
    timeRecordedInterval = 0
    timeRecorded = 0

    componentDidMount() {
        this.mp3Recorder = new MicRecorder({ bitRate: 160 });
    }
    state = {
        txt: 'Record',
        className: '',
        recording: false,
        blobURL: null
    }

    handleRecord() {
        if (this.state.recording) {
            this.mp3Recorder
                .stop()
                .getMp3()
                .then(([buffer, blob]) => {
                    this.props.completeHandler(blob)
                }).catch((e) => console.log(e));
            clearInterval(this.timeRecordedInterval)
            this.timeRecorded = 0
            this.setState({
                txt: 'Record',
                className: '',
                recording: false
            })
        } else {
            this.startRecord()
        }

    }

    increaseTime() {
        this.timeRecorded++
        this.setState({
            txt: Conf.toHHMMSS(this.timeRecorded),
        })
    }

    startRecord() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                console.log('Permission Granted');
                this.props.errorHandler("Record", "Audio recording started")
                this.mp3Recorder
                    .start()
                    .then(() => {
                        this.timeRecordedInterval = setInterval(this.increaseTime.bind(this), 1000)
                        this.setState({
                            className: 'blink',
                            recording: true,
                        })
                    }).catch(() => this.props.errorHandler("Record", "Error recording audio"));
            })
            .catch((err) => {
                console.log(err)
                console.log('Permission Denied');
                this.props.errorHandler("Record", "Error access mic")
            });


    }


    render() {
        return <Button
            style={this.boxStyle}
            onClick={this.handleRecord.bind(this)}
        >
            <SvgIcon className={this.state.className} style={this.logoStyle} viewBox="0 0 24 24">
                <RecordMS />
            </SvgIcon>
            {this.state.txt}
        </Button>;
    }
    boxStyle = {
        'width': '100%',
        'height': '40px',
        'background': '#F8F8FF',
        'border': '1px solid #E4E5F1',
        'borderRadius': '5px',

        'marginTop': '15px',
        'display': 'flex',
        'flexDirection': 'row',
        'alignItems': 'center',
        'padding': '16px 28px',
        'gap': '10px',
        ...this.props.sx,
    }

    logoStyle = {
        'width': '24px',
    }



}

export default AudioRecorder;

