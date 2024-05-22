import React from 'react';
import Box from '@mui/material/Box';

class DiarizationMessage extends React.Component {

    messages = []
    palette = ["#d9ed92", "#b5e48c", "#99d98c", "#76c893", "#52b69a", "#34a0a4", "#168aad", "#1a759f", "#1e6091", "#184e77"]


    render() {
        //text-align: right;
        var align = 'left'
        if(this.props.message.speaker%2 === 1){
            align = 'right'
        }
        return <Box style={this.mainBoxStyle} sx={{ textAlign: align }}>
            <Box style={this.headerStyle} >
                Speaker {this.props.message.speaker + 1}(00:00 - 00:10)
            </Box>
            <Box style={this.messageBoxStyle} sx={{ background: this.palette[this.props.message.speaker] }}>
                {this.props.message.txt}
            </Box>
        </Box>;
    }

    mainBoxStyle = {
        width: '100%'
    }

    headerStyle = {
        fontSize: '0.7rem',
        fontStyle: 'normal',
        color: '#13165C',
        marginLeft: '10px'
    }



    messageBoxStyle = {
        border: '1px solid #F8F8FF',
        borderRadius: '10px',
        padding: '16px 28px',
        marginBottom: "10px",
        display: 'inline-block'
    }

}

export default DiarizationMessage;

