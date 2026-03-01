import { useEffect } from 'react';
import { Container } from '@mui/material';

import { useGlobalAppContext } from '../../context/AppContext.tsx';

export function Logout() {
    const { contextState, setContextState } = useGlobalAppContext();

    useEffect(() => {
        console.log('User logged out');
        localStorage.removeItem('jwt_token');
        window.location.reload();
        setContextState({
            ...contextState,
            isUserLoggedIn: false,
            isSideNavOpen: false,
        });
    }, []);

    return <Container component='main' maxWidth='xs'></Container>;
}
