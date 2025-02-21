import { createContext, useContext } from 'react';

import { AppContextModel } from '../shared/models';
import { defaultAppContextState } from '../shared/constants';

export const AppContext = createContext<AppContextModel>(
    defaultAppContextState
);

export const useGlobalAppContext = () => useContext(AppContext);
