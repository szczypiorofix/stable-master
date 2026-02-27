import { JSX } from 'react';
import { Box, Typography } from '@mui/material';

import { SettingsTabs } from './SettingsTabs.tsx';

export function Settings(): JSX.Element {
    return (
        <Box sx={{ pt: 2, pb: 2 }}>
            <Typography variant='h3' component='h1'>
                Settings page
            </Typography>
            <SettingsTabs />
        </Box>
    );
}
