import { JSX } from 'react';
import { Box, Typography } from '@mui/material';

export function Staff(): JSX.Element {
    return (
        <Box pt={2} pb={2}>
            <Typography variant='h4' component={'h2'}>
                This is Staff page
            </Typography>
        </Box>
    );
}
