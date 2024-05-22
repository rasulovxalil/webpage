import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Conf from "./Conf"
import UserView from "./UserView"



class UsersView extends React.Component {
    state = {
        users: [],
        opendialog: false,
        severity: "error",
        dialogmessage: "",
        txtLabel: "Enter Email",
        txtError: false,
        txtEmail: "",
        inviting: false
    }
    userid = null
    componentDidMount() {
        console.log('UsersView')
        var session = Conf.getSession()
        if (session != null) {
            console.log(session)
            this.loadUsers()
        }
    }

    handleSnackClose() {
        this.setState({
            opendialog: false
        })
    }

    userDeleted(status, email) {
        if (status) {
            this.setState({
                opendialog: true,
                severity: 'success',
                dialogmessage: `User ${email} deleted!`
            })
        } else {
            this.setState({
                opendialog: true,
                severity: 'error',
                dialogmessage: `Error deleting ${email}!`
            })
        }
        this.loadUsers()
    }

    loadUsers() {
        Conf.postData(Conf.mainUrl + 'getusers',
            {
                jwttoken: Conf.session.jwt
            }).then((data) => {
                if (data.status) {

                    for (let i = 0; i < data.users.length; i++) {
                        data.users[i].isMe = data.users[i].id == Conf.session.id
                    }
                    console.log(data.users)
                    this.setState({ users: data.users })
                }
            }).catch((error) => {
                console.error('Error:', error);
            });
    }

    addUser() {
        if (!Conf.validateEmail(this.state.txtEmail)) {
            this.setState({
                txtLabel: "Invalid Email",
                txtError: true
            })
            return
        }
        this.setState({
            inviting: true
        })

        Conf.postData(Conf.mainUrl + 'inviteuser',
            {
                jwttoken: Conf.session.jwt,
                email: this.state.txtEmail
            }).then((data) => {
                //data.status
                this.setState({
                    opendialog: true,
                    severity: data.status ? 'success' : 'error',
                    dialogmessage: data.status ? `User ${this.state.txtEmail} Invited!` : `Error inviting ${this.state.txtEmail}!`
                })
                if (data.status) {
                    this.setState({
                        inviting: false,
                        txtEmail: ""
                    })
                } else {
                    this.setState({
                        inviting: false
                    })
                }
            }).catch((error) => {
                console.error('Error:', error);
            });
    }

    handleEmailChange(event) {
        this.setState({
            txtLabel: "Enter Email",
            txtError: false,
            txtEmail: event.target.value
        })
    }

    render() {
        return <Box>
            <Box>
                <Grid container spacing={1} sx={{ flexDirection: { xs: "column", md: "row" }, padding: "10px" }}>
                    <Grid item xs={12} md={10} >
                        <TextField
                            size="small"
                            fullWidth
                            value={this.state.txtEmail}
                            label={this.state.txtLabel}
                            autoFocus
                            error={this.state.txtError}
                            onChange={this.handleEmailChange.bind(this)}
                        />
                    </Grid>
                    <Grid item xs={12} md={2} >
                        <Button
                            variant="contained"
                            disabled={this.state.inviting}
                            sx={{
                                boxShadow: 0,
                                color: '#ffffff',
                                marginLeft: '10px',
                                marginTop: "4px",
                                background: '#0388d1',
                                borderRadius: '10px',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                paddingLeft: '10px',
                                paddingRight: '10px',
                            }}
                            onClick={this.addUser.bind(this)}
                        >
                            Invite
                        </Button>
                    </Grid>
                </Grid>

            </Box>
            <Box style={this.boxStyle}>

                <Grid container spacing={1} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                    <Grid item xs={12}>
                        {this.state.users.map(d => (
                            <UserView key={d.id} userDeleted={this.userDeleted.bind(this)} user={d} />
                        ))}
                    </Grid>
                </Grid>
                <Snackbar open={this.state.opendialog} autoHideDuration={8000} onClose={this.handleSnackClose.bind(this)}>
                    <Alert
                        onClose={this.handleSnackClose.bind(this)}
                        severity={this.state.severity} sx={{ width: '100%' }}>
                        {this.state.dialogmessage}
                    </Alert>
                </Snackbar>

            </Box>

        </Box>;
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
    boxStyle = {
        'width': '100%',
        'marginTop': '5px',
        'display': 'flex',
        'flexDirection': 'row',
        'alignItems': 'center',
        'padding': '10px',
    }
}

export default UsersView;

