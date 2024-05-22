import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withRouter } from './withRouter';
import Conf from "./Conf"
import Menu from "./Menu"
import Thumbs from "./Thumbs"
import NewJob from "./NewJob"
import ExistingJob from "./ExistingJob"

class Dashboard extends React.Component {
  theme = createTheme()
  state = {
    session: {
      email: ''
    },
    jobs: []
  }

  thumbs = React.createRef();

  componentDidMount() {

    var session = Conf.getSession()
    if (session == null) {
      setTimeout(() => {
        this.props.navigate("/login");
      }, 100);
    } else {
      this.setState({
        session: session
      })
      setInterval(() => {
        this.checkUserValid(session)
      }, 10000);
      this.updateJobs()
    }
  }
  checkUserValid() {
    var session = Conf.getSession()
    Conf.postData(Conf.mainUrl + 'update', session).then((data) => {
      if (data.error) {
        Conf.logout()
        this.props.navigate("/login");
      }
    }).catch((error) => {
      Conf.logout()
      console.error('Error:', error);
      this.setState({ updating: false })
    });
  }

  updateJobs() {
    Conf.postData(Conf.mainUrl + 'getjobs',
      {
        jwttoken: Conf.session.jwt,
      }).then((data) => {
        console.log(data);
        if (data.status) {
          this.setState({
            jobs: data.jobs
          })
        }
      }).catch((error) => {
        console.error('Error:', error);
      });
  }

  handleLogout() {
    Conf.logout()
    this.props.navigate("/");
  }

  newJobFinished() {
    console.log("new job finished")
    this.updateJobs()
    this.thumbs.current.updateJobs()
  }


  render() {
    return <ThemeProvider theme={this.theme}>
      <CssBaseline />
      <Container sx={{ maxWidth: { xl: 1280 } }}>
        <Menu />
        <Thumbs ref={this.thumbs} />

        <NewJob finishHandler={this.newJobFinished.bind(this)} />
        {this.state.jobs.map(d => (
          <ExistingJob key={d.jobid} job={d} />
        ))}
      </Container>
    </ThemeProvider>
  }


}
export default withRouter(Dashboard);
