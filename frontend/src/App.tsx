import { JSX } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { ViewPort } from './components/viewport/ViewPort.tsx';
import { AppContextProvider } from './context/AppContext.provider.tsx';
import defaultTheme from './theme.ts';

function App(): JSX.Element {
    return (
        <AppContextProvider>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <ViewPort />
            </ThemeProvider>
        </AppContextProvider>
    );
}

export default App;
