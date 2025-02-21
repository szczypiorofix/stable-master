import { JSX } from 'react';
import { Box, List, ListItem } from '@mui/material';
import { HorseCard } from '../../components/card/HorseCard.tsx';
import { horses } from '../../mock-data';

export function Horses(): JSX.Element {
    return (
        <Box>
            <List
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    bgcolor: 'background.paper',
                    display: 'flex',
                    flexOrientation: 'row',
                }}
            >
                {horses.map((value, index) => {
                    return (
                        <ListItem key={'horse_' + index}>
                            <HorseCard horse={value} />
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
}
