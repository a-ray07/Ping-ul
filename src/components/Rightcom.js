import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { alignProperty } from '@mui/material/styles/cssUtils';

const Rightcom = () => {
    return (
        <div>
            <Stack direction="row" spacing={2} paddingLeft={'100px'} paddingTop={'30px'}>
                <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 200, height: 200 }}
                />
            </Stack>

            <h2 style={{ marginTop: '30px' }}>Remy Sharp</h2>
        </div >
    );
};

export default Rightcom;