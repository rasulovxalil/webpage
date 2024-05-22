import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';

import { ReactComponent as LogoMS } from '../icons/logo.svg'
import { withRouter } from '../withRouter';
import Conf from "../Conf"

class LandingMenu extends React.Component {
    state = {
        session: {
            email: ''
        }
    }
    logoStyle = {
        'width': '150px',
    }

    componentDidMount() {
        var session = Conf.getSession()
        if (session != null) {
            this.setState({
                session: session
            })

        }
    }

    handleGetStarted() {
        this.props.navigate("/login");
    }

    render() {
        return <Box component="div" sx={{ flexGrow: 1}}>
            <Box position="static" >
                <Toolbar variant="dense">
                    <Box flex={1} display="flex" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <SvgIcon style={this.logoStyle} viewBox="0 0 592 78">
                                <LogoMS />
                            </SvgIcon>
                        </Box>
                        <Box display="flex">
                            <Button
                                variant="contained"
                                sx={{
                                    boxShadow: 0,
                                    color: '#ffffff',
                                    background: '#13165C',
                                    borderRadius: '5px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                }}
                                onClick={this.handleGetStarted.bind(this)}
                            >
                                Get started
                            </Button>
                        </Box>
                    </Box>
                </Toolbar>
            </Box>
        </Box>;
    }


}

export default withRouter(LandingMenu);

