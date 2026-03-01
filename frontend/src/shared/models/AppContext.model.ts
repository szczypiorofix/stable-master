import { APP_VIEW } from '../enums';

export interface AppStateModel {
    isUserLoggedIn: boolean;
    isSideNavOpen: boolean;
    view: APP_VIEW;
    stableName: string;
    stableAddress: string;
}

export interface AppContextModel {
    contextState: AppStateModel;
    setContextState: (state: AppStateModel) => void;
}
