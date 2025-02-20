import { IAppContext, IAppState } from '../shared/models';

export const defaultAppState: IAppState = {
    isSideNavOpen: false,
};

export const defaultAppContextState: IAppContext = {
    contextState: defaultAppState,
    setContextState: () => {},
};
