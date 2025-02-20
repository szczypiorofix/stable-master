import { FC, ReactNode, useState } from 'react';
import { IAppState } from '../shared/models';
import { defaultAppState } from './AppContext.default.ts';
import { AppContext } from './AppContext.ts';

const AppContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<IAppState>(defaultAppState);
    return (
        <AppContext.Provider
            value={{ contextState: state, setContextState: setState }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
