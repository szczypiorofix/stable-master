import { JSX, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

import { Horse } from '../../@types';
import { HorseCard } from '../../components/card/HorseCard.tsx';
import { HorseDetailsDialog } from '../../components/dialog/HorseDetailsDialog.tsx';
import { DATA_SOURCE, getEnvironmentDetails } from '../../config/Environment.config.ts';

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

    const apiUrl = getEnvironmentDetails(DATA_SOURCE.LOCALHOST).url;

    const fetchHorses = async () => {
        try {
            const response = await fetch(`${apiUrl}/horse`);
            if (!response.ok) {
                throw new Error('Can not find horses');
            }
            const data: Horse[] = (await response.json()) as Horse[];
            setHorses(data);
        } catch (error) {
            console.error('Fetch horses error:', error);
        }
    };

    const handleAddHorse = (horse: Horse | null) => {
        addHorseToDatabase(horse)
            .then((resp) => console.log(resp))
            .catch((err) => console.error(err));
    };

    const handleCloseDialog = () => {
        setAddHorse(false);
        fetchHorses()
            .then(() => console.log('Horses fetched'))
            .catch((err) => console.error(err));
    };

    const addHorseToDatabase = async (horse: Horse | null) => {
        console.log('New horse... ', horse);
        if (!horse) {
            handleCloseDialog();
            return;
        }

        console.log('Adding horse to database...');

        try {
            const response = await fetch(`${apiUrl}/horse`, {
                method: 'POST',
                body: JSON.stringify(horse),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Cannot add horse to database');
            }
            await response.json();
        } catch (error) {
            console.error('Cannot add horse to database:', error);
        } finally {
            handleCloseDialog();
        }
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
                            <HorseCard horse={value} />
                        </Item>
                    );
                })}
            </Stack>
            <Box pt={2} pb={2} display={'flex'} justifyContent={'flex-end'}>
                <Tooltip title='Add horse' arrow>
                    <Fab color='primary' aria-label='add' /* onClick={() => setAddHorse(true)} */>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Box>
        </Box>
    );
}
