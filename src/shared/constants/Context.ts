import { AppContextModel, AppStateModel } from '../models';
import { AppView } from '../enums';

export const defaultAppState: AppStateModel = {
    isSideNavOpen: false,
    view: AppView.HOME,
};

export const defaultAppContextState: AppContextModel = {
    contextState: defaultAppState,
    setContextState: () => {},
};
