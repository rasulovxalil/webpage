import React from 'react';
import SignIn from "./SignIn"
import Landing from "./Landing"
import SignUp from "./SignUp"

import ForgotPassword from "./ForgotPassword"
import ForgotPasswordRes from "./ForgotPasswordRes"

import Dashboard from "./Dashboard"
import Conf from "./Conf"


import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as LogoMS } from './icons/logo.svg'
import Container from '@mui/material/Container';
import Loader from "./Loader"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { isMobile } from 'react-device-detect';

import {
  BrowserRouter as Router,
  Routes, Route, Navigate
} from "react-router-dom";

Conf.theme = createTheme()

class App extends React.Component {

  logoStyle = {
    'width': '150px',
  }
  state = {
    updating: true,
    navigatetologin: false
  }

  componentWillMount() {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      Conf.mainUrl = "http://localhost:8001/api/"
    }
  }

  componentDidMount() {

    Conf.isMobile = isMobile

    var session = Conf.getSession()
    console.log(session)
    if (session == null) {
      this.setState({ updating: false })
    } else {
      Conf.postData(Conf.mainUrl + 'update', session).then((data) => {
        if (data.error) {
          Conf.logout()
          this.setState({
            updating: false,
            navigatetologin: true
          })

          return
        } else {
          Conf.saveSession(data)
          this.setState({ updating: false })
          
        }
      }).catch((error) => {
        Conf.logout()
        console.error('Error:', error);
        this.setState({ updating: false })
      });
    }
  }


  

  render() {

    if (this.state.updating) {
      return <ThemeProvider theme={Conf.theme}>
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
            <Box sx={{ m: 1 }}>
              <Loader />
            </Box>

          </Box>
        </Container>
      </ThemeProvider>
    } else {
      return <div id="app" style={{ padding: 0, margin: 0 }}>
        <Router>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/forgotpasswordres' element={<ForgotPasswordRes />} />

          </Routes>
        </Router>
      </div>
    }
  }


}
export default (App);
