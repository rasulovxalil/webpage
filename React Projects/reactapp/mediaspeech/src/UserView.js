import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';



import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Conf from "./Conf"


class UserView extends React.Component {
    state = {
        opendelete: false,
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

    deleteUser() {
        this.setState({ opendelete: true })
    }

    handleCancel() {
        this.setState({ opendelete: false })
    }

    handleDelete() {
        Conf.postData(Conf.mainUrl + 'deleteuser',
            {
                jwttoken: Conf.session.jwt,
                userid: this.props.user.id
            }).then((data) => {
                this.setState({ opendelete: false })
                this.props.userDeleted(
                    data.status,
                    this.props.user.email
                )

            }).catch((error) => {
                console.error('Error:', error);
            });

    }


    render() {
        return <Box style={this.boxStyle}>
            <Grid container spacing={1} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                <Grid item xs={12} md={4}>
                    <Typography noWrap style={this.txtSmallStyle} component="span">
                        Email
                    </Typography>
                    <Typography noWrap style={this.txtStyle} component="span">
                        {this.props.user.email}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography noWrap style={this.txtSmallStyle} component="span">
                        Credits Used
                    </Typography>
                    <Typography noWrap style={this.txtStyle} component="span">
                        {this.props.user.credits_used}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button sx={{
                            background: '#e73535',
                            color: '#FFFFFF',
                            "&:hover": {
                                backgroundColor: "#ef6363"
                            },
                            display: this.props.user.isMe ? 'none' : 'flex'
                        }}
                            onClick={this.deleteUser.bind(this)}
                            style={this.statusBoxStyle}>
                            DELETE
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
                maxWidth="xs"
                open={this.state.opendelete}
            >
                <DialogTitle>Delete</DialogTitle>
                <DialogContent dividers>
                    Delete user {this.props.user.email}?
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.handleCancel.bind(this)}>
                        Cancel
                    </Button>
                    <Button onClick={this.handleDelete.bind(this)}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>;
    }

    txtStyle = {
        color: '#313771',
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "block",
    }
    txtSmallStyle = {
        color: '#3b9bb0',
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "block",
        fontSize: "0.7rem"
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

export default UserView;

