import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as LogoMS } from './icons/logo.svg'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withRouter } from './withRouter';
import Conf from "./Conf"
import validator from 'validator'


class SignUp extends React.Component {

    theme = createTheme()

    state = {
        invite_token: '',
        password: '',
        password2: '',
        loginError: false,
        errorText: '',
        opendialog: false
    }


    logoStyle = {
        'width': '150px',
    }

    buttonStyle = {
        'background': '#141645',
    }
    errorStyleHide = {
        'opacity': '0',
        'transition': 'all 0.3s ease-out'
    }
    errorStyle = {
        'color': '#ff0000',
        'transition': 'all 0.3s ease-out'
    }

    componentDidMount() {
        var url = new URL(window.location.href);
        var invite_token = url.searchParams.get("invite_token");
        if (invite_token != null && invite_token.length > 0) {
            this.setState({
                invite_token: invite_token
            })
            Conf.postData(Conf.mainUrl + 'invitetoken',
                {
                    invite_token: invite_token
                }).then((data) => {
                    console.log(data);
                    if (!data.status) {
                        this.showError(Conf.tokenError)
                    }

                }).catch((error) => {
                    console.error('Error:', error);
                    this.showError(Conf.tokenSystemError)
                });
        }
        this.showError(Conf.passwordMessage)

    }

    handleSubmit(e) {
        console.log("handleSubmit ", this.state)
        if (this.state.invite_token == null) {
            this.showError(Conf.emptyToken)
            return
        }
        if (this.state.invite_token.length == 0) {
            this.showError(Conf.emptyToken)
            return
        }

        if (this.state.password != this.state.password2) {
            this.showError(Conf.passwordNotMatch)
            return
        }

        if (!validator.isStrongPassword(this.state.password, {
            minLength: 8, minNumbers: 1, minSymbols: 1
        })) {
            this.showError(Conf.passwordMessage)
            return
        }



        Conf.postData(Conf.mainUrl + 'signup',
            {
                invite_token: this.state.invite_token,
                password: this.state.password,
                password2: this.state.password2
            }).then((data) => {
                console.log(data);
                if (data.error_code == 1) {
                    this.showError(Conf.tokenError)
                    return
                }
                if (data.error_code == 2) {
                    this.showError(Conf.passwordNotMatch)
                    return
                }
                if (data.error_code == 2) {
                    this.showError(Conf.passwordMessage)
                    return
                }

                if (data.status) {
                    this.setState({
                        opendialog: true
                    })
                    setTimeout(() => {
                        this.props.navigate("/login");
                    }, 3000);
                } else {
                    this.showError(Conf.regError)
                    return
                }

            }).catch((error) => {
                console.error('Error:', error);
                this.showError(Conf.loginSystemError)
            });
    }






    handleTextFieldChange(e) {
        switch (e.target.name) {
            case 'invite_token':
                this.setState({
                    invite_token: e.target.value
                })
                break;
            case 'password':
                this.setState({
                    password: e.target.value
                })
                break;
            case 'password2':
                this.setState({
                    password2: e.target.value
                })
                break;
            default:
                break;
        }
    }
    handleSnackClose() {
        this.setState({
            opendialog: false
        })
    }
    showError(txt) {
        this.setState({
            loginError: true,
            errorText: txt
        })
        setTimeout(() => {
            this.setState({
                loginError: false,
                errorText: txt
            })
        }, 2000);
    }


    render() {
        return <ThemeProvider theme={this.theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ m: 1 }}>
                    <Link color="inherit" href="https://MediaSpeech.ai/">
                            <SvgIcon style={this.logoStyle} viewBox="0 0 592 78">
                                <LogoMS />
                            </SvgIcon>
                        </Link>
                    </Box>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Typography variant="body2" style={this.state.loginError ? this.errorStyle : this.errorStyleHide} align="center" >
                        {this.state.errorText}
                    </Typography>

                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="invite_token"
                            label="Invite Token"
                            type="text"
                            name="invite_token"
                            value={this.state.invite_token}
                            onChange={this.handleTextFieldChange.bind(this)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.handleTextFieldChange.bind(this)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="Repeate Password"
                            type="password"
                            id="password2"
                            value={this.state.password2}
                            onChange={this.handleTextFieldChange.bind(this)}
                        />
                        <Button
                            onClick={this.handleSubmit.bind(this)}
                            fullWidth
                            variant="contained"
                            style={this.buttonStyle}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
                <Typography sx={{ mt: 8, mb: 4 }} variant="body2" color="text.secondary" align="center" >
                    {'Copyright © '}
                    <Link color="inherit" href="https://MediaSpeech.ai/">
                        MediaSpeech
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
            <Snackbar open={this.state.opendialog} autoHideDuration={8000} onClose={this.handleSnackClose.bind(this)}>
                    <Alert
                        onClose={this.handleSnackClose.bind(this)}
                        severity='success' sx={{ width: '100%' }}>
                        {Conf.regSucc}
                    </Alert>
                </Snackbar>

        </ThemeProvider>;
    }


}

export default withRouter(SignUp);

