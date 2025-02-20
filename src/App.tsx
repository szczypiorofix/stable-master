import { JSX } from 'react';
import { Home } from './pages/Home.tsx';
import { ViewPort } from './components/viewport/ViewPort.tsx';
import AppContextProvider from './context/AppContext.provider.tsx';

function App(): JSX.Element {
    const resolveView = () => {
        return <Home />;
    };

    return (
        <AppContextProvider>
            <ViewPort>{resolveView()}</ViewPort>
        </AppContextProvider>
    );
}

export default App;
