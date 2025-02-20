import { JSX } from 'react';
import {
    Box,
    Card,
    CardActionArea,
    CardMedia,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { GlobalContext } from '../../context/AppContext.ts';
import stableMasterLogo from '/stablemaster.png';

export function SideNav(): JSX.Element {
    const { contextState, setContextState } = GlobalContext();

    const toggleDrawer = (isOpen: boolean) => () => {
        setContextState({
            isSideNavOpen: isOpen,
        });
    };

    const DrawerList = (
        <Box
            sx={{ width: 260 }}
            role='presentation'
            onClick={toggleDrawer(false)}
        >
            <Card sx={{ maxWidth: 260 }}>
                <CardActionArea>
                    <CardMedia
                        component='img'
                        height='194'
                        image={stableMasterLogo}
                        alt='Stable Master logo'
                    />
                </CardActionArea>
            </Card>
            <Box sx={{ width: 260 }}></Box>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                    (text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    )
                )}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <div>
            <Drawer
                open={contextState.isSideNavOpen}
                onClose={toggleDrawer(false)}
            >
                {DrawerList}
            </Drawer>
        </div>
    );
}
