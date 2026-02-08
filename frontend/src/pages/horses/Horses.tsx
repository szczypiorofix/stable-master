import { JSX, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

import { Horse } from '../../@types';
import { HorseCard } from '../../components/card/HorseCard.tsx';
import { getBaseUrl } from '../../config/Environment.config.ts';

import { HorseDetailsDialog } from './HorseDetailsDialog.tsx';

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
    const [horses, setHorses] = useState<Horse[]>([]);

    const apiUrl = getBaseUrl();

    const fetchHorses = async () => {
        try {
            const response = await fetch(`${apiUrl}/horse`);
            if (!response.ok) {
                throw new Error('Cannot find horses. Response error.');
            }
            const data: Horse[] = (await response.json()) as Horse[];
            setHorses(data);
        } catch (error) {
            console.error('Response error: ', error);
        }
    };

    const handleAddHorse = () => {
        handleCloseDialog();
    };

    const handleCloseDialog = () => {
        setAddHorse(false);
        fetchHorses()
            .then(() => console.log('Horses fetched'))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        console.log('Reading horses...');
        fetchHorses()
            .then(() => console.log('Horse fetch end.'))
            .catch((err) => console.error(err));
    }, []);

    return (
        <Box>
            {addHorse && <HorseDetailsDialog open={addHorse} onClose={handleAddHorse} />}
            <Stack direction='row' spacing={5} mt={2} justifyContent={'space-between'}>
                {horses.map((value, index) => {
                    return (
                        <Item key={'horse_' + index}>
                            <HorseCard
                                horse={{
                                    ...value,
                                    avatar: value.avatar
                                        ? `${apiUrl}/${value.avatar}`
                                        : '/src/assets/images/horse_placeholder.jpg', // placeholder
                                }}
                            />
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
