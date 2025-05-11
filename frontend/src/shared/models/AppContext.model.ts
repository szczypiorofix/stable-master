import { AppView } from '../enums';

export interface AppStateModel {
    isSideNavOpen: boolean;
    view: AppView;
    stableName: string;
    stableAddress: string;
}

export interface AppContextModel {
    contextState: AppStateModel;
    setContextState: (state: AppStateModel) => void;
}
