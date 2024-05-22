import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { FileUploader } from "react-drag-drop-files";
import FileUploadView from './FileUploadView';
import AudioRecorder from './AudioRecorder';
import uuid from 'react-uuid';
import LinkItem from './LinkItem';
import Conf from './Conf';
import axios from "axios";


class NewJob extends React.Component {

    state = {
        txtLabel: "Enter URL",
        txtError: false,
        txtLink: "",
        links: [],
        files: [],
        audios: [],
        col1: [],
        col2: [],
        timestamps: false,
        diarization: false,
        txt1: "New Job",
        txt2: "Use any media for transcription",
        txtColor: "#13165C",
        uploading: false
    }

    uploadLinkIndex = 0
    uploadFileIndex = 0
    uploadAudioIndex = 0
    currentJobID = ""


    componentDidMount() {

    }

    updateView() {
        var links = this.state.links
        var files = this.state.files
        var audios = this.state.audios
        var jobitems = [...links, ...files, ...audios]
        var col1 = []
        var col2 = []
        for (let i = 0; i < jobitems.length; i++) {
            if (i % 2 === 0) {
                col1.push(jobitems[i])
            } else {
                col2.push(jobitems[i])
            }
        }
        this.setState({
            col1: col1,
            col2: col2
        })
    }

    handleTranscribe() {

        console.log(`files ${this.state.files.length}`)
        console.log(`links ${this.state.links.length}`)
        console.log(`audios ${this.state.audios.length}`)
        console.log("diarization " + this.state.diarization)
        console.log("timestamps " + this.state.timestamps)

        if (this.state.files.length === 0 && this.state.links.length === 0 && this.state.audios.length === 0) {
            this.showError(this.texts.txt1Empty, this.texts.txt2Empty)
            return
        }

        this.setState({
            txt1: this.texts.txt1Processing,
            txt2: this.texts.txt2Processing,
            uploading: true
        })

        this.currentJobID = "" + Date.now()
        this.uploadNextLink()


    }

    showError(header, text) {
        //txtColor "#13165C"
        this.setState({
            txt1: header,
            txt2: text,
            txtColor:"#ff0000"
        })

        setTimeout(() => {
            this.setState({
                txt1: this.texts.txt1,
                txt2: this.texts.txt2,
                txtColor:"#13165C"
            })
        }, 4000);
    }

    uploadNextLink() {
        console.log("uploadNextLink call " + this.uploadLinkIndex + " " + this.state.links.length)

        if (this.uploadLinkIndex < this.state.links.length) {
            this.updateLinkState(this.uploadLinkIndex, LinkItem.UPLOADING)
            var session = Conf.getSession()
            Conf.postData(Conf.mainUrl + 'uploadlink',
                {
                    jobid: this.currentJobID,
                    link: this.state.links[this.uploadLinkIndex].link,
                    jwttoken: session.jwt
                }).then((data) => {
                    console.log(data);
                    if (!data.status) {
                        this.updateLinkState(this.uploadLinkIndex, LinkItem.ERROR)
                    } else {
                        this.updateLinkState(this.uploadLinkIndex, LinkItem.UPLOADED)
                        this.uploadLinkIndex++
                        this.uploadNextLink()
                    }
                }).catch((error) => {
                    this.updateLinkState(this.uploadLinkIndex, LinkItem.ERROR)
                });
        } else {
            this.uploadNextFile()
        }
    }

