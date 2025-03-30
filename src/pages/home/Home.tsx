import { JSX } from 'react';

import { ContactSupport } from '@mui/icons-material';
import {
    Box,
    Card,
    CardMedia,
    List,
    ListItem,
    ListItemIcon,
    Paper,
    Typography,
} from '@mui/material';
import CardContent from '@mui/material/CardContent';

import { stables } from '../../../mock';

export function Home(): JSX.Element {
    const stable = stables[0]; // Assuming you want to display the first stable

    return (
        <Box pt={2}>
            <Paper elevation={1}>
                <Card sx={{ padding: 1 }}>
                    <CardMedia
                        component='img'
                        height='340'
                        image={stable.logo}
                        alt={stable.name}
                    />
                    <CardContent>
                        <Typography variant='h5' component='div'>
                            {stable.name}
                        </Typography>
                        <Typography gutterBottom variant='body1'>
                            {stable.address}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexOrientation: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}
                        >
                            <ListItemIcon>
                                <ContactSupport />
                            </ListItemIcon>
                            <Typography gutterBottom variant='body2'>
                                Contact
                            </Typography>
                            <List
                                sx={{
                                    bgcolor: 'background.paper',
                                    display: 'flex',
                                    flexOrientation: 'row',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                {[
                                    stable.website,
                                    stable.email,
                                    stable.phone,
                                ].map((detail, index) => {
                                    return (
                                        <ListItem
                                            key={'stable_' + index}
                                            sx={{ width: 'fit-content' }}
                                        >
                                            <Typography
                                                gutterBottom
                                                variant='body1'
                                            >
                                                {detail}
                                            </Typography>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Box>

                        <Typography variant='body2' color='text.secondary'>
                            {stable.description}
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        </Box>
    );
}
