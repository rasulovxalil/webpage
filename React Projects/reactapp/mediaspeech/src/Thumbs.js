import React from 'react';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';

import { ReactComponent as CreditsMS } from './icons/credits.svg'
import { ReactComponent as ProcessedMS } from './icons/processed.svg'
import { ReactComponent as ActiveMS } from './icons/active.svg'
import Conf from "./Conf"

class Thumbs extends React.Component {

  state = {
    credits: "",
    finished: "",
    active: ""
  }

  componentDidMount() {
    var session = Conf.getSession()
    if (session != null) {
      this.updateJobs() 
    }
  }

  updateJobs() {
    Conf.postData(Conf.mainUrl + 'getjobs',
      {
        jwttoken: Conf.session.jwt,
      }).then((data) => {
        if (data.status) {
          this.setState(data.jobStatus)
          if (data.jobStatus.active > 0) {
            setTimeout(() => {
              this.updateJobs()
            }, 3000);
          }
        }
      }).catch((error) => {
        console.error('Error:', error);

      });
  }

  render() {
    return <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: { xs: "column", md: "row"}, 
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box style={this.boxStyle} sx={{ m: 1, width: { xs: "100%", md: "32%"} }}>
        <Grid container spacing={1} >
          <Grid item xs={2}>
            <SvgIcon style={this.iconStyle} viewBox="0 0 44 44">
              <CreditsMS />
            </SvgIcon>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: "center" }}>
            <Tooltip title="Total amount of credits available">
              <Typography style={this.headerStyle} sx={{ lineHeight: { xs: "0px", md: "46px"} }} component="span">
                Credits Remaining
              </Typography>
            </Tooltip>

          </Grid>
          <Grid item xs={5} sx={{ textAlign: "center" }}>
            <Typography style={this.valStyle} component="span">
              {this.state.credits}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box style={this.boxStyle} sx={{ m: 1, width: { xs: "100%", md: "32%"} }}>
        <Grid container spacing={1} >
          <Grid item xs={2}>
            <SvgIcon style={this.iconStyle} viewBox="0 0 44 44">
              <ProcessedMS />
            </SvgIcon>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: "center" }}>
            <Tooltip title="Total amount of completed jobs">
              <Typography style={this.headerStyle} sx={{ lineHeight: "46px" }} component="span">
                Jobs Processed
              </Typography>
            </Tooltip>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: "center" }}>
            <Typography style={this.valStyle} component="span">
              {this.state.finished}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box style={this.boxStyle} sx={{ m: 1, width: { xs: "100%", md: "32%"} }}>
        <Grid container spacing={1} >
          <Grid item xs={2}>
            <SvgIcon style={this.iconStyle} viewBox="0 0 44 44">
              <ActiveMS />
            </SvgIcon>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: "center" }}>
            <Tooltip title="Total amount of jobs in progress">
              <Typography style={this.headerStyle}  sx={{ lineHeight: "46px" }} component="span">
                Active Jobs
              </Typography>
            </Tooltip>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: "center" }}>
            <Typography style={this.valStyle} component="span">
              {this.state.active}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>;
  }
  boxStyle = {
    'background': '#FFFFFF',
    'border': '1px solid #F8F8FF',
    'boxShadow': '0px 8px 16px rgba(37, 23, 75, 0.05)',
    'borderRadius': '10px',
    'alignItems': 'center',
    'padding': '16px 28px',
    'gap': '40px',
  }
  iconStyle = {
    'width': '44px',
    'height': '44px',
  }

  headerStyle = {
    'fontSize': '0.9rem',
    'fontStyle': 'normal',
    'fontWeight': '600',
    'color': '#13165C',
  }
  bodyStyle = {
    'fontSize': '0.8rem',
    'fontStyle': 'normal',
    'fontWeight': '400',
    'color': '#13165C'
  }
  valStyle = {
    'fontSize': '2rem',
    'fontStyle': 'normal',
    'fontWeight': '600',
    'color': '#13165C'
  }

}

export default Thumbs;

