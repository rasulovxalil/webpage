import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

class DiarizationMessageV2 extends React.Component {

    messages = []


    render() {
        return <Box style={this.mainBoxStyle} >
            <Grid container spacing={1}>
                <Grid item xs={1.5}>
                    <Box style={this.headerStyle} >
                        {this.props.message.speaker}<br />{this.props.message.start}<br />{this.props.message.end}
                    </Box>
                </Grid>
                <Grid item xs={10.5} >
                    <Box style={this.messageBoxStyle} >
                        {this.props.message.txt}
                    </Box>
                </Grid>
            </Grid>
        </Box>;
    }

    mainBoxStyle = {
        width: '100%'
    }

    headerStyle = {
        fontSize: '0.7rem',
        fontStyle: 'normal',
        color: '#13165C',
        textAlign: "right",
        display: 'flex',
        alignItems: 'center',
        height: '100%'
    }



    messageBoxStyle = {
        border: '1px solid #F8F8FF',
        borderRadius: '10px',
        padding: '16px 28px',
        marginBottom: "10px",
        background: '#f7f7f7'
    }

}

export default DiarizationMessageV2;

