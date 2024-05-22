import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import Grid from '@mui/material/Grid';
import { ReactComponent as LogoMS } from './icons/logo.svg'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withRouter } from './withRouter';
import Conf from "./Conf"



class SignIn extends React.Component {

  theme = createTheme()

  state = {
    email: '',
    password: '',
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

  componentDidMount() {
  }

  handleSubmit(e) {
    console.log("handleSubmit " + this.state.email)

    Conf.postData(Conf.mainUrl + 'login',
      {
        email: this.state.email,
        password: this.state.password
      }).then((data) => {
        console.log(data);
        if (data.error) {
          this.showError(Conf.loginError)
        } else {
          Conf.saveSession(data)
          this.props.navigate("/dashboard");
        }
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
      case 'password':
        this.setState({
          password: e.target.value
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
    }, 1000);
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
            Sign in
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
              label="Email Address"
              name="email"
              autoComplete="email"
              value={this.state.email}
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
              autoComplete="current-password"
            />
            <Button
              onClick={this.handleSubmit.bind(this)}
              fullWidth
              variant="contained"
              style={this.buttonStyle}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Grid container spacing={1} sx={{ flexDirection: { xs: "column", md: "row" } }}>
          <Grid item xs={12} md={6} >
            <Typography variant="body2" color="text.secondary" align="center" >
              <Link color="inherit" href="/signup">
                Sign Up
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} >
            <Typography variant="body2" color="text.secondary" align="center" >
              <Link color="inherit" href="/forgotpassword">
                Forgot Password?
              </Link>
            </Typography>
          </Grid>
        </Grid>





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

export default withRouter(SignIn);

