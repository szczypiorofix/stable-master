import { JSX } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Horse } from '../../@types';
import { Box } from '@mui/material';

export function HorseCard(props: { horse: Horse }): JSX.Element {
    return (
        <Card sx={{ width: 345, mt: 1 }}>
            <CardMedia
                sx={{ height: 160 }}
                image={props.horse.avatar}
                title='green iguana'
            />
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    {props.horse.name}
                </Typography>
                <Typography gutterBottom variant='body2'>
                    breed: {props.horse.breed}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Typography gutterBottom variant='body2' pr={1}>
                        sex: {props.horse.sex},
                    </Typography>
                    <Typography gutterBottom variant='body2' pr={1}>
                        age: {props.horse.age}
                    </Typography>
                </Box>

                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    {props.horse.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small'>Details</Button>
                <Button size='small'>Owner</Button>
            </CardActions>
        </Card>
    );
}
