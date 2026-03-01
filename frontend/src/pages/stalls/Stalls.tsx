import { JSX } from 'react';
import { Box, Typography } from '@mui/material';

export function Stalls(): JSX.Element {
    return (
        <Box pt={2} pb={2}>
            <Typography variant='h4' component={'h2'}>
                This is Stalls page
            </Typography>
        </Box>
    );
}
