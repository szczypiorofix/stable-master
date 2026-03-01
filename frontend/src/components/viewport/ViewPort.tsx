import { JSX } from 'react';
import { Box, Container } from '@mui/material';

import { useGlobalAppContext } from '../../context/AppContext.tsx';
import { Login } from '../../pages';
import { APP_VIEW } from '../../shared/enums';
import { getRoute } from '../../shared/helpers';
import { Footer } from '../footer/Footer.tsx';
import { SideNav } from '../sidenav/SideNav.tsx';
import { ToolBar } from '../toolbar/ToolBar.tsx';

export function ViewPort(): JSX.Element {
    const { contextState } = useGlobalAppContext();
    const resolveView = (view: APP_VIEW) => {
        return getRoute(view).page;
    };

    const isAuthenticated: boolean = !!localStorage.getItem('jwt_token');

    if (!isAuthenticated) {
        return <Login />;
    }

    return (
        <Box>
            <ToolBar />
            <SideNav />
            <Container maxWidth='lg'>{resolveView(contextState.view)}</Container>
            <Footer />
        </Box>
    );
}
