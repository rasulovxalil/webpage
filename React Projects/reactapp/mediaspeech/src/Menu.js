import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';

import { ReactComponent as LogoMS } from './icons/logo.svg'

import { ReactComponent as LogoutMS } from './icons/logout.svg'
import Typography from '@mui/material/Typography';
import { withRouter } from './withRouter';

import UsersView from "./UsersView"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


import Conf from "./Conf"

class Menu extends React.Component {
    state = {
        session: {
            email: ''
        },
        modalOpen: false,
    }
    logoStyle = {
        'width': '150px',
    }
    logoMobileStyle = {
        'width': '45px',
    }


    componentDidMount() {
        console.log(Conf.theme.breakpoints.down('md'))
        var session = Conf.getSession()
        if (session == null) {
            this.props.navigate("/login");
        } else {
            this.setState({
                session: session
            })
        }
    }

    handleLogout() {
        Conf.logout()
        this.props.navigate("/login");
    }

    handleUsers() {
        this.setState({ modalOpen: true })
    }

    handleClose() {
        this.setState({ modalOpen: false })
    }

    render() {
        return <Box component="nav" sx={{ flexGrow: 1 }}>
            <Box position="static" >
                <Toolbar variant="dense">
                    <Box flex={1} display="flex" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <SvgIcon id="mainIcon" style={this.logoStyle} viewBox="0 0 592 78"><LogoMS /></SvgIcon>
                        </Box>

                        <Box display="flex">
                            <Box sx={{
                                display: { xs: 'none', sm: 'block' },
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                paddingLeft: '10px',
                                paddingRight: '10px',
                                background: '#F4F2FF',
                                borderRadius: '10px',
                                marginRight: '15px'
                            }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={3}>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#13165C' }} align="center" >
                                            Hello!
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="body2" sx={{ color: '#13142F' }} align="center" >
                                            {this.state.session.email}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Button
                                variant="contained"
                                sx={{
                                    display: this.state.session.user_type == 1 ? 'block' : 'none',
                                    boxShadow: 0,
                                    color: '#ffffff',
                                    marginRight: '10px',
                                    background: '#0388d1',
                                    borderRadius: '10px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                }}
                                onClick={this.handleUsers.bind(this)}
                            >
                                Users
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ boxShadow: 0, color: '#13142F', background: '#F9CDCD', borderRadius: '10px', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '10px', paddingRight: '10px', }}
                                startIcon={<LogoutMS />}
                                onClick={this.handleLogout.bind(this)}
                            >
                                Logout
                            </Button>
                        </Box>
                    </Box>
                </Toolbar>
            </Box>
            <Dialog
                maxWidth={'sm'}
                fullWidth={true}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <DialogTitle sx={{ m: 0, p: 2 }} >
                    Users
                </DialogTitle>
                <DialogContent dividers>
                    <UsersView />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.handleClose.bind(this)}>
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>;
    }




}

export default withRouter(Menu);

