import { JSX, PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import { Footer } from '../footer/Footer.tsx';
import { SideNav } from '../sidenav/SideNav.tsx';
import { ToolBar } from '../toolbar/ToolBar.tsx';

export function ViewPort(props: PropsWithChildren): JSX.Element {
    return (
        <Box>
            <ToolBar />
            <SideNav />
            {props.children}
            <Footer />
        </Box>
    );
}
