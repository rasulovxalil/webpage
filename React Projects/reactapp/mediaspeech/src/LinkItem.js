import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

class LinkItem extends React.Component {
    static WAITING = 0
    static ERROR = 1
    static UPLOADING = 2
    static UPLOADED = 3



    cancelHandler() {
        this.props.cancelHandler(this.props.id)
    }




    getStatusText() {
        switch (this.props.stateVal) {
            case LinkItem.WAITING:
                return 'WAITING'
            case LinkItem.ERROR:
                return 'ERROR'
            case LinkItem.UPLOADING:
                if (this.props.statePercent > 0) {
                    return 'UPLOADING ' + this.props.statePercent + '%'
                } else {
                    return 'UPLOADING'
                }

            case LinkItem.UPLOADED:
                return 'UPLOADED'
            default:
                return 'N/A'
        }
    }

    render() {
        return <Box style={this.boxStyle} >
            <Grid container spacing={1} sx={{ flexDirection: { xs: "column", md: "row"} }}>
                <Grid item xs={12} md={8}>
                    <Typography noWrap style={this.txtStyle} component="span">
                        {this.props.text}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box display="flex" justifyContent={{ xs: "flex-start", md: "flex-end"}}>
                        <Box style={this.statusBoxStyle}>
                            {this.getStatusText()}
                        </Box>
                        <Button
                            variant="contained"
                            disabled={this.props.stateVal > 1}
                            onClick={this.cancelHandler.bind(this)}
                            sx={{
                                boxShadow: 0,
                                fontSize: "0.5rem",
                                color: '#FFFFFF',
                                background: '#D32F2F',
                                minWidth: '50px',
                                borderRadius: '3px',
                                height: '20px',
                                paddingBottom: '3px',
                                padding: '6px 10px'
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>

                </Grid>
            </Grid>
        </Box>;
    }

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
        background: '#0288D1',
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

export default LinkItem;

