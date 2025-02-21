import { AppView } from '../enums';

export interface AppStateModel {
    isSideNavOpen: boolean;
    view: AppView;
}

export interface AppContextModel {
    contextState: AppStateModel;
    setContextState: (state: AppStateModel) => void;
}
