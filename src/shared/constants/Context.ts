import { APP_VIEW } from '../enums';
import { AppContextModel, AppStateModel } from '../models';

export const defaultAppState: AppStateModel = {
    isSideNavOpen: false,
    view: APP_VIEW.HOME,
    stableAddress: '',
    stableName: '',
};

export const defaultAppContextState: AppContextModel = {
    contextState: defaultAppState,
    setContextState: () => {},
};
