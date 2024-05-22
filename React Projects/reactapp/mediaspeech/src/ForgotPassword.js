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

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withRouter } from './withRouter';
import Conf from "./Conf"


class ForgotPassword extends React.Component {

    theme = createTheme()

    state = {
        email: '',
        loginError: false,
        errorText: '',
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


    handleSubmit(e) {
        if (!Conf.validateEmail(this.state.email)) {
            this.showError("Invalid Email")
            return
        }


        Conf.postData(Conf.mainUrl + 'forgotpassword',
            {
                email: this.state.email
            }).then((data) => {
                console.log(data);
            }).catch((error) => {
                console.error('Error:', error);
                this.showError(Conf.loginSystemError)
            });
    }






    handleTextFieldChange(e) {
        switch (e.target.name) {
            case 'email':
                this.setState({
                    email: e.target.value
                })
                break;

            default:
                break;
        }
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
                        Forgot Password
                    </Typography>
                    <Typography variant="body2" style={this.state.loginError ? this.errorStyle : this.errorStyleHide} align="center" >
                        {this.state.errorText}
                    </Typography>

                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Enter Email"
                            type="text"
                            name="email"
                            value={this.state.invite_token}
                            onChange={this.handleTextFieldChange.bind(this)}
                            autoFocus
                        />
                        <Button
                            onClick={this.handleSubmit.bind(this)}
                            fullWidth
                            variant="contained"
                            style={this.buttonStyle}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send Email
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

        </ThemeProvider>;
    }


}

export default withRouter(ForgotPassword);

