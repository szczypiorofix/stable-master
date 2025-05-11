import {JSX, useState} from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

import { horses } from '../../../mock';
import { HorseCard } from '../../components/card/HorseCard.tsx';
import { HorseDetailsDialog } from "../../components/dialog/HorseDetailsDialog.tsx";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

export function Horses(): JSX.Element {
    const [addHorse, setAddHorse] = useState(false);

    return (
        <Box>
            {addHorse && <HorseDetailsDialog
                open={addHorse}
                onClose={() => setAddHorse(false)}
            />}
            <Stack
                direction='row'
                spacing={5}
                mt={2}
                justifyContent={'space-between'}
            >
                {horses.map((value, index) => {
                    return (
                        <Item key={'horse_' + index}>
                            <HorseCard horse={value} />
                        </Item>
                    );
                })}
            </Stack>
            <Box pt={2} pb={2} display={'flex'} justifyContent={'flex-end'}>
                <Tooltip title='Add horse' arrow>
                    <Fab color='primary' aria-label='add' onClick={() => setAddHorse(true)}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Box>
        </Box>
    );
}
