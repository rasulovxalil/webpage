import React from 'react';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as UploadMS } from './icons/upload.svg'

class FileUploadView extends React.Component {
    boxStyle = {
        'width': '100%',
        'height': '40px',
        'background': '#F8F8FF',
        'border': '1px dashed #E7E9FC',
        'borderRadius': '5px',

        'marginTop': '15px',
        'display': 'flex',
        'flexDirection': 'row',
        'alignItems': 'center',
        'padding': '16px 28px',
        'gap': '10px',
        ...this.props.sx,
    }
    logoStyle = {
        'width': '24px',
    }
    componentDidMount() {

    }



    render() {
        return <Box  style={this.boxStyle} >
            <SvgIcon style={this.logoStyle} viewBox="0 0 24 24">
                <UploadMS />
            </SvgIcon>
            Upload file
        </Box>;
    }


}

export default FileUploadView;

