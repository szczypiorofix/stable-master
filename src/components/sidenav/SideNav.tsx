import { JSX } from 'react';
import {
    Box,
    Card,
    CardActionArea,
    CardMedia,
    Divider,
    Drawer,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import stableMasterLogo from '/stablemaster.png';
import { getAllRoutesAsList } from '../../shared/helpers';
import { Route } from '../../shared/models';
import { useGlobalAppContext } from '../../context/AppContext.tsx';

export function SideNav(): JSX.Element {
    const { contextState, setContextState } = useGlobalAppContext();

    const toggleDrawer = (isOpen: boolean) => () => {
        setContextState({ ...contextState, isSideNavOpen: isOpen });
    };

    const changeView = (route: Route) => {
        setContextState({
            ...contextState,
            isSideNavOpen: false,
            view: route.view,
        });
    };

    const DrawerList = (
        <Box sx={{ width: 260 }} role='presentation'>
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
            {getAllRoutesAsList().map((route, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemButton
                        selected={route.view === contextState.view}
                        onClick={() => changeView(route)}
                    >
                        <ListItemIcon>{route.icon}</ListItemIcon>
                        <ListItemText primary={route.name} />
                    </ListItemButton>
                </ListItem>
            ))}
            <Divider />
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
