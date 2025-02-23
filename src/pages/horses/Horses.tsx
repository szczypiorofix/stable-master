import { JSX } from 'react';

import { Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import { HorseCard } from '../../components/card/HorseCard.tsx';
import { horses } from '../../mock-data';

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
    return (
        <Stack direction='row' spacing={5} mt={2}>
            {horses.map((value, index) => {
                return (
                    <Item key={'horse_' + index}>
                        <HorseCard horse={value} />
                    </Item>
                );
            })}
        </Stack>
    );
}
