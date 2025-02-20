export interface IAppState {
    isSideNavOpen: boolean;
}

export interface IAppContext {
    contextState: IAppState;
    setContextState: (state: IAppState) => void;
}