    uploadNextFile() {
        var session = Conf.getSession()
        console.log("uploadNextFile call " + this.uploadFileIndex + " " + this.state.files.length)
        if (this.uploadFileIndex < this.state.files.length) {
            const axiosInstance = axios.create({
                baseURL: Conf.mainUrl,
            });

            this.updateFileState(this.uploadFileIndex, LinkItem.UPLOADING, 0)
            let formData = new FormData();

            formData.append("jobid", this.currentJobID);
            formData.append("jwttoken", session.jwt);
            formData.append("name", this.state.files[this.uploadFileIndex].name);
            formData.append("file", this.state.files[this.uploadFileIndex].file);

            axiosInstance
                .post("/uploadfile", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (data) => {
                        //Set the progress value to show the progress bar
                        var progress = Math.round((100 * data.loaded) / data.total)
                        console.log(progress)
                        this.updateFileState(this.uploadFileIndex, LinkItem.UPLOADING, progress)
                    },
                }).then((response) => {
                    console.log(response);
                    if (response.data.status) {
                        this.updateFileState(this.uploadFileIndex, LinkItem.UPLOADED, 0)
                        this.uploadFileIndex++
                        this.uploadNextFile()
                    } else {
                        this.updateFileState(this.uploadFileIndex, LinkItem.ERROR, 0)
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        } else {
            this.uploadNextAudio()
        }
    }


    uploadNextAudio() {
        var session = Conf.getSession()
        console.log("uploadNextAudio call " + this.uploadAudioIndex + " " + this.state.audios.length)
        if (this.uploadAudioIndex < this.state.audios.length) {
            const axiosInstance = axios.create({
                baseURL: Conf.mainUrl,
            });

            this.updateAudioState(this.uploadAudioIndex, LinkItem.UPLOADING, 0)
            let formData = new FormData();

            formData.append("jobid", this.currentJobID);
            formData.append("jwttoken", session.jwt);
            formData.append("name", this.state.audios[this.uploadAudioIndex].name + ".mp3");
            formData.append("file", this.state.audios[this.uploadAudioIndex].audio);

            axiosInstance
                .post("/uploadfile", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (data) => {
                        //Set the progress value to show the progress bar
                        var progress = Math.round((100 * data.loaded) / data.total)
                        console.log(progress)
                        this.updateAudioState(this.uploadAudioIndex, LinkItem.UPLOADING, progress)
                    },
                }).then((response) => {
                    console.log(response);
                    if (response.data.status) {
                        this.updateAudioState(this.uploadAudioIndex, LinkItem.UPLOADED, 0)
                        this.uploadAudioIndex++
                        this.uploadNextAudio()
                    } else {
                        this.updateAudioState(this.uploadAudioIndex, LinkItem.ERROR, 0)
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        } else {
            this.finishJob()
        }
    }


    finishJob() {
        var session = Conf.getSession()
        console.log("finishJob call " + this.currentJobID)
        console.log("diarization " + this.state.diarization)
        console.log("timestamps " + this.state.timestamps)


        Conf.postData(Conf.mainUrl + 'finishjob',
            {
                jobid: this.currentJobID,
                jwttoken: session.jwt,
                diarization: this.state.diarization ? 1 : 0,
                timestamps: this.state.timestamps ? 1 : 0
            }).then((data) => {
                console.log(data);
                if (!data.status) {
                    this.showError(this.texts.txt1Error, this.texts.txt2Error)
                } else {
                    this.clearJob()
                }
            }).catch((error) => {
                console.error('Error:', error);
                this.showError(this.texts.txt1Error, this.texts.txt2Error)
            });


    }

    clearJob() {
        this.props.finishHandler()
        this.setState({
            txtLabel: "Enter URL",
            txtError: false,
            txtLink: "",
            links: [],
            files: [],
            audios: [],
            timestamps: false,
            diarization: false,
            txt1: "New Job",
            txt2: "Use any media for transcription",
            col1: [],
            col2: [],
            uploading: false
        })

        this.uploadLinkIndex = 0
        this.uploadFileIndex = 0
        this.uploadAudioIndex = 0
        this.currentJobID = ""
    }

    updateLinkState(index, state) {
        var links = this.state.links
        links[index].stateVal = state
        this.setState({
            links: links
        }, this.updateView.bind(this))
    }

    updateFileState(index, state, percent) {
        var files = this.state.files
        files[index].stateVal = state
        files[index].statePercent = percent
        this.setState({
            files: files
        }, this.updateView.bind(this))
    }

    updateAudioState(index, state, percent) {
        var audios = this.state.audios
        audios[index].stateVal = state
        audios[index].statePercent = percent
        this.setState({
            audios: audios
        }, this.updateView.bind(this))
    }

    handleAudioChange(audio) {
        console.log(audio)
        var audios = this.state.audios
        audios.push({
            name: "Record_" + (audios.length + 1),
            txt: "Record_" + (audios.length),
            audio: audio,
            key: uuid(),
            stateVal: LinkItem.WAITING,
            statePercent: 0
        })
        console.log(audios)
        this.setState({
            audios: audios
        }, this.updateView.bind(this))
    }

    handleFilesChange(filesList) {
        var files = this.state.files
        for (let index = 0; index < filesList.length; index++) {
            const element = filesList[index];

            //element.type

            if (!Conf.isMEdiafile(element.type)) {
                this.showError("Error", `${element.name} is not supported file format. Please upload audio or video`)
            } else {
                files.push({
                    name: element.name,
                    txt: element.name,
                    file: element,
                    key: uuid(),
                    stateVal: LinkItem.WAITING,
                    statePercent: 0
                })
            }

        }
        console.log(files)
        this.setState({
            files: files
        }, this.updateView.bind(this))
    }

    handleLinkChange(event) {
        this.setState({
            txtLabel: "Enter URL",
            txtError: false,
            txtLink: event.target.value
        })

    }

    handleLinkChangeEnd(event) {
        this.processLink(event.target.value)
    }

    keyPress(event) {
        if (event.keyCode === 13) {
            this.processLink(event.target.value)
        }
    }

    itemCancelHandler(id) {
        var files = this.removeItemFromArr(id, this.state.files)
        var links = this.removeItemFromArr(id, this.state.links)
        var audios = this.removeItemFromArr(id, this.state.audios)
        this.setState({
            files: files,
            links: links,
            audios: audios
        }, this.updateView.bind(this))

    }

    removeItemFromArr(id, arr) {
        var newItems = []
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (element.key !== id) {
                newItems.push(element)
            }
        }
        return newItems
    }


    processLink(link) {
        console.log("link:" + link)
        if (link.length === 0) {
            this.setState({
                txtLabel: "Enter URL",
                txtError: false
            })
            return
        }

        if (!Conf.validateUrl(link)) {
            this.setState({
                txtLabel: "Invalid URL",
                txtError: true
            })
            return
        }/**/


        var links = this.state.links
        links.push({
            link: link,
            txt: link,
            key: uuid(),
            stateVal: LinkItem.WAITING,
            statePercent: 0
        })
        this.setState({
            links: links,
            txtLink: ''
        }, this.updateView.bind(this))
    }

    handleCB(evt) {
        switch (evt.target.name) {
            case 'diarization':
                this.setState({
                    diarization: !this.state.diarization
                })
                break;
            case 'timestamps':
                this.setState({
                    timestamps: !this.state.timestamps
                })
                break;
            default:
                break;
        }
    }



    render() {
        return <Box
            sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <Box style={this.boxStyle} sx={{ m: 1 }}>
                <Grid container spacing={1} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Typography style={
                                {
                                    fontSize: '0.9rem',
                                    fontStyle: 'normal',
                                    fontWeight: '600',
                                    color: this.state.txtColor
                                }
                            } component="span">
                                {this.state.txt1}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography style={
                                {
                                    fontSize: '0.8rem',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    color: this.state.txtColor
                                }
                            } component="span">
                                {this.state.txt2}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" justifyContent="flex-end">
                            <FormControlLabel control={<Checkbox name="diarization" onChange={this.handleCB.bind(this)} checked={this.state.diarization} size="small" />} label={<Typography sx={{ fontSize: "0.8rem" }}>Diarization</Typography>} />
                            <FormControlLabel control={<Checkbox name="timestamps" onChange={this.handleCB.bind(this)} checked={this.state.timestamps} size="small" />} label={<Typography sx={{ fontSize: "0.8rem" }}>Timestamps</Typography>} />
                            <Button
                                variant="contained"
                                onClick={this.handleTranscribe.bind(this)}
                                sx={{
                                    boxShadow: 0,
                                    fontSize: { xs: "0.5rem", md: "0.7rem" },
                                    color: '#FFFFFF',
                                    background: '#141645',
                                    borderRadius: '10px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                }}
                            >
                                Transcribe
                            </Button>
                        </Box>

                    </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                    <Grid item xs={12} md={6}>
                        {this.state.col1.map(d => (
                            <LinkItem key={d.key} id={d.key} text={d.txt} stateVal={d.stateVal} statePercent={d.statePercent} cancelHandler={this.itemCancelHandler.bind(this)} />
                        ))}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {this.state.col2.map(d => (
                            <LinkItem key={d.key} id={d.key} text={d.txt} stateVal={d.stateVal} statePercent={d.statePercent} cancelHandler={this.itemCancelHandler.bind(this)} />
                        ))}
                    </Grid>
                </Grid>

                <Grid container spacing={1} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                    <Grid item xs={12} md={5} >
                        <TextField
                            size="small"
                            margin="normal"
                            fullWidth
                            InputProps={{
                                disabled: this.state.uploading,
                            }}

                            value={this.state.txtLink}
                            label={this.state.txtLabel}
                            autoFocus
                            error={this.state.txtError}
                            onChange={this.handleLinkChange.bind(this)}
                            onBlur={this.handleLinkChangeEnd.bind(this)}
                            onKeyDown={this.keyPress.bind(this)}
                        />
                    </Grid>
                    <Grid item xs={12} md={5} >
                        {this.state.uploading ? <FileUploadView
                            sx={{
                                opacity: 0.5
                            }}
                        /> : <FileUploader
                            handleChange={this.handleFilesChange.bind(this)}
                            name="file"
                            label="Upload file"
                            children={<FileUploadView></FileUploadView>}
                            hoverTitle=""
                            multiple={true}
                        />}
                    </Grid>
                    <Grid item xs={12} md={2} >
                        <AudioRecorder
                            errorHandler={this.showError.bind(this)}
                            completeHandler={this.handleAudioChange.bind(this)}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>;
    }
    boxStyle = {
        'width': '100%',
        'background': '#FFFFFF',
        'border': '1px solid #F8F8FF',
        'boxShadow': '0px 8px 16px rgba(37, 23, 75, 0.05)',
        'borderRadius': '10px',
        'display': 'flex',
        'flexDirection': 'column',
        'alignItems': 'left',
        'padding': '16px 28px',
    }


    iconStyle = {
        'width': '44px',
        'height': '44px',
    }
    texts = {
        txt1: "New Job",
        txt2: "Use any media for transcription",
        txt1Processing: "Processing",
        txt2Processing: "Please don't close browser while uploading",
        txt1Empty: "Info",
        txt2Empty: "Please paste link(s) or select file(s)",
        txt1Error: "Error",
        txt2Error: "Error registaring job"
    }


}

export default NewJob;

