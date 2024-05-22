import React from 'react';
import Box from '@mui/material/Box';
import { Base64 } from 'js-base64';
import SimpleViewer from "./csvviewer/SimpleViewer"
import DiarizationView from "./csvviewer/DiarizationView"

class CsvView extends React.Component {


    modalStyle = {
        background: '#ffffff',
        boxShadow: 24,
        padding: '10px'
    };


    componentDidMount() {
        console.log("this.props.job.diarization "+this.props.job.diarization)
    }

    getView(){
        if(this.props.job.diarization === 1){
            return <DiarizationView txt = {Base64.decode(this.props.item.transcribed)}/>
        }
        if(this.props.job.timestamps === 1){
            return <DiarizationView txt = {Base64.decode(this.props.item.transcribed)}/>
        }
        return <SimpleViewer txt = {Base64.decode(this.props.item.transcribed)}/>
    }


    render() {
        return <Box style={this.modalStyle} >
            {this.getView()}
        </Box>;
    }


}

export default CsvView;

