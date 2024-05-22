import React from 'react';
import Box from '@mui/material/Box';


class SimpleViewer extends React.Component {

    componentDidMount() {
        console.log('SimpleViewer')

    }


    render() {
        return <Box>
            {this.props.txt}
        </Box>;
    }
}

export default SimpleViewer;

