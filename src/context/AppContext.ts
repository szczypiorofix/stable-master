import { createContext, useContext } from 'react';
import { IAppContext } from '../shared/models';
import { defaultAppContextState } from './AppContext.default.ts';

export const AppContext = createContext<IAppContext>(defaultAppContextState);

export const GlobalContext = () => useContext(AppContext)!;
