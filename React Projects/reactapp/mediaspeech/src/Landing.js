import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withRouter } from './withRouter';
import LandingMenu from "./landing/LandingMenu";
import LandingUpBlock from "./landing/LandingUpBlock";
import LandingCenterBlock from "./landing/LandingCenterBlock";
import LandingCenterText from "./landing/LandingCenterText";
import LandingDownBlocks from "./landing/LandingDownBlocks";
import LandingPartners from "./landing/LandingPartners";
import LandingFooter from "./landing/LandingFooter";

class Landing extends React.Component {

  theme = createTheme()

  state = {
    email: '',
    password: '',
    loginError: false,
    errorText: '',
  }


  componentDidMount() {
  }




  render() {
    return <ThemeProvider theme={this.theme}>
      <CssBaseline />
      <Container>
        <LandingMenu />
        <Box sx={{
              width: '100%',
              height:'5px',
              boxShadow: "0 4px 5px -2px gray"
            }}></Box>
            <LandingUpBlock />
            <LandingCenterBlock />
            <LandingCenterText />
            <LandingDownBlocks />
            <LandingPartners />
            <LandingFooter />
      </Container>
    </ThemeProvider>
  }


}

export default withRouter(Landing);

