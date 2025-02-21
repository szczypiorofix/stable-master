import { JSX } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import { useGlobalAppContext } from '../../context/AppContext.tsx';

export function ToolBar(): JSX.Element {
    const { contextState, setContextState } = useGlobalAppContext();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{ mr: 2 }}
                        onClick={() => {
                            setContextState({
                                ...contextState,
                                isSideNavOpen: true,
                            });
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                    >
                        Stable Master
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
