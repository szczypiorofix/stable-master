import { JSX } from 'react';
import { Box, Typography } from '@mui/material';

export function MainSettingsTab(): JSX.Element {
    return (
        <Box sx={{ pt: 2, pb: 2 }}>
            <Typography variant='h4' component='h2'>
                Main settings
            </Typography>
        </Box>
    );
}
